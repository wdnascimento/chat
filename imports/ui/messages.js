import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { Messages } from '../api/messages.js';


import './messages.html';
import './listMessages.html';


Template.messages.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('messages');
});


Template.messages.helpers({
  messages(){
      return Messages.find({taskId:Router.current().params._id});
  },
  getChatName(){
      return Tasks.find({_id:Router.current().params._id});
  }

});


Template.messages.events({
  'submit .new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('messages.insert',Router.current().params._id, text);

    // Clear form
    target.text.value = '';
  }
});