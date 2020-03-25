const getNextId = (_users) => {
	// solution 1: based on users length
	// return users.length + 1;

	// solution 2: based on max user.id
	let maxId = 1;

	_users.forEach(_user => {
		if (_user.id > maxId) {
			maxId = _user.id;
		}
	});

	return maxId + 1;
}


exports.getNextId = getNextId;