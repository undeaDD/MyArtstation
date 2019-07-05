var firebaseConfig = {
	apiKey: "AIzaSyCil91Bgp3FeHFyCUdsvKb1cVqi64hGb0U",
	authDomain: "private-photogallery.firebaseapp.com",
	databaseURL: "https://private-photogallery.firebaseio.com",
	projectId: "private-photogallery",
	storageBucket: "private-photogallery.appspot.com",
	messagingSenderId: "912888999377",
	appId: "1:912888999377:web:50cbb28e93d0a3e4"
};

firebase.initializeApp(firebaseConfig);

document.oncontextmenu = function () {
	return window.location.href.indexOf('http://127.0.0.1') == 0;
};

try {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			if (window.location.href.includes("/cms/admin.html")) {
				// if logged in but on admin page -> redirect to cms page
				window.location.href = "/cms/contact.html";
			}
		} else {
			if (!window.location.href.includes("/cms/admin.html")) {
				// if on any other cms page but not logged in -> redirect to admin page
				window.location.href = "/cms/admin.html";
			}
		}
	});
} catch (e) { }

function login() {
	var email = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;
	firebase.auth().signInWithEmailAndPassword(email, password);
}

function logout() {
	firebase.auth().signOut();
}