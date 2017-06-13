var config = {
	apiKey: "AIzaSyC29IcXEjMcz1GMWIb93UPkJBKmRexvowM",
	authDomain: "facebooklogin-f6d7c.firebaseapp.com",
	databaseURL: "https://facebooklogin-f6d7c.firebaseio.com",
	projectId: "facebooklogin-f6d7c",
	storageBucket: "facebooklogin-f6d7c.appspot.com",
	messagingSenderId: "269057605882"
	};

$( document ).ready(function() {
    	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  		var name = user.displayName;
		  		var photoUrl = user.photoURL;
		        changeheader(name,photoUrl);
		        $( "#headerLogout" ).show();
		    }else{
		    	$( "#headerLogout" ).hide();
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

  			var database=firebase.database();
			var usersRef=database.ref('Users/');
			usersRef.once('value', function(snapshot) {
    			if(snapshot.hasChild(uid)){
    				
    			}else{
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
 	document.getElementById('headerLogin').innerHTML='<a href="#" onClick="login()">登入</a>';
		}).catch(function(error) {
  	console.log("logout error");
	});
	}

function changeheader(name,img){
	document.getElementById('headerLogin').innerHTML='<a href="#"><img src="'+img+'">'+name+'</a>';
}

function Type_All(){
	alert("TypeAll");
	var database=firebase.database();
	var ProductRef=database.ref('Product/');
	console.log('test');
	ProductRef.on('value', function(snapshot) {
		alert('test')
    	snapshot.forEach(function(childSnapshot) {
      		var childData = childSnapshot.val();
      		alert(childData);
    	});
	});
}

function Type_Product1(){
	alert("TypeProduct1");
}

function Type_Product2(){
	alert("Type_Product2");
}

function Type_Product3(){
	alert("Type_Product3()");
}