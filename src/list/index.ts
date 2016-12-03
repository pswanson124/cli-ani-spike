import { Router, RouterConfiguration } from 'aurelia-router'

export class Lists {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Lists';
        config.map([
            { route: '', name: 'listDisplay', moduleId: './list-display', nav: true, title: 'Lists' },
            { route: 'list/Admin', name: 'listAdmin', moduleId: './listAdmin', nav: true, title: 'List Admin' },
            {
                // route: [
                //     'list/:name/:pagesize/:page/:sort/:restoreLast',
                //     'list/:name/:pagesize/:page/:sort',
                //     'list/:name/:pagesize/:page',
                //     'list/:name/:pagesize'                    
                // ], name: 'listView', moduleId: './list', nav: false, title: 'List'
                route: 'view/:name?/:pagesize?/:page?/:sort?/:restoreLast?', name: 'listView', moduleId: './list', nav: false, title: 'List'
            },
            { route: 'list/:name/edit/:id', name: 'list-edit', moduleId: './edit', nav: false, title: 'List Edit' }

        ]);



        this.router = router;
    }


}
