var config = {
	apiKey: "AIzaSyC29IcXEjMcz1GMWIb93UPkJBKmRexvowM",
	authDomain: "facebooklogin-f6d7c.firebaseapp.com",
	databaseURL: "https://facebooklogin-f6d7c.firebaseio.com",
	projectId: "facebooklogin-f6d7c",
	storageBucket: "facebooklogin-f6d7c.appspot.com",
	messagingSenderId: "269057605882"
	};

$( document ).ready(function() {
    	console.log( "ready!" );
    	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  		var name = user.displayName;
		  		var photoUrl = user.photoURL;
		        console.log("is login");
		        console.log(user);
		        changeheader(name,photoUrl);
		        $( "#headerLogout" ).show();
		    }else{
		    	$( "#headerLogout" ).hide();
		    	console.log("no login");
		    	console.log(user);
		    }
	});
});

function login(){
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({
	  'display': 'popup'
	});
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
		var name,email,photoUrl,uid;
		name = user.displayName;
  		email = user.email;
  		photoUrl = user.photoURL;
  		uid = user.uid;
  		console.log(uid);
  			var database=firebase.database();
			var usersRef=database.ref('Users/');
			usersRef.once('value', function(snapshot) {
    			if(snapshot.hasChild(uid)){
    				alert(uid+'exist');
    			}else{
    				alert(uid+"not exist");
  					database.ref('Users/'+uid+'/').set({
  						username: name,
  						email: email,
  						profile_pic:photoUrl		
  			});
    		}
   	 		
  		});
  		$( "#headerLogout" ).show();

	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
	}

function logout(){
	firebase.auth().signOut().then(function() {
 	console.log("logout ok");
 	document.getElementById('headerLogin').innerHTML='<a href="#" onClick="login()">登入</a>';
 	 // Sign-out successful.
		}).catch(function(error) {
  	// An error happened.
  	console.log("logout error");
	});
	}

function changeheader(name,img){
	console.log("name:"+name);
	console.log("img:"+img);
	document.getElementById('headerLogin').innerHTML='<a href="#"><img src="'+img+'">'+name+'</a>';
}