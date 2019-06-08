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
	document.getElementById('loginBtn').value =  user ? "Logout" : "Login";
	document.getElementById('loginField').style.display = user ? "none" : "block";
	document.getElementById('uploadBtn').style.display = user ? "block" : "none";
	
	if (user) {
		document.getElementById("loginBtn").classList.add('btn-danger');
		document.getElementById("loginBtn").classList.remove('btn-success');
	} else {
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
	var debugCounter = 0;
	var global0 = 0;
	var global1 = 0;
	var global2 = 0;
	var counter0 = 0;
	var counter1 = 0;
	var counter2 = 0;
	var id0 = 0;
	var id1 = 0;
	var id2 = 0;
	
	snapshot.forEach(function(childSnapshot) {
		debugCounter += 1;
		if(childSnapshot.val()["visible"]) {
			switch (childSnapshot.val()["type"]) {
				case 0:
					if (counter0 % 6 === 0) {
						counter0 = 0;
						id0 += 1;
						var temp = '<div id="row0-' + id0 + '" class="row no-gutters"><div class="col-sm-12 col-md-6 col-lg col-xs-12"> <a href="assets/html/album.html"><div class="card"> <img src="https://picsum.photos/500/500?random=' + debugCounter + '" class="card-img-top"> </div> </div></a></div>';
						document.getElementById("wrapperDigital").insertAdjacentHTML("beforeend", temp);
					} else {
						var temp = '<div class="col-sm-12 col-md-6 col-lg col-xs-12"> <a href="assets/html/album.html"><div class="card"> <img src="https://picsum.photos/500/500?random=' + debugCounter + '" class="card-img-top"> </div> </a></div>';
						document.getElementById("row0-" + id0).insertAdjacentHTML("beforeend", temp);
					}
					counter0 += 1;
					global0 +=1;
					break;
				case 1:
					if (counter1 % 6 === 0) {
						counter1 = 0;
						id1 += 1;
						var temp = '<div id="row1-' + id1 + '" class="row no-gutters"><div class="col-sm-12 col-md-6 col-lg col-xs-12"> <a href="assets/html/album.html"><div class="card"> <img src="https://picsum.photos/500/500?random=' + debugCounter + '" class="card-img-top"> </div> </div></a></div>';
						document.getElementById("wrapperTraditionell").insertAdjacentHTML("beforeend", temp);
					} else {
						var temp = '<div class="col-sm-12 col-md-6 col-lg col-xs-12"> <a href="assets/html/album.html"><div class="card"> <img src="https://picsum.photos/500/500?random=' + debugCounter + '" class="card-img-top"> </div> </a></div>';
						document.getElementById("row1-" + id1).insertAdjacentHTML("beforeend", temp);
					}
					counter1 += 1;
					global1 +=1;
					break;
				case 2:
					if (counter2 % 6 === 0) {
						counter2 = 0;
						id2 += 1;
						var temp = '<div id="row2-' + id2 + '" class="row no-gutters"><div class="col-sm-12 col-md-6 col-lg col-xs-12"> <a href="assets/html/album.html"><div class="card"> <img src="https://picsum.photos/500/500?random=' + debugCounter + '" class="card-img-top"> </div> </div></a></div>';
						document.getElementById("wrapperSonstiges").insertAdjacentHTML("beforeend", temp);
					} else {
						var temp = '<div class="col-sm-12 col-md-6 col-lg col-xs-12"> <a href="assets/html/album.html"><div class="card"> <img src="https://picsum.photos/500/500?random=' + debugCounter + '" class="card-img-top"> </div> </a></div>';
						document.getElementById("row2-" + id1).insertAdjacentHTML("beforeend", temp);
					}
					counter2 += 1;
					global2 +=1;
					break;
				default:
					break;
			}
		}
	});
	
	document.getElementById("global0").innerHTML = global0;
	for (counter0; counter0 < 6; counter0 += 1) {
		var temp = '<div class="col-sm-12 col-md-6 col-lg col-xs-12"></div>';
		document.getElementById("row0-" + id0).insertAdjacentHTML("beforeend", temp);
	}
	document.getElementById("global1").innerHTML = global1;
	for (counter1; counter1 < 6; counter1 += 1) {
		var temp = '<div class="col-sm-12 col-md-6 col-lg col-xs-12"></div>';
		document.getElementById("row1-" + id1).insertAdjacentHTML("beforeend", temp);
	}
	document.getElementById("global2").innerHTML = global2;
	for (counter1; counter2 < 6; counter2 += 1) {
		var temp = '<div class="col-sm-12 col-md-6 col-lg col-xs-12"></div>';
		document.getElementById("row2-" + id2).insertAdjacentHTML("beforeend", temp);
	}
});

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	var toggle = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20);
	document.getElementById("scrollToTop").style.display = toggle ? "block" : "none";
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
		</div>*/