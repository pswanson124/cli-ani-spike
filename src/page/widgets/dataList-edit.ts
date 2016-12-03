import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
//import { Defiant } from  'hbi99/defiant.js';//'dist/defiant.js';//
//import 'isomorphic-fetch';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(HttpClient, EventAggregator)
export class DataListWidget {
    ea : EventAggregator;
    http : HttpClient;
    content;
    listDefinition;

   constructor(http, EventAggregator){
      http.configure(config => {
         config
            .useStandardConfiguration()
            .withBaseUrl('http://localhost:3000/');
      });
      this.http = http;
      this.ea = EventAggregator;
      //this.Defiant=window.Defiant;

   }

   // attached()  {
   //    this.editSubscription = this.ea.subscribe('edit', item =>{
   //       this.getDefinition();
   //    } );
   // }

   // detatched() {
   //    this.editSubscription.dispose();
   // }

   activate(content) {
      this.content = content;
      this.content.listName=  this.content.listName || "";
      this.content.outputCols = this.content.outputCols || [];
      this.content.pageSize = this.content.pageSize || 5;
      this.content.defiantTemplate = this.content.defiantTemplate || "";
      this.content.filter = this.content.filter || "";
      //this.columns = this.getColumns (JSON.parse( this.content.outputColumns ));

      return this.getDefinition();
   }


   getDefinition()   {
      if(!this.content.listName) {
         return true;
      }
      //http://localhost:3000/lists/account/definition
      return this.http.fetch('lists/' + this.content.listName + '/definition' )
         .then(response => {
            return response.json()
         })
         .then(_items => {
            this.listDefinition = _items;
            return true;
         });
   }

   addItem( field )  {
      this.content.outputCols.push( {
         name:field.name,
         title: field.display || field.name,
         size: 4
      });
   }

   removeItem( column ) {
      for(var i = this.content.outputCols.length - 1; i >= 0; i--) {
          if(this.content.outputCols[i].name === column.name) {
             this.content.outputCols.splice(i, 1);
          }
      }
   }


}
