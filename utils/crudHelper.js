const getNextId = (_items) => {
	// solution 1: based on users length
	// return users.length + 1;

	// solution 2: based on max user.id
	let maxId = 1;

	_items.forEach(_item => {
		if (_item.id > maxId) {
			maxId = _item.id;
		}
	});

	return maxId + 1;
}

exports.getNextId = getNextId;