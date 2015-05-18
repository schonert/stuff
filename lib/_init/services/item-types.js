/**
 * Define specific item types.
 *
 * An item type is a set of default values, methods to be run before
 * and after an item is created.
 *
 * This adds flexibility to custom item types
 */
itemTypes = (function() {
	var types = {};

	/**
	 * Define a type
	 *
	 * @param {string} type - type name
	 * @param {object} options
	 * @return {object} type
	 */
	function set(type, options) {
		types[type] = options;
		return get(type) || {};
	}

	/**
	 * @return {object} type
	 */
	function get(type) {
		return types[type];
	}

	/**
	 * @return {object} all types
	 */
	function getAll() {
		return _.clone(types, true);
	}

	return {
		set:set,
		get:get,
		getAll:getAll
	};
})();
