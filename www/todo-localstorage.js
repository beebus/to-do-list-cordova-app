var todoStorage = {
	collection: []
};

todoStorage.init = function(){
	this.collection = JSON.parse(localStorage.getItem('todo') || '[]');
};

todoStorage.hasItem = function(label){
	return this.collection.some(function(item){
		return item.label === label;
	});
};

todoStorage.save = function(){
	localStorage.setItem('todo', JSON.stringify(this.collection));	// saves data in local storage in case something happens
};

todoStorage.add = function(label){
	if(this.hasItem(label)) {
		return false;
	}

	this.collection.push({
		label: label,
		status: 'uncompleted'
	});

	this.save();	// save in local storage, in case something happens later to prevent this
	return true;
};

todoStorage.remove = function(label){
	if(!this.hasItem(label)) {		// similar to add function, but using !this.hasItem instead
		return false;
	}

	this.collection.forEach(function(item, i){
		if(item.label === label) {
			this.collection.splice(i, 1);
		}
	});

	this.save();	// save in local storage, in case something happens later to prevent this
	return true;
};

todoStorage.toggle = function(label){
	if(!this.hasItem(label)) {		// similar to add function, but using !this.hasItem instead
		return false;
	}

	this.collection.forEach(function(item, i){
		if(item.label === label) {
			item.status = item.status === 'completed' ? 'uncompleted' : 'completed';
		}
	});

	this.save();	// save in local storage, in case something happens later to prevent this
	return true;
};

todoStorage.filter = function(status){
	if(status === 'all') {
		return this.collection;
	}

	return this.collection.filter(function(item) {
		return item.status === status;
	});
};