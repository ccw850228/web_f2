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

function ListGoods(page){
	switch(page){
		case 1:
			alert("1");
			var ProductRef=firebase.database().ref('/Product/Product_1');
				ProductRef.once('value', function(snapshot) {
				var P_Name=snapshot.child("P_Name").val();
				alert(P_Name);
			});
			break;
		case 2:
			alert("2");
			break;
		case 3:
			alert("3");
			break;
		case 4:
			alert("4");
	}
}


// -------------add--------------

$(function(){
	// 先取得相關區塊及塊的高
	// 並取得 li
	var $block = $('#new_arrival'), 
		_blockHeight = $block.height(), 
		$list = $block.find('li'), 
		_liOpacity = 0.8, 
		_animateSpeed = 400, 
		_selectedIndex = 0;
 
	// 產生下方控制用的 ul li
	var $controls = $('<ul class="controls"></ul>'), 
		_li = '';
	$list.each(function(i){
		var $this = $(this).css({
				position: 'absolute',
				top: i==_selectedIndex ? 0 : _blockHeight,
				zIndex: i==_selectedIndex ? 1 : 0, 
				display: i==_selectedIndex ? 'block' : 'none'
			}), 
			$a = $this.find('a');
 
		_li += '<li><a href="'+$a.attr('href')+'">'+$a.find('img').attr('alt')+'</a></li>';
	});
	// 幫 li 加上透明度
	// 並計算 li 基本寬度及最大寬度
	var $li = $controls.html(_li).appendTo($block).find('li').css('opacity', _liOpacity), 
		_liWidth = $li.width(), 
		_selectedWidth = $block.width() - ($li.length - 1) * _liWidth - 1;
 
	// 當滑鼠移到 li 上時
	$li.mouseover(function(){
		var $this = $(this), 
			_index = $this.index();
 
		// 如果現在移上去的跟已顯示是的同一個就跳過
		if(_selectedIndex == _index) return;
 
		// 進行動畫切換
		$list.eq(_index).stop(true, true).css({
			top: _blockHeight, 
			zIndex: 1, 
			display: 'block'
		}).animate({
			top: 0
		}, _animateSpeed).end().eq(_selectedIndex).stop(true, true).animate({
			top: -_blockHeight
		}, _animateSpeed, function(){
			$(this).hide();
		});
 
		// 把滑鼠移上去的 li 寬度變成最大寬度
		// 並將上一個最大寬度的 li 寬度變成基本寬度
		//$this.addClass('selected').find('a').width(_selectedWidth).end().siblings('.selected').removeClass('selected').find('a').width(_liWidth-1);
		$this.addClass('selected').find('a').width(_selectedWidth);
		$li.eq(_selectedIndex).removeClass('selected').find('a').width(_liWidth-1);
 
		_selectedIndex = _index;
	}).eq(_selectedIndex).addClass('selected').find('a').width(_selectedWidth);
});

// 用 speed 表示切換輪播的速度
var timer, speed = 1000;
 
// 用來自動輪播使用
function auto(){
	var _index = (_selectedIndex + 1) % $li.length;
	$li.eq(_index).mouseover();
 
	timer = setTimeout(auto, speed + _animateSpeed);
}
 
$block.hover(function(){
	// 當滑鼠移入時, 停止計時器
	clearTimeout(timer);
}, function(){
	// 當滑鼠移出時, 啟動計時器
	timer = setTimeout(auto, speed);
});
 
// 啟動計時器
timer = setTimeout(auto, speed);