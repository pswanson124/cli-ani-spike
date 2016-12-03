import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ListDisplay {
    private http: HttpClient;
    heading = 'List View';
    items = [];
    page = 0;
    pagesize = 50;


    constructor(http: HttpClient) {
        http.configure(config => {
            config
                .withBaseUrl('http://localhost:3000/');
        });

        this.http = http;
    }

    activate(act) {
        return this.getData().then(x => { return true; });
    }

    getData() { //page, pagesize) {

        return this.http.fetch('lists/')
            .then(response => {
                return response.json()
            })
            .then(_items => {
                this.items = _items
                return true;
            });
    }
}