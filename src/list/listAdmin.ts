import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
//import 'isomorphic-fetch';


@inject(HttpClient)
export class Lists {
  heading = 'List Admin';
  items = [];
  fieldDefinition = [];
  selectedItem = null;
  selectedField = null;
  showEdit = false;
  showNewList:boolean = false;
  http : HttpClient;
  newList:any;

  constructor(http) {
    http.configure(config => {
         config
            .useStandardConfiguration()
            .withBaseUrl('http://localhost:3000/');
      });

    this.http = http;
  }

  activate() {
    return this.getData().then( x => {
         console.log(this.items);
         return true;
    });
  }

  getData() { //page, pagesize) {
    return this.http.fetch('lists')
         .then(response => {
            return response.json()
         })
         .then(_items => this.items = _items);
  }

  addList() {
    console.log("adding list");
    this.newList = { name : '' }
    this.showNewList = true;
  }

  cancelAddList() {
    this.newList = null;
    this.showNewList = false;
  }

  saveNewList() {
    console.log("saving new list");
    this.showNewList = false;
    return this.http.fetch('lists/update', {
      method: 'post',
      body: json(this.newList)
    }).then(result => {
      console.log(result);
    });
  }

  addListDefinition() {
    this.fieldDefinition.push({
      name:'New Field',
      listid: this.selectedItem.id
    })
  }

  getListDefinition( item )   {
    this.selectedItem = item;
    this.http.fetch('lists/' + item.name + '/definition' )
       .then(response => {
          return response.json();
       }).then(_fields => this.fieldDefinition = _fields )
   }

  saveListDefinition() {
    return this.http.fetch('lists/' + this.selectedItem.name + '/definition', {
      method: 'post',
      body: json(this.fieldDefinition)
    }).then(result => {
      let i = 0
      for( let i=0; i < this.fieldDefinition.length; i++) {
        let field = this.fieldDefinition[i];
        if(!field.id)  {
          field.id = result[i].id;
          field.createdon = result[i].createdon;
          field.updatedon = result[i].updatedon;
        }
      }
      return result;
    });

  }

  get activeFieldDefinitions() {
    return this.fieldDefinition.filter( field => !field.deleted );
  }

  selectItem( list )   {
    this.backToFields();
    this.getListDefinition(list);
  }

  selectField( field ) {
    this.showEdit = true;
    this.selectedField = field;
  }

  backToFields() {
    this.showEdit = false;
    this.selectedField = undefined;
  }

  cancel() {
    this.fieldDefinition = [];
  }

  deleteField(field) {
    field.deleted = true;
    this.backToFields();
  }


}
