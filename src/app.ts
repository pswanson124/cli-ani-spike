import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  router: Router;

  constructor(public api: WebAPI) {}

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'no-selection',   title: 'Select'},
      { route: 'test', moduleId: 'test-page2',   title: 'Compiler'},
      
//      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },

      // { route: 'list/Admin',    name: 'listAdmin',        moduleId: 'list/listAdmin',    nav: true, title: 'List Admin' },
      { route: 'lists/',         name: 'listsIndex',        moduleId: 'list/index',        nav: true, title: 'List Index' },
      // { route: ['list/:name/:pagesize/:page/:sort/:restoreLast',
      //           'list/:name/:pagesize/:page/:sort',
      //           'list/:name/:pagesize/:page',
      //           'list/:name/:pagesize',
      //           'list/:name'
      //         ],    name: 'listView',        moduleId: 'list/list',        nav: false, title: 'List' },
      // { route: 'list/:name/edit/:id', name: 'listEdit',        moduleId: 'list/edit',        nav: false, title: 'List Edit' },

      { route: 'file/file',     name: 'file',        moduleId: 'file/file',        nav: true, title: 'File' },

      { route: 'page/:page',         name: 'page',        moduleId: 'page/index',        nav: false, title: 'Page' },

    ]);

    this.router = router;
  }
}