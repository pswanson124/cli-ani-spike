import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
//import 'isomorphic-fetch';


@inject(HttpClient)
export class Lists {
    http : HttpClient;
    
   selectedFiles;

   constructor(http) {
      http.configure(config => {
         config
            .useStandardConfiguration()
            .withBaseUrl('http://localhost:3000/');
      });

      this.http = http;
   }

   sendFiles() {
      let self = this;
      let file = this.selectedFiles[0];
      let reader = new FileReader();

      reader.onload = function(e) {
         let dataURL = reader.result;

         self.submitFile( { name: file.name, file: dataURL } );
      }

      reader.readAsDataURL(file);
   }


   submitFile(file) {
      this.http.fetch('files/save', {
          method: 'post',
          body: json(file)
      }).then(result => {
         return result;
      });
   }

}
