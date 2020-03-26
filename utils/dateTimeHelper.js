const getTimeStamp = () => {
	const date = new Date();
	return date.toUTCString();
}

exports.getTimeStamp = getTimeStamp;