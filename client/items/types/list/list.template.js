if(Meteor.isClient) {
	Template.registerHelper('default', function() {
		return Items.findOne('default');
	});

	Template.list.onCreated(function() {
	});

	Template.list.helpers({
		items: function() {
			var list = this.items.map(function(item) {
				return Items.findOne(item);
			});

			return list;
		},
		template: function() {
			return this.type;
		},
		editable: function() {
			return !Session.get('isEditing') ? 'readonly' : '';
		},
		titleSize: function() {
			return this.title ? this.title.length * 1.08 : 25;
		}
	});

	Template.list.events({
		'click button': function(event) {
			var type = event.currentTarget.value || Session.get('allow') || 'todo';
			var id = Items.insert({type:type});

			Items.update(this._id, {$push: {items: id}});

			event.stopPropagation();
		},
		'dblclick .title': function(event) {
			Session.set('isEditing', true);
			Items.update(this._id, {$set:{editing: Session.get('isEditing')}});

			setTimeout(function() {
				event.currentTarget.focus();
			}, 100);
		},
		'keyup .title, blur .title': function(event, template) {
			var _this = this;
			var isEditing = Session.get('isEditing');

			// Update title
			Items.update(this._id, {$set:{title:event.target.value}});

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
