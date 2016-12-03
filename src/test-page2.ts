
import {inject, noView, ViewCompiler, ViewSlot, Container, ViewResources, bindable} from 'aurelia-framework';

//@noView
@inject(ViewCompiler, ViewSlot, Container, ViewResources)
export class InlineView {
    viewSlot;

    constructor(private viewCompiler,  viewSlot, private container, private viewResources){
    //   this.viewCompiler = viewCompiler;
       this.viewSlot = viewSlot;
    //   this.container = container;
    //   this.viewResources = viewResources;
    }

    attached() {
      // Compile an html template, dom fragment or string into ViewFactory instance, capable of instantiating Views.
      var viewFactory = this.viewCompiler.compile('<template>' 
                + "${title}" 
                + '</template>', this.viewResources);

      // Creates a view or returns one from the internal cache, if available
      var view = viewFactory.create(this.container);

      // Bind the view and it's children
      view.bind({title:"test"});

      // Add the view to the slot
      //this.viewSlot.add(view);

      // Trigger the attach for the slot and its children.
      //this.viewSlot.attached();
    }

    // bind(bindingContext) {
    //   this.bindingContext = bindingContext;
    // }

}