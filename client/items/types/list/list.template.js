if(Meteor.isClient) {
	/**
	 * Load default list
	 * [Should be more dynamic]
	 */
	Template.registerHelper('default', function() {
		return Items.findOne('default');
	});

	Template.list.helpers({
		// Find all items
		items: function() {
			var list = this.items.map(function(item) {
				return Items.findOne(item);
			});

			return list;
		},
		// Return item type as tempalte
		template: function() {
			return this.type;
		},
		// Change list title readonly
		editable: function() {
			return !Session.get('isEditing') ? 'readonly' : '';
		}
	});

	Template.list.events({
		// Add item
		'click button': function(event) {
			var type = event.currentTarget.value || Session.get('allow') || 'todo';
			var id = Items.insert({type:type});

			Items.update(this._id, {$push: {items: id}});

			event.stopPropagation();
		},
		// dblclick to enter editing mode of title
		'dblclick .title': function(event) {
			Session.set('isEditing', true);
			Items.update(this._id, {$set:{editing: Session.get('isEditing')}});

			setTimeout(function() {
				event.currentTarget.focus();
			}, 100);
		},
		/**
		 * - Update title on keyup
		 * - Exit on esc / blur
		 * - Toogle editing mode on enter
		 * - else enter editing mode, if not arrows
		 */
		'keyup .title, blur .title': function(event, template) {
			var self = this;
			var isEditing = Session.get('isEditing');
			var debounce = Session.get('debounce');

			// Set tilte
			self.title = event.currentTarget.value;

			clearTimeout(debounce);
			Session.set('debounce', setTimeout(function() {
				// Update title
				Items.update(self._id, {$set:{title:event.currentTarget.value}});
			}, 150));

			// Exit on escape + blur
			if(event.which === 27 || event.type === 'focusout') {
				Session.set('isEditing', false);

			// Toggle on enter
			} else if(event.which === 13) {
				Session.set('isEditing', !isEditing);

			// if not arrow keys - start editing
			} else if(!isEditing && [37, 38, 39, 40].indexOf(event.which) === -1) {
				Session.set('isEditing', true);
			}
		}
	});
}
