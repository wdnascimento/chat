import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './body.html';
import './chats.html';
import './chats.js';

Template.main.helpers({
  page(){
      if(Router.current().params.page != ''){
          return Router.current().params.page;
      }else{
          return false;
      }
      
  },
});

