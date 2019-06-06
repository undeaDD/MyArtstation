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
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		document.getElementById('loginBtn').value = "Logout";
		document.getElementById('loginField').style.display = "none";
		document.getElementById('loginLabel').classList.add('d-lg-block');
		document.getElementById('uploadBtn').style.display = "block";
		document.getElementById('loginField').value = "";
		document.getElementById("loginBtn").classList.add('btn-danger');
		document.getElementById("loginBtn").classList.remove('btn-success');
	}else{
		document.getElementById('loginBtn').value = "Login";
		document.getElementById('loginField').style.display = "block";
		document.getElementById('loginLabel').classList.remove('d-lg-block');
		document.getElementById('uploadBtn').style.display = "none";
		document.getElementById("loginBtn").classList.remove('btn-danger');
		document.getElementById("loginBtn").classList.add('btn-success');
	}
});

document.getElementById("loginField").addEventListener("keyup", function(event) {
	if(event.keyCode === 13){
		event.preventDefault();
		document.getElementById('loginBtn').click();
	}
});

document.getElementById('loginBtn').addEventListener('click', function(event) {
	event.preventDefault();
	if(firebase.auth().currentUser) {
		firebase.auth().signOut();
	}else{
		var pw = document.getElementById('loginField').value;
		firebase.auth().signInWithEmailAndPassword("undeaD_D@live.de", pw).catch(function(error) {
			document.getElementById('loginField').value = "";
		});
	}
});

document.getElementById('uploadBtn').addEventListener('click', function(event) {
	event.preventDefault();
	window.location.href = "https://www.google.de";
});

document.getElementById("yearLabel").innerHTML = new Date().getFullYear();
var leadsRef = firebase.database().ref('projects');
leadsRef.on('value', function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		if(childSnapshot.val()["visible"]) {
			console.log(childSnapshot.val()["title"]);
		}
	});
});

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("scrollToTop").style.display = "block";
	} else {
		document.getElementById("scrollToTop").style.display = "none";
	}
}

document.getElementById('scrollToTop').addEventListener('click', function(event) {
	event.preventDefault();
	window.scroll({top: 0, left: 0, behavior: 'smooth' });
});


/*

		<div id="toCopy" class="row no-gutters">
			<div class="col-sm-12 col-md-6 col-lg col-xs-12">
				<div class="card">
				  <img src="https://via.placeholder.com/500" class="card-img-top">
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg col-xs-12">
				<div class="card">
				  <img src="https://via.placeholder.com/500" class="card-img-top">
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg col-xs-12">
				<div class="card">
				  <img src="https://via.placeholder.com/500" class="card-img-top">
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg col-xs-12">
				<div class="card">
				  <img src="https://via.placeholder.com/500" class="card-img-top">
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg col-xs-12">
				<div class="card">
				  <img src="https://via.placeholder.com/500" class="card-img-top">
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg col-xs-12">
				<div class="card">
				  <img src="https://via.placeholder.com/500" class="card-img-top">
				</div>
			</div>
		</div>