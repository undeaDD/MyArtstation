'use strict';

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

function login(form) {
	try {
		var email = document.getElementById("inputEmail").value;
		var password = document.getElementById("inputPassword").value;
		firebase.auth().signInWithEmailAndPassword(email, password);
	} catch (e) { }
	return false;
}

function logout(site) {
	try {
		firebase.auth().signOut();
	} catch (e) { }
}

function checkEnter(event) {
	try {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("loginBtn").click();
		}
	} catch (e) { }
}

try {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			if (window.location.href.includes("/cms_admin.html")) {
				window.location.href = window.location.href.replace("cms_admin.html", "cms_index.html");
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
		$.each(["20932747", "16489403"], function (index, id) {
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
		firebase.database().ref('index').on('value', function (snapshot) {
			try {
				document.getElementById("IndexID").innerHTML = "";
			} catch (e) { }

			for (const [index, item] of JSON.parse(snapshot.val()).entries()) {
				document.getElementById('IndexID').innerHTML += `
				<div class="` + item["style"] + `" style="height: 50vh;">
					<a href="project.html?id=` + index + `">
						<div class="project shadow-lg" style="background-image: url('assets/img/projects/` + item["image"] + `');"></div>
					</a>
				</div>
				`;
			}
		});

		if (new URL(window.location.href).searchParams.get("sendMessage") !== null) {
			$("#sendMessage").hide().delay(1000).fadeIn(200).delay(3500).fadeOut(1000, function () {
				window.history.replaceState(null, null, window.location.pathname);
			});
		}
	}
} catch (e) { }

try {
	if (window.location.href.includes("/contact.html")) {
		firebase.database().ref('info').on('value', function (snapshot) {
			document.getElementById("FB-Info").innerHTML = "<h2 class=\"card-title mb-4\">Informations</h2>" + snapshot.val();
		});

		firebase.database().ref('contactEnabled').on('value', function (snapshot) {
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

function saveHome() {
	try {
		if (window.location.href.includes("/cms_index.html")) {
			firebase.database().ref('index').set(document.getElementById('HomeID').value);
		}
	} catch (e) { }
}

try {
	if (window.location.href.includes("/cms_index.html")) {
		firebase.database().ref('index').on('value', function (snapshot) {
			document.getElementById('HomeID').value = snapshot.val();
		});
	}
} catch (e) { }

function saveFAQ() {
	try {
		if (window.location.href.includes("/cms_faq.html")) {
			firebase.database().ref('faq').set(document.getElementById('FAQID').value);
		}
	} catch (e) { }
}

try {
	if (window.location.href.includes("/cms_faq.html")) {
		firebase.database().ref('faq').on('value', function (snapshot) {
			document.getElementById('FAQID').value = snapshot.val();
		});
	}
} catch (e) { }

function saveTwitter() {
	try {
		if (window.location.href.includes("/cms_blog.html")) {
			firebase.database().ref('twitterURL').set(document.getElementById("TwitterBlogURL").value);
		}
	} catch (e) { }
}

function saveBlog() {
	try {
		if (window.location.href.includes("/cms_blog.html")) {
			firebase.database().ref('blog').set(document.getElementById('BlogID').value);
		}
	} catch (e) { }
}

try {
	if (window.location.href.includes("/cms_blog.html")) {
		firebase.database().ref('twitterURL').on('value', function (snapshot) {
			document.getElementById("TwitterBlogURL").value = snapshot.val();
		});

		firebase.database().ref('blog').on('value', function (snapshot) {
			document.getElementById('BlogID').value = snapshot.val();
		});
	}
} catch (e) { }

function saveInfo() {
	try {
		if (window.location.href.includes("/cms_contact.html")) {
			firebase.database().ref('info').set(document.getElementById("FB-Info").value);
		}
	} catch (e) { }
}

function toggle() {
	try {
		if (window.location.href.includes("/cms_contact.html")) {
			firebase.database().ref('contactEnabled').set(document.getElementById("contactEnabled").innerText !== "Status: enabled");
		}
	} catch (e) { }
}

try {
	if (window.location.href.includes("/cms_contact.html")) {
		firebase.database().ref('info').on('value', function (snapshot) {
			document.getElementById("FB-Info").value = snapshot.val();
		});

		firebase.database().ref('contactEnabled').on('value', function (snapshot) {
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

			document.getElementById("TwitterBlogURL").innerHTML = "<div class=\"card shadow mb-4\" style=\"background-color: #292F33;\"><div class=\"card-body\" ><h2 class=\"card-title mb-4\">Twitter Posts</h2><a class=\"twitter-timeline\" href=\"" + snapshot.val() + "\" data-theme=\"dark\" data-dnt=\"true\" data-border-color=\"#292F33\" data-link-color=\"#ffffff\" data-chrome=\"noborders transparent nofooter noheader noscrollbar\" data-tweet-limit=\"2\" data-show-replies=\"false\"><\/a></div></div>";
			var script = document.createElement('script');
			script.id = "twitterScriptID"
			script.src = "https://platform.twitter.com/widgets.js";
			document.getElementById("TwitterBlogURL").appendChild(script);
		});

		firebase.database().ref('blog').on('value', function (snapshot) {
			try {
				document.getElementById("blogWrapper").innerHTML = "";
			} catch (e) { }

			for (const post of JSON.parse(snapshot.val())) {
				var data = `<div class="card mb-4 bg-dark shadow">
					<div class="card-body">
						<h2 class="card-title mb-4">` + post["title"] + `</h2>
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

try {
	if (window.location.href.includes("/faq.html")) {
		firebase.database().ref('faq').on('value', function (snapshot) {
			document.getElementById("faq-tabs").innerHTML = "";
			document.getElementById("faq-tab-content").innerHTML = "";

			for (const [index, post] of JSON.parse(snapshot.val()).entries()) {
				document.getElementById("faq-tabs").innerHTML += `
					<a href="#tab` + index + `" class="nav-link` + (index === 0 ? " active" : "") + `" data-toggle="pill" role="tab">
							<i class="` + post["icon"] + `"></i> ` + post["title"] + `
					</a>`;

				var temp = `
					<div class="tab-pane` + (index === 0 ? " show active" : "") + `" id="tab` + index + `" role="tabpanel">
					<div class="accordion shadow" id="accordion-tab-` + index + `">`;

				for (const [id, card] of post["content"].entries()) {
					temp += `
						<div class="card bg-dark text-light">
							<div class="card-header clickable" id="accordion-tab-` + index + `-heading-` + id + `" data-toggle="collapse"
								data-target="#accordion-tab-` + index + `-content-` + id + `">
								<h5 class="btn btn-link">` + card["title"] + `</h5>
							</div>
							<div class="collapse` + (id === 0 ? " show" : "") + `" id="accordion-tab-` + index + `-content-` + id + `" data-parent="#accordion-tab-` + index + `">
								<div class="card-body bg-black-transparent">` + card["body"] + `</div>
							</div>
						</div>
					`;
				}

				document.getElementById("faq-tab-content").innerHTML += temp + "</div></div>";
			}
		});
	}
} catch (e) { }

try {
	if (!window.location.href.includes("html")) {
		var base = window.location.href.split('/');
		base.pop();
		window.location.href = base.join("/") + "/index.html";
	}
} catch (e) { }


try {
	if (navigator.userAgent === "iOS") {
		document.getElementsByTagName("nav")[0].remove();
	}
} catch (e) { }