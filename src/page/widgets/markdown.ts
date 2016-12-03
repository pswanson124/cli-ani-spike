import Remarkable = require('remarkable');
import { inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class MarkdownWidget {
ea : EventAggregator;
md;
content;
isEditable;


   constructor(eventaAggregator) {
      this.ea = eventaAggregator
      this.md = new Remarkable('full', {

        html:         true,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      true,         // autoconvert URL-like texts to links
        linkTarget:   '',           // set target to open link in

        // Enable some language-neutral replacements + quotes beautification
        typographer:  false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
        quotes: '“”‘’'
      //   ,
      //
      //   // Highlighter function. Should return escaped HTML,
      //   // or '' if input not changed
      //   highlight: function (str, lang) {
      //     if (lang && hljs.getLanguage(lang)) {
      //       try {
      //         return hljs.highlight(lang, str).value;
      //       } catch (__) {}
      //     }
      //
      //     try {
      //       return hljs.highlightAuto(str).value;
      //     } catch (__) {}
      //
      //     return ''; // use external default escaping
      // }
    });
   }

   activate(content) {
      this.content = content;
      this.content.content = this.content.content || "";
      //this.markdown = this.md.render(this.content.content);
      this.content.chrome = this.content.chrome || 'border';
      this.isEditable=false;
   }

   get markdown() {
     return this.md.render( this.content.content);
   }

   toggleEdit()   {
      //ea.onEdit
      this.isEditable = !this.isEditable;
   }
}
