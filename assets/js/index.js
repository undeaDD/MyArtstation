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
	function login() {
		var email = document.getElementById("inputEmail").value;
		var password = document.getElementById("inputPassword").value;
		firebase.auth().signInWithEmailAndPassword(email, password);
	}

	function logout(site) {
		firebase.auth().signOut();
	}

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			if (window.location.href.includes("/cms_admin.html")) {
				window.location.href = window.location.href.replace("cms_admin.html", "cms_blog.html");
			}
			try {
				document.getElementById("userAvatar").src = "assets/img/" + user.uid + ".png"
			} catch (e) { }
		} else {
			if (!window.location.href.includes("/cms_admin.html")) {
				var base = window.location.href.split('/');
				base.pop();
				window.location.href = base.join("/") + "/cms_admin.html";
			}
		}
	});
} catch (e) { }
