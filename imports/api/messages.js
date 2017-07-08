import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find({});
  });
}

Meteor.methods({
  'messages.insert'(taskId, text) {
    check(text, String);
    check(taskId, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      taskId,
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'messages.getMessages'(taskId) {
    check(taskId, String);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
   }

    return Messages.find({ taskId: taskId });

  }
});
