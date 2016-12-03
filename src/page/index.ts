import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
//import 'isomorphic-fetch';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as dragula from 'dragula';

//import '/dragula/dist/dragula.min.css';

@inject(HttpClient, EventAggregator)
export class Index {
  ea:EventAggregator;
  http: HttpClient;
  view;
  isEditable: boolean;
  appliedClass:string;
  newItem;
  pageAreas;
  widgetTypes;
  page;
  title;
  selectedWidget;
  dragging:boolean;

  
   constructor(http, EventAggregator) {
      http.configure(config => {
         config
            .useStandardConfiguration()
            .withBaseUrl('http://localhost:3000/');
      });
      this.http = http;
      this.view = './page.html';
      this.isEditable = false;
      this.appliedClass = "";
      this.ea = EventAggregator;

      this.newItem = { area: 'middle', type: 'contentWidget' }
      this.pageAreas = [
         {name:'top'},
         {name:'left'},
         {name:'middle'},
         {name:'right'},
         {name:'bottom'},
      ];

      this.widgetTypes = [
         {name:'Content', t:'contentWidget'},
         {name:'Data List', t:'dataList'},
         {name:'FeaturedStory', t:'featuredStory'},
         {name:'Markdown', t:'markdown'}
      ];


  		let dragApi = dragula({
  			isContainer: el => {
  				if (!el) {
  					return false;
  				}
  				if (dragApi.dragging) {
  					return el.classList.contains('drop-target');
  				}
  				return el.classList.contains('drag-source');
  			},
  			revertOnSpill: true,
        removeOnSpill: false,
  			delay: 200
  		});

  		this.trackDrop(dragApi);
  		this.trackDraggingState(dragApi);

   }

   activate(page) {
      return this.getData(page);
   }

   getData(page) {
      return this.http.fetch('pages/' + page.page )
         .then(response => {
            return response.json()
         })
         .then(_items => {
            this.page = _items;
            this.title = this.page.name;

            return true;
         });
   }

   savePage() {
      this.http.fetch('pages/' + this.page.name + '/save', {
          method: 'post',
          body: json(this.page)
      }).then(result => {
         this.toggleEditPage();
         return result;
      });
   }

   toggleEditPage()  {
      this.isEditable = !this.isEditable;
      setTimeout( function() {
         if(!this.isEditable) {
            this.selectedWidget = null;
            this.appliedClass = "";
         } else {
            this.appliedClass = "edit";
         }
      }, 10);
   }

   addWidget() {
      let widget = {
         name: this.newItem.area + (this.page[this.newItem.area].length + 1),
         t : this.newItem.type,
         chrome: 'border'
      }
      this.page[this.newItem.area].push(widget);
   }

   editWidget(item) {
      this.selectedWidget = item;
      this.ea.publish('edit', item);
   }

   deleteWidget(zone, item)   {
      console.log("delete " + zone);
      for(var i = this.page[zone].length; i >= 0; i--) {
         if(this.page[zone][i-1] === item)  {
            this.page[zone].splice(i-1, 1);
         }
      }
   }

   trackDrop(dragApi) {
     dragApi.on('drop', (el, container, source, sibling) => {

      let item = source.sourceitem;
      let sourceZone = source.sourcezone;
      let destinationZone = container.zone;
      let sib = sibling ? sibling.sourceitem : null;

      dragApi.cancel();

      for(var i=0; i < sourceZone.length; i++ ) {
        if(item == sourceZone[i]) {
          sourceZone.splice(i, 1);
        }
      }
      for(var i=0; i < destinationZone.length; i++ ) {
        if(sib == destinationZone[i]) {
          destinationZone.splice(i, 0, item);
          return;
        }
      }
      destinationZone.push(item);

     });
   }

   trackDraggingState(dragApi) {
     let handle;
     dragApi.on('drag', () => {
       handle = setTimeout(() => this.dragging = true);//, doubleClickDelay + 20);
     });
     dragApi.on('dragend', () => {
       clearTimeout(handle);
       this.dragging = false;
     });
   }

}
