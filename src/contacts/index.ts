import {Router, RouterConfiguration} from 'aurelia-router';

export class Index {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router){
        config.title = 'Contacts';
        config.map([
            { route: '',              moduleId: '../no-selection',   title: 'Select'},
            { route: 'contacts/:id',  moduleId: 'contact-detail', name:'contacts' }
        ])
    }

}