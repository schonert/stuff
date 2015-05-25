// Add account as optional in future
userId = window.localStorage.getItem('stuuff:id');

Meteor.call('setUserId', userId, function(error, id) {
	userId = id;
	window.localStorage.setItem('stuuff:id', userId);
});

Meteor.subscribe('Items', userId, function() {

	// No items, not even default
	if(!Items.findOne()) {
		Items.insert({_id:userId, userId:userId, type:'list', allow:'list', title:'Welcome! Double click on me to change!'});
	}
});

