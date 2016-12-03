import { inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ContentWidget {
    ea : EventAggregator;
    content;
    isEditable:boolean;
    
   constructor(eventaAggregator) {
      this.ea = eventaAggregator
   }

   activate(content) {
      this.content = content;
      this.isEditable=false;
   }

   toggleEdit()   {
      //ea.onEdit
      this.isEditable = !this.isEditable;
   }
}
