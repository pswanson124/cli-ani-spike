import { inject } from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
//import 'isomorphic-fetch';
import toastr = require('toastr');
import {Router} from 'aurelia-router';


@inject(HttpClient, Router)
export class Edit {
  http: HttpClient;
  router: Router;
  list;
  title;
  listEdit;


  constructor(http, router) {
    http.configure(config => {
       config
          .useStandardConfiguration()
          .withBaseUrl('http://localhost:3000/');
    });

    this.http = http;
    this.router = router;
  }
  activate(list) {
    this.list = list;
    this.title = 'Edit ' + list.name;
    if(list.id > 0) {
      return this.getData(list);
    } else {
      return this.getDefinition(list.name);
    }
  }

  determineActivationStrategy(){
    return activationStrategy.replace; //.invokeLifecycle;
  }

  getDefinition(name) {
    return this.http.fetch('lists/' + name + '/definition')
    .then(response => {
        return response.json()
    })
    .then( definition => {
      this.listEdit = {
        fieldDefinition : definition,
        item : this.newRecord(definition)
      }

      return true;
    });
  }

  getData(list) {
    return this.http.fetch('lists/' + list.name + '/' + list.id)
    .then(response => {
        return response.json()
    })
    .then(_items => {
      if(_items.list.length !== 1)  {
          return false;
      }
        //console.log(_items.def);
      this.listEdit = {
        fieldDefinition : _items.def,
        item : _items.list[0]
      }

      return true;
    });
  }

  updateData()  {
     //alert(JSON.stringify(item));
    return this.http.fetch('lists/' + this.list.name + '/save', {
         method: 'post',
         body: json(this.listEdit.item)
    })
    .then(response => response.json() )
    .then(response => {
      this.listEdit.item = response;
      this.router.navigateToRoute('listView', { name: this.list.name, restoreLast : true });
      toastr.success("Update Completed");
    });
  }

  deleteData()  {
     //alert(JSON.stringify(item));
    if(this.listEdit.item.id > 0) {
      return this.http.fetch('lists/' + this.list.name + '/' + this.listEdit.item.id, {
           method: 'delete'
      })
      .then(response => response.json() )
      .then(response => {
        this.router.navigateToRoute('listView', { name: this.list.name, restoreLast : true });
        toastr.success("Delete Completed");
      });
    }
  }

  newRecord(definition) {
    let record = {}
    definition.forEach(def => {
      switch (def.datatype) {
        case 'STRING':
        case 'M-STRING':
          record[def.name]=null;
          break;
        case 'INTEGER':
          record[def.name]=0;
        default:
          record[def.name]=null;
      }
    });
    return record;
  }
}
