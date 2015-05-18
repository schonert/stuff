Meteor.subscribe('Items', function() {
	// Make sure theres an default item
	if(!Items.findOne('default')) {
		Items.insert({_id:'default', type:'list', allow:'list', title:'Welcome! Double click on me to change!'});
	}
});
