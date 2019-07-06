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

try {
	document.getElementById("ContactFormID").onsubmit = function (event) {
		event.preventDefault();
		var base = "aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3JnL2JvdDg3MDcyNDQ1NDpBQUc4Mkg0ZlpXa1pycVlnUlMzNmcwLUpUbHpNS3dFbk96WS9zZW5kTWVzc2FnZQ==";
		var message = "<b>[Valo's Contact Request]</b>\n\n<b>Name:</b> " + document.getElementById("name").value + "\n<b>Reply via:</b> " + document.getElementById("email").value + "\n\n<b>Message:</b>\n" + document.getElementById("message").value;
		$.each(["20932747"/*, "16489403"*/], function (index, id) {
			$.ajax({
				url: encodeURI(atob(base) + "?chat_id=" + id + "&parse_mode=HTML&disable_web_page_preview=true&text=" + message),
				async: false
			});
		});
		window.location.href = window.location.href.replace("contact.html", "index.html?sendMessage=success");
	};
} catch (e) { }

try {
	if (window.location.href.includes("/index.html")) {
		if (new URL(window.location.href).searchParams.get("sendMessage") !== null) {
			$("#sendMessage").hide().delay(1000).fadeIn(200).delay(3500).fadeOut(1000, function () {
				window.history.replaceState(null, null, window.location.pathname);
			});
		}
	}
} catch (e) { }

try {
	if (window.location.href.includes("/contact.html")) {
		var ref = firebase.database().ref('info');
		ref.on('value', function (snapshot) {
			document.getElementById("FB-Info").innerHTML = "<h2 class=\"card-title mb-4\">Informations</h2>" + snapshot.val();
		});

		var ref = firebase.database().ref('contactEnabled');
		ref.on('value', function (snapshot) {
			if (snapshot.val()) {
				document.getElementById("contactEnabled").innerHTML = "<i class=\"fas fa-lg fa-share\"></i> Submit";
				document.getElementById("contactEnabled").classList.remove("btn-danger");
				document.getElementById("contactEnabled").classList.add("btn-primary");
				$('#contactEnabled').prop('disabled', false);
			} else {
				document.getElementById("contactEnabled").innerHTML = "<i class=\"fas fa-lg fa-minus-circle\"></i> Temporarily disabled";
				document.getElementById("contactEnabled").classList.remove("btn-primary");
				document.getElementById("contactEnabled").classList.add("btn-danger");
				$('#contactEnabled').prop('disabled', true);
			}
		});
	}
} catch (e) { }

try {
	if (window.location.href.includes("/cms_faq.html")) {
		function saveInfo() {
			firebase.database().ref('faq').set(document.getElementById('FAQID').value);
		}

		firebase.database().ref('faq').on('value', function (snapshot) {
			document.getElementById('FAQID').value = snapshot.val();
		});
	}
} catch (e) { }

try {
	if (window.location.href.includes("/cms_blog.html")) {
		function saveInfo() {
			firebase.database().ref('twitterURL').set(document.getElementById("TwitterBlogURL").value);
		}

		firebase.database().ref('twitterURL').on('value', function (snapshot) {
			document.getElementById("TwitterBlogURL").value = snapshot.val();
		});

		function saveInfo() {
			firebase.database().ref('blog').set(document.getElementById('BlogID').value);
		}

		firebase.database().ref('blog').on('value', function (snapshot) {
			document.getElementById('BlogID').value = snapshot.val();
		});
	}
} catch (e) { }

try {
	if (window.location.href.includes("/cms_contact.html")) {
		function saveInfo() {
			firebase.database().ref('info').set(document.getElementById("FB-Info").value);
		}

		var ref = firebase.database().ref('info');
		ref.on('value', function (snapshot) {
			document.getElementById("FB-Info").value = snapshot.val();
		});

		function toggle() {
			firebase.database().ref('contactEnabled').set(document.getElementById("contactEnabled").innerText !== "Status: enabled");
		}

		var ref = firebase.database().ref('contactEnabled');
		ref.on('value', function (snapshot) {
			if (snapshot.val()) {
				document.getElementById("contactEnabled").innerText = "Status: enabled"
				document.getElementById("contactEnabled").classList.remove("btn-danger");
				document.getElementById("contactEnabled").classList.add("btn-primary");
			} else {
				document.getElementById("contactEnabled").innerText = "Status: disabled"
				document.getElementById("contactEnabled").classList.remove("btn-primary");
				document.getElementById("contactEnabled").classList.add("btn-danger");
			}
		});
	}
} catch (e) { }

try {
	if (window.location.href.includes("/blog.html")) {
		firebase.database().ref('twitterURL').on('value', function (snapshot) {
			try {
				document.getElementById("twitterScriptID").remove();
			} catch (e) { }

			document.getElementById("TwitterBlogURL").innerHTML = "<div class=\"card shadow\" style=\"background-color: #292F33;\"><div class=\"card-body\" ><a class=\"twitter-timeline\" href=\"" + snapshot.val() + "\" data-theme=\"dark\" data-border-color=\"#292F33\" data-link-color=\"#ffffff\" data-chrome=\"noborders transparent nofooter noscrollbar\" data-dnt=\"true\" data-tweet-limit=\"2\"><\/a></div></div>";
			var script = document.createElement('script');
			script.id = "twitterScriptID"
			script.src = "https://platform.twitter.com/widgets.js";
			document.getElementById("TwitterBlogURL").appendChild(script);
		});

		firebase.database().ref('blog').on('value', function (snapshot) {
			try {
				document.getElementById("blogWrapper").innerHTML = "";
			} catch (e) { }

			for (post of JSON.parse(snapshot.val())) {
				var data = `<div class="card mb-4 bg-dark shadow">
					<div class="card-body">
						<h2 class="card-title">` + post["title"] + `</h2>
						<p class="card-text">` + post["body"] + `</p>
					</div>
					<div class="card-footer bg-black-transparent text-muted">
							` + post["footer"] + `
						<div class="float-right">
							` + post["tags"] + `
						</div>
					</div>
				</div>`;
				document.getElementById("blogWrapper").innerHTML += data;
			}
		});
	}
} catch (e) { }

function checkEnter(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("loginBtn").click();
	}
}