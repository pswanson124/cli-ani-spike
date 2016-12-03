"use strict"

import { inject } from 'aurelia-framework';
import {InlineViewStrategy} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';


export class Lists {
  heading = 'List View';
  items = [];
  page = 0;
  pagesize = 50;
  fieldDefinition:any;


  activate(list) {
    //console.log(JSON.stringify(list));
    this.fieldDefinition = list.definition; //fieldDefinition;
    this.items = list.data;
  }

  getViewStrategy() {
    let fields = this.fieldDefinition;
    // Build a form
    let list = '<table class="table table-condensed table-striped">'
      + '<thead><tr><th></th>';
    fields.forEach( field => {
      list += '<th class="col-sm-3"><a click.delegate="sortBy(\''+field.name+'\')">' + (field.display || field.name) + '</a></th>';
    });

    list+= '</tr><tr><th>Filter</th>';
    fields.forEach( field => {
      list += '<th class="col-sm-3"><input class="form-control" value.bind="filterRow.' + field.name + '"/></th>';
    });
    list+='</tr></thead><tbody><tr repeat.for="item of items">';
    list += '<td><a route-href="route: list-edit; params.bind : { name : name, id: item.id}" class="col-sm-2">Edit</a></td>';
    fields.forEach( field => {
      list += '<td>${item.' + field.name + '}</td>';
    });
    list += '</tr></tbody></table>';

    return new InlineViewStrategy('<template>' +
      list
      + '</template>')
  }

}
