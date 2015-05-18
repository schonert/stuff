/**
 * Defaults
 */
Meteor.startup(function() {
	itemTypes.set('todo',{
		name:'Todo',
		defaults: {
			state:'incomplete',
			editing:true,
		},
	});
});
