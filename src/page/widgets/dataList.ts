import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
//import { Defiant } from  'defiant';//'dist/defiant.js';//
//import 'isomorphic-fetch';
//import { Promise } from 'bluebird';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(HttpClient, EventAggregator)
export class DataListWidget {
  ea : EventAggregator;
  http: HttpClient;
  content;
  list;

   constructor(http, EventAggregator){
      http.configure(config => {
         config
            .useStandardConfiguration()
            .withBaseUrl('http://localhost:3000/');
      });
      this.http = http;
      this.ea = EventAggregator;

   }

   activate(content) {
      this.content = content;
      this.content.chrome = this.content.chrome || 'border';
      this.content.listName=  this.content.listName || "";
      this.content.outputCols = content.outputCols || [];
      this.content.pageSize = this.content.pageSize || 5;
      this.content.defiantTemplate = this.content.defiantTemplate || "";

      return this.getData();
   }

  getData()   {
    if(!this.content.listName) {
       return true;
    }

    return this.http.fetch('lists/' + this.content.listName
          + '?pagesize=' + this.content.pageSize
          + '&filter=' + encodeURIComponent(this.content.filter)
       )
       .then(response => {
          return response.json()
       })
       .then(_items => {
          this.list = _items.list;
          return true;
       })
       .catch(ex =>  {
          console.log(ex);
          return false;
       });
  }


  getOutput() {
    let res = function( html ) { return html; }
    let p = new Promise( function ( res ) {
      // commenting while trying to re-enable MyPoint in Ani
      //  setTimeout( function () {
      //     let htm = this.Defiant.render('test2', { account : this.list } );
      //     resolve(htm);
      //  }, 0);
    });
    return p;
  }

}
