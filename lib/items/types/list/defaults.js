Meteor.startup(function() {
	itemTypes.set('list', {
		name:'List',
		defaults: {
			title:'Wuuup! New list!',
			allow:'todo',
			items:[]
		}
	});
});
