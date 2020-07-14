import axios from 'axios'

// CREATE (POST)
// FIXME: in reality you'll have a form that allows you to create a user
function addNewUser() {
	const timestamp = Date.now()
	axios.post(`http://localhost:4000/users/`, {
		id: timestamp + 1,
		name: `user_${timestamp}`,
		email: `user_${timestamp}@gmail.com`,
		phone: timestamp
	}).then(res => {
		fetchAndLoadUsers()
	})
}

// EDIT (PUT)
// FIXME: in reality you'll have a form that allows you to edit a field on the user
function editLastUser() {
	const lastUser = Array.from(document.querySelectorAll('p.user')).pop()
	const lastUserId = Number(lastUser.id)

	const timestamp = Date.now()
	axios.put(`http://localhost:4000/users/${lastUserId}`, {
		name: `user_${timestamp}_EDITED`,
		email: `user_${timestamp}_EDITED@gmail.com`,
		phone: timestamp + '9999'
	}).then(res => {
		fetchAndLoadUsers()
	})
}

// DELETE
function deleteUser(event) {
	const user_id = event.target.id;
	console.log("delete", user_id)
	axios.delete(`http://localhost:4000/users/${user_id}`).then(res => {
		fetchAndLoadUsers()
	})
}

function fetchAndLoadUsers() {
	axios.get('http://localhost:4000/users')
		.then(res => {
			console.log('=== results from resource fetch ===')
			console.log(res)

			const new_users_rows = document.createElement('div')
			new_users_rows.id = "users_rows"
			res.data.forEach(user => {
				const user_id = `id="${user.id}"`

				const delete_button = document.createElement('div')
				delete_button.innerHTML = `<button ${user_id} class="btn btn-danger" role="button">DELETE</button>`

				delete_button.addEventListener('click', deleteUser)

				const user_row = document.createElement('div')
				user_row.innerHTML = `<p class="user" ${user_id}>${JSON.stringify(user)}</p>`
				user_row.appendChild(delete_button)

				new_users_rows.appendChild(user_row)
			});

			const old_users_rows = document.querySelector('#users_rows')

			if (old_users_rows) {
				old_users_rows.parentNode.removeChild(old_users_rows)
			}

			document.getElementById('app').appendChild(new_users_rows)
		})
}

window.onload = function () {
	fetchAndLoadUsers()
}

document.querySelector('#new').addEventListener('click', function () {
	addNewUser()
})

document.querySelector('#edit').addEventListener('click', function () {
	editLastUser()
})