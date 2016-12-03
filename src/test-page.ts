import { Compiler } from './test';
import {Container, ViewCompiler, ViewSlot, ViewResources, autoinject, noView} from 'aurelia-framework';

@autoinject
@noView
export class TestPage {
    // element;
    // compiler;
    // container;

    //static inject = [Element, Compiler, Container, ViewCompiler, ViewSlot, ViewResources]
    constructor(private element:Element, 
            private container :Container, 
            private viewCompiler:ViewCompiler,
            private viewSlot:ViewSlot, 
            private resources:ViewResources) {
        // this.element = element;
        // this.compiler = compiler;
        // this.container = container;
    }

    attached() {

        //create fragment from a string
        // let documentFragment = this.compiler.createFragment("<div class='col-sm-12'>${Date.now()}</div>");
        // this.element.appendChild(documentFragment);
        // this.compiler.processBehavior(this.container, this);

        // let value = 12;
        // let el = document.createElement(this.container, "div");
        // el.setAttribute("some-option", value);
        // el.innerHTML = "${Date.now()}";
        // this.element.appendChild(el);
        // this.compiler.compile(el);


        var viewFactory =  this.viewCompiler.compile('<template><button>${title}</button></template>', this.resources);
        var bindingContext = { title:"click"}; //replace this with whatever object you want the view bound to
        var view = viewFactory.create(this.container, bindingContext);
        //this.viewSlot.add(view);
        //this.viewSlot.attached();
    }
}