"use strict"

import { inject, singleton, BindingEngine } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
//import 'isomorphic-fetch';
import {InlineViewStrategy} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';
import {Router} from 'aurelia-router';

@singleton()
@inject(HttpClient, Router, BindingEngine)
export class Lists {
  heading = 'List View';
  items = [];
  http: HttpClient;
  router: Router;
  bindingEngine : BindingEngine;
  page;
  sort;
  name;
  pagesize;
  filterRow;
  fieldDefinition;
  listDefinition;
  filterSubscriptions;

  constructor(http, router, bindingEngine) {
    http.configure(config => {
    config
      //.useStandardConfiguration()
      .withBaseUrl('http://localhost:3000/');
    });

    this.http = http;
    //this.router = router;
    this.bindingEngine = bindingEngine;
  }

  activate(act, config) {
    console.log("activating");
    this.router = config.navModel.router;
    if(act.restoreLast && (this.page || this.sort || this.getFilter() )) {
      this.router.navigateToRoute('listView', {name:this.name, pagesize: this.pagesize, page:this.page, sort: this.sort});
      return;
    }
    this.page = +act.page || 0;
    this.pagesize = +act.pagesize || 50;
    this.sort = act.sort || null;
    if(this.name !== act.name)  {
      this.filterRow = null;
    }
    this.name = act.name;
    return this.getData().then( x => {return true;});
  }

  getFilter() {
    let filter = '';
    if(this.filterRow) {
      for ( var fieldName in this.filterRow ) {
        if(this.filterRow[fieldName]) {
          filter += fieldName + ' like,' + this.filterRow[fieldName]+';;;';
        }
      }
    }
    if(filter)  {
      filter = '&filter=' + filter;
    }
    return filter;
  }

  getData() {
    //let filter = "&filter=companyName like,aa%"
    let url = 'lists/'+ this.name
      +'?pagesize='+this.pagesize
      +'&page='+this.page
      + this.getFilter()
      //+'&'+Math.random()
      ;
    if(this.sort)  {
      url += '&sort='+this.sort;
    }
    return this.http.fetch(url)
    .then(response => {
      return response.json()
    })
    .then(_items => {
      this.items = _items.list
      this.fieldDefinition = _items.def;

      this.listDefinition = {
        definition: _items.def,
        data : _items.list
      }
      if(!this.filterRow) {
        this.filterRow = {};
        this.filterSubscriptions = {};

        _items.def.forEach( field => {
          this.filterRow[field.name]=null;
          this.filterSubscriptions[field.name+'Subscribe'] = this.bindingEngine.propertyObserver(this.filterRow, field.name)
            .subscribe((newValue, oldValue) => {
              console.log(newValue);
              this.page = 0;
              this.getData();
            });
        });
      }

      return true;
    });
  }

  sortBy(fieldName) {
    if (this.sort === fieldName){
      fieldName += ' desc';
    }
    this.router.navigateToRoute('listView', {name:this.name, pagesize: this.pagesize, page:0, sort: fieldName});
  }

  get addItemLink() {
    return this.router.generate('list-edit', {
      name: this.name,
      id: 0
    });
  }

  get firstPageLink () {
    return this.router.generate('listView', {
      name: this.name,
      pagesize: this.pagesize,
      page:0,
      sort: this.sort
    });
  }

  get prevPageLink () {
    return this.router.generate('listView', {
      name: this.name,
      pagesize: this.pagesize,
      page: Math.max(this.page - 1, 0),
      sort: this.sort
    });
  }

  get nextPageLink () {
    return this.router.generate('listView', {
      name: this.name,
      pagesize: this.pagesize,
      page: this.page + 1,
      sort: this.sort
    });
  }

  determineActivationStrategy(x, y, z){
    if(x.name !== this.name)  {
      //console.log(x);
      return activationStrategy.replace; //.invokeLifecycle;//
    } else {
      return activationStrategy.invokeLifecycle;
    }
  }
}
