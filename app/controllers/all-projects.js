/* global moment:true */
import Ember from 'ember';

export default Ember.Controller.extend({
  users: "",
  isEditMode: false,
  sortProperties: ['position'],
  sortAcsending: true,
  
  activeUsers: function(){
    var users = this.get('users');
    var filteredUsers = users.filterBy('isRemoved', false);
    
    return filteredUsers;
    
  }.property('users.@each.isRemoved'),
  actions: {
    editMode: function() {
      this.set('isEditMode', true);
    },
    exitEditMode: function() {
      this.set('isEditMode', false);
    },
    reOrder: function(groupModel) {
      for(var i=0; i < groupModel.length; i++){
        groupModel[i].set('position', i);
        groupModel[i].save();
      }
      
      this.set('model', groupModel);
	},
    deleteCard: function(proj){
      if(confirm("Are you sure you want to remove " +  proj.get('title') + "?")){
        proj.deleteRecord();
        proj.save().then(function(){
        });
      }
  },
    archive: function(proj){
      proj.set('isLive', false);
      proj.save();
  },
    setRed: function(proj) {
      proj.setProperties({
        isRed: true,
        isAmber: false,
        isGreen: false
      });
      proj.save();
  },
    setAmber: function(proj) {
      proj.setProperties({
        isRed: false,
        isAmber: true,
        isGreen: false
      });
      proj.save();
  },
    setGreen: function(proj) {
      proj.setProperties({
        isRed: false,
        isAmber: false,
        isGreen: true
      });
      proj.save();
  },
    editMilestone: function(proj) {
      this.set('users', this.store.find('user'));
      proj.set('isEditing', true);
  },
    newMilestone: function(proj) {
      var newMilestone = this.store.createRecord('milestone', {
        details: proj.get('milestones.lastObject.details'),
        deadline: new Date(proj.get('milestones.lastObject.deadline')),
        user: this.get('username'),
        project: proj
      });
      
      newMilestone.save();
      
      proj.set('isEditing', false);
      proj.save();
  },
    back:function(proj){
      proj.set('isEditing', false);
  },
    acceptChanges: function(proj) {
      if(proj.get('milestones.lastObject.details') !== ""){
        proj.get('milestones.lastObject').setProperties({
          details: proj.get('milestones.lastObject.details'),
          deadline: new Date(proj.get('milestones.lastObject.deadline')),
          user: this.get('username'),
        });
        proj.get('milestones.lastObject').save();
      }
      
      proj.set('isEditing', false);
      proj.save();
    }
  }
});
Ember.Handlebars.registerBoundHelper('date', function (date){
    var target = moment(date);
    return target.format('DD/MM/YY');
});
