import { inject, BindingEngine } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../web-api';
import { ContactUpdated, ContactViewed } from '../messages';
import { areEqual } from '../utility';
import { activationStrategy } from 'aurelia-router';
import { DeepObserver } from '../deepObserver';
import toastr = require('toastr');
// import {Container} from 'aurelia-dependency-injection';
// import {TemplatingEngine, ViewSlot, ViewResources, View } from 'aurelia-templating';

//import {INVOKE_LIFECYCLE} from 'aurelia-router';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  test: Test;
}

interface Test {
  field1: string;
  field2: string;
}

// function addObserver(item)  {
//   let subscription = BindingEngine.bind()
//       .propertyObserver(this, 'firstName')
//       .subscribe(valueChanged);
// }

function valueChanged(newValue, oldValue, property) {
  console.log(property + " updated to " + newValue);
  //alert(property + " updated from " + oldValue);
}

@inject(WebAPI, EventAggregator, DeepObserver)
export class ContactDetail {
  routeConfig;
  contact: Contact;
  originalContact: Contact;
  observer;
  fields = ['firstName', 'lastName'];

  constructor(private api: WebAPI, private ea: EventAggregator, private deep ) {
    this.deep = deep;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = <Contact>contact;
      this.contact.test = { field1: 'asdf', field2: 'lkj' }

      //addObserver(this.contact);
      this.observer = this.deep.observe(this, 'contact', valueChanged);
      // this.observer = this.deep.observe(this.contact, 'firstName', valueChanged);


      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save() {
    toastr.info("test");
    this.api.saveContact(this.contact).then(contact => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactUpdated(this.contact));
    });

  }

  test() {
    this.contact.test = { field1: 's2asdf', field2: 'lkj' }
  }

  canDeactivate() {
    //this.contact.firstName = 'test';
    this.observer();

    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }



  determineActivationStrategy() {
    //return INVOKE_LIFECYCLE;
    return activationStrategy.replace;
  }
}