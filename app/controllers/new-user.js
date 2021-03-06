import Ember from 'ember';

export default Ember.Controller.extend({
  isError: false,
  actions: {
    addUser: function(){
      var uName = this.get('name');
      if(uName){
          this.set('isError',false);
          var user = this.store.createRecord('user', {
              userName: uName
          });
          user.save();
          this.set('name', '');
          this.transitionTo('all-users');
      }
      else {
        this.set('isError', true);
      }
    }
  }
});
