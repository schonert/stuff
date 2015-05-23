// Need a reference - otherwise theres no subscribe ready event
Items = new Mongo.Collection('items');

Items.before.insert(function(user, doc) {
	// Get type options
	var type = itemTypes.get(doc.type);
	// Type defaults
	var defaults = type.defaults || {};

	// Allow specific type method to
	// manipulate doc
	(type.before || noop)(user, doc);

	// Always add a date
	doc.createdAt = Date.now();

	// Merge defaults into doc
	_.assign(doc, _.merge({}, defaults, doc));
});

Items.after.insert(function(user, doc) {
	// Get type options
	var type = itemTypes.get(doc.type);

	// Allow specific type method to
	// manipulate doc
	(type.after|| noop)(user, doc);

	// Always add a date
	doc.createdAt = Date.now();
});
