(function () {
	console.log('script')

	const signOutButton = document.getElementById('sign-out');
	const authDataDiv = document.getElementById('auth-data');

	const init = function () {
		console.log('called')
		gapi.load('auth2', function () {
			console.log("ready");
			gapi.auth2.init({
				client_id:
					'190581810989-7lk4aftlnsuljs204cc8u7338ct78nps.apps.googleusercontent.com',
				// fetch_basic_profile: true,
			}).then(() => {
				// onInit
				console.log("init");

				renderButtons();
			}, (err) => {
				console.log("err");
			});
		});
	}

	const handleLoginSuccess = function (googleUser) {
		const profile = googleUser.getBasicProfile();
		console.log(profile);

		toggleSignOutVisible(true);

		/* 
			ACCESS GRANTED
			give access to protected page/resource
			Some possible scenarios:
			- show a User account view/dashboard specific to the logged-in user
			- render/update some views with data
				- if using UI framework, set state so that data-driven components appear
			- fetch some data from API that user has access to
			- if using a frontend router, redirect to the auth-restricted page
		*/

		// as an example, we'll just display some "secret" data only available to logged-in users

		// https image causes a 403

		authDataDiv.innerHTML =
			`<p>ID: ${profile.getId()}</p>` +
			`<p>Name: ${profile.getName()}</p>` +
			`<p><img src="${profile.getImageUrl().replace('https', 'http')}" /></p>` +
			`<p>Email: ${profile.getEmail()}</p>`;

	}

	const handleLoginFailure = function () {
		console.log("google sign-in failure")

		toggleSignOutVisible(false);

		// just to make sure		
		authDataDiv.innerHTML = '';
	}

	const toggleSignOutVisible = function (visible) {
		signOutButton.style.display = visible ? 'block' : 'none';
	}

	const onSignOut = function () {

		const auth2 = gapi.auth2.getAuthInstance()
		auth2.signOut().then(function () {
			authDataDiv.innerHTML = '' // hide restricted content

			toggleSignOutVisible(false)

			console.log("signed out")
		})
	}

	const renderButtons = function () {
		// render Google sign-in button
		gapi.signin2.render('sign-in', {
			scope: 'profile email',
			width: 300,
			height: 50,
			longtitle: true,
			theme: 'dark',
			onsuccess: handleLoginSuccess,
			onfailure: handleLoginFailure
		})

		// hide sign-out button
		toggleSignOutVisible(false);

		// button listener
		signOutButton.addEventListener('click', onSignOut)
	}

	const destroy = function () {
		signOutButton.removeEventListener('click', onSignOut)
	}

	init();

	// TODO: call destroy() whenever this page has to be cleaned up / garbage-collected
})();
