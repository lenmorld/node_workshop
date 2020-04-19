// === fetch non-authenticated resource ===
// fetch('http://localhost:4000/foods')
// 	.then(response => {
// 		console.log(response)
// 		return response.json()
// 	})
// 	.then(json => {
// 		console.log(json)
// 		document.getElementById('app').innerHTML = JSON.stringify(json);
// 	})

// === fetch token-authenticated resource ===

// POST credentials to get token
fetch('http://localhost:4000/api/token', {
	method: 'POST',
	headers: new Headers({
		'Content-Type': 'application/json',
	}),
	body: JSON.stringify({ username: "lenny2", password: 'abcd1234' })
})
	.then(response => {
		// console.log(response)
		return response.json()
	})
	.then(json => {
		console.log('=== token ===')
		console.log(json)
		document.getElementById('app').innerHTML = '<h1>Token</h1>'
		document.getElementById('app').innerHTML += '<br/>' + JSON.stringify(json);

		const token = json.token;

		// GET resource using token
		fetch('http://localhost:4000/api/resource', {
			method: 'GET',
			headers: new Headers({
				'Authorization': token
			})
		})
			.then(response => {
				// console.log(response)
				return response.json()
			})
			.then(json => {
				console.log('=== results from resource fetch ===')
				console.log(json)
				document.getElementById('app').innerHTML += '<hr />' + '<h1>Resources</h1>'
				document.getElementById('app').innerHTML += '<br />' + JSON.stringify(json);
			})
	})