// === fetch non-authenticated resource ===
fetch('http://localhost:4000/foods')
	.then(response => {
		console.log(response)
		return response.json()
	})
	.then(json => {
		console.log(json)
		document.getElementById('app').innerHTML = JSON.stringify(json);
	})