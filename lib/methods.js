Meteor.methods({
	setUserId:function(id) {
		id = ['null', 'undefined'].indexOf(id) !== -1 ? Users.insert({}) : id;

		this.setUserId(id);
		return id;
	}
});
