Meteor.publish('Items', function(id) {
	return Items.find({userId:id});
});
