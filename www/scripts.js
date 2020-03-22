var todo = {
	filterFlag: 'all'
};

document.addEventListener('init', function(event){
	var view = event.target.id;

	if(view === 'menu' || view === 'list') {
		todo[view + 'Init'](event.target);
	}
}, false);

todo.listInit = function(target) {
	this.list = document.querySelector('#todo-list');

	target.querySelector('#splitter-toggle').addEventListener('click', function() {
		document.querySelector('#splitter-menu').open();
	});

	target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));

	todoStorage.init();
	this.refresh();
}

todo.addItemPrompt = function() {
	ons.notification.prompt('Insert new to-do item label.', {
		title: 'New Item',
		cancelable: true,

		callback: function() {
			if(label === '' || label === null) {
				return;
			}

			if(todoStorage.add(label)) {
				this.refresh();
			} else {
				ons.notification.alert('Failed to add item to the todo list!');
			}
		}
	});
};

todo.refresh = function() {
	var items = todoStorage.filter(this.filterFlag);
};