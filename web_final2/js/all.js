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
		case "1":
			var Ref=firebase.database().ref('/Product/');
			//get Item Num
			Ref.on("value",function(snapshot){
				var num=snapshot.numChildren();
				for(i=1;i<=num;i++){
				//html
								var node=document.createElement("DIV");
								var att=document.createAttribute("class");
								var attid=document.createAttribute("id");
								var aid=document.createAttribute("id");
								var a=document.createElement("A");
								var href=document.createAttribute("href");
								att.value="goods";
								attid.value="good"+i;
								aid.value="a"+i;
								href.value="goodsdetail.html"+"?"+"Product_"+i;
								a.setAttributeNode(href);
								a.setAttributeNode(aid);
								node.setAttributeNode(attid);
								node.setAttributeNode(att);
								node.appendChild(a);
								document.getElementById('body_main').appendChild(node);

					var Ref=firebase.database().ref('/Product/Product_'+i);
					Ref.on('value',function(snapshot){
						//a
						//img
						var img=snapshot.child('P_Image').val();
						var node=document.createElement("IMG");
						var src=document.createAttribute("src");
						src.value=img;
						node.setAttributeNode(src);
						var aid="a"+i;
						document.getElementById(aid).appendChild(node);
						//name&price
						var name=snapshot.child('P_Name').val();
						var node=document.createElement("DIV");
						var c=document.createAttribute("class");
						c.value="goods_name";
						var h=document.createElement("H3");
						var t=document.createTextNode(name);
						h.appendChild(t);

						var price=("NT"+snapshot.child('P_Price').val());
						var sp=document.createElement("SPAN");
						var pricet=document.createTextNode(price);
						sp.appendChild(pricet);
						node.setAttributeNode(c);
						node.appendChild(h);
						node.appendChild(sp);
						document.getElementById(aid).appendChild(node);
					});
					
				}
			});
				
			break;
		case "2":
			var Ref=firebase.database().ref('/Product/');
			Ref.orderByChild("P_Type").equalTo(1).on("child_added",function(snapshot){
					var key=snapshot.key;
					var temp=key.split("_");
					var i=temp[1];
					
					var node=document.createElement("DIV");
					var att=document.createAttribute("class");
					var attid=document.createAttribute("id");
					var aid=document.createAttribute("id");
					var a=document.createElement("A");
					var href=document.createAttribute("href");
					att.value="goods";
					attid.value="good"+i;
					aid.value="a"+i;
					href.value="goodsdetail.html"+"?"+"Product_"+i;
					a.setAttributeNode(href);
					a.setAttributeNode(aid);
					node.setAttributeNode(attid);
					node.setAttributeNode(att);
					node.appendChild(a);
					document.getElementById('body_main').appendChild(node);

					var Ref=firebase.database().ref('/Product/Product_'+i);
					Ref.on('value',function(snapshot){
						//a
						//img
						var img=snapshot.child('P_Image').val();
						var node=document.createElement("IMG");
						var src=document.createAttribute("src");
						src.value=img;
						node.setAttributeNode(src);
						var aid="a"+i;
						document.getElementById(aid).appendChild(node);
						//name&price
						var name=snapshot.child('P_Name').val();
						var node=document.createElement("DIV");
						var c=document.createAttribute("class");
						c.value="goods_name";
						var h=document.createElement("H3");
						var t=document.createTextNode(name);
						h.appendChild(t);

						var price=("NT"+snapshot.child('P_Price').val());
						var sp=document.createElement("SPAN");
						var pricet=document.createTextNode(price);
						sp.appendChild(pricet);
						node.setAttributeNode(c);
						node.appendChild(h);
						node.appendChild(sp);
						document.getElementById(aid).appendChild(node);
					});
			});
			break;
		case "3":
			var Ref=firebase.database().ref('/Product/');
			Ref.orderByChild("P_Type").equalTo(2).on("child_added",function(snapshot){
					var key=snapshot.key;
					var temp=key.split("_");
					var i=temp[1];
					
					var node=document.createElement("DIV");
					var att=document.createAttribute("class");
					var attid=document.createAttribute("id");
					var aid=document.createAttribute("id");
					var a=document.createElement("A");
					var href=document.createAttribute("href");
					att.value="goods";
					attid.value="good"+i;
					aid.value="a"+i;
					href.value="goodsdetail.html"+"?"+"Product_"+i;
					a.setAttributeNode(href);
					a.setAttributeNode(aid);
					node.setAttributeNode(attid);
					node.setAttributeNode(att);
					node.appendChild(a);
					document.getElementById('body_main').appendChild(node);
					
					var Ref=firebase.database().ref('/Product/Product_'+i);
					Ref.on('value',function(snapshot){
						//a
						//img
						var img=snapshot.child('P_Image').val();
						var node=document.createElement("IMG");
						var src=document.createAttribute("src");
						src.value=img;
						node.setAttributeNode(src);
						var aid="a"+i;
						document.getElementById(aid).appendChild(node);
						//name&price
						var name=snapshot.child('P_Name').val();
						var node=document.createElement("DIV");
						var c=document.createAttribute("class");
						c.value="goods_name";
						var h=document.createElement("H3");
						var t=document.createTextNode(name);
						h.appendChild(t);

						var price=("NT"+snapshot.child('P_Price').val());
						var sp=document.createElement("SPAN");
						var pricet=document.createTextNode(price);
						sp.appendChild(pricet);
						node.setAttributeNode(c);
						node.appendChild(h);
						node.appendChild(sp);
						document.getElementById(aid).appendChild(node);
					});
			});
			break;
		case "4":
		var Ref=firebase.database().ref('/Product/');
			Ref.orderByChild("P_Type").equalTo(3).on("child_added",function(snapshot){
					var key=snapshot.key;
					var temp=key.split("_");
					var i=temp[1];
					
					var node=document.createElement("DIV");
					var att=document.createAttribute("class");
					var attid=document.createAttribute("id");
					var aid=document.createAttribute("id");
					var a=document.createElement("A");
					var href=document.createAttribute("href");
					att.value="goods";
					attid.value="good"+i;
					aid.value="a"+i;
					href.value="goodsdetail.html"+"?"+"Product_"+i;
					a.setAttributeNode(href);
					a.setAttributeNode(aid);
					node.setAttributeNode(attid);
					node.setAttributeNode(att);
					node.appendChild(a);
					document.getElementById('body_main').appendChild(node);
					
					var Ref=firebase.database().ref('/Product/Product_'+i);
					Ref.on('value',function(snapshot){
						//a
						//img
						var img=snapshot.child('P_Image').val();
						var node=document.createElement("IMG");
						var src=document.createAttribute("src");
						src.value=img;
						node.setAttributeNode(src);
						var aid="a"+i;
						document.getElementById(aid).appendChild(node);
						//name&price
						var name=snapshot.child('P_Name').val();
						var node=document.createElement("DIV");
						var c=document.createAttribute("class");
						c.value="goods_name";
						var h=document.createElement("H3");
						var t=document.createTextNode(name);
						h.appendChild(t);

						var price=("NT"+snapshot.child('P_Price').val());
						var sp=document.createElement("SPAN");
						var pricet=document.createTextNode(price);
						sp.appendChild(pricet);
						node.setAttributeNode(c);
						node.appendChild(h);
						node.appendChild(sp);
						document.getElementById(aid).appendChild(node);
					});
			});
			break;
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


function show() {
	

    var url = location.search;
    //取得問號之後的值
    var temp = url.split("?");
	var Ref=firebase.database().ref('/Product/'+temp[1]);
			//get Item Num
			Ref.on("value",function(snapshot){
				//img
				var node=document.createElement("DIV");
				var attc=document.createAttribute("class");
				var attid=document.createAttribute("id");
				attc.value="detail_img";
				attid.value=temp[1];
				node.setAttributeNode(attc);
				node.setAttributeNode(attid);
				document.getElementById('body_main').appendChild(node);

				var img=snapshot.child('P_Image').val();
				var inode=document.createElement("IMG");
				var src=document.createAttribute("src");
				src.value=img;
				inode.setAttributeNode(src);
				var aid=temp[1];
				document.getElementById(aid).appendChild(inode);


				// ---con---
				var node2=document.createElement("DIV");
				var node2_class=document.createAttribute("class");
				var node2_id=document.createAttribute("id");
				node2_class.value="detail_con"
				node2_id.value="detail_con_"+temp[1];
				node2.setAttributeNode(node2_class);
				node2.setAttributeNode(node2_id);
				document.getElementById('body_main').appendChild(node2);

				var name=snapshot.child('P_Name').val();
				var node_h4=document.createElement("H4")
				var t =document.createTextNode(name);
				node_h4.appendChild(t);
				
				var price=snapshot.child('P_Price').val();
				var s=document.createElement("SPAN");
				var sid=document.createAttribute("id");
				sid.value="NT";
				var p =document.createTextNode('NT$'+price);
				s.setAttributeNode(sid);
				s.appendChild(p);

				var detail_p =snapshot.child('P_Description').val();
				var dp = document.createElement("P");
				var pp=document.createTextNode(detail_p);
				dp.appendChild(pp);


				var s2=document.createElement("SPAN");
				var sid2=document.createAttribute("id");
				sid2.value="num";
				var p2 =document.createTextNode("購買數量 :");
				s2.setAttributeNode(sid2);
				s2.appendChild(p2);

				var ip=document.createElement("INPUT");
				var Buy_Num=document.createAttribute("id");
				var ty=document.createAttribute("type");
				Buy_Num.value="Buy_Num";
				ty.value="number";
				ip.setAttributeNode(ty);
				ip.setAttributeNode(Buy_Num);

				var ac =document.createElement("A");
				var onclick=document.createAttribute("onClick");
				var href =document.createAttribute("href");
				var ct=document.createAttribute("class");
				var sd =document.createTextNode("加入購物車");
				onclick.value="PutCart()";
				href.value="#";
				ct.value="cart";
				ac.setAttributeNode(onclick);
				ac.setAttributeNode(href);
				ac.setAttributeNode(ct);
				ac.appendChild(sd);

				var hid="detail_con_"+temp[1];
				document.getElementById(hid).appendChild(node_h4);
				document.getElementById(hid).appendChild(s);
				document.getElementById(hid).appendChild(dp);
				document.getElementById(hid).appendChild(s2);
				document.getElementById(hid).appendChild(ip);
				document.getElementById(hid).appendChild(ac);

			});
	
   }
 
function PutCart(){
	firebase.auth().onAuthStateChanged(function(user) {
		//check if login
		var name = user.displayName;
		var uid = user.uid;
		alert("name:"name+",uid:"+uid);
		if(user){
			var url = location.search;
    		var temp = url.split("?");
  			var BuyItem=temp[1];
  			var Buy_Num=document.getElementById('Buy_Num').value;
  			//check if input==null
  			if(Buy_Num==""){
  				alert('請輸入數字');
  			}else{
  				alert(Buy_Num);
  			
  				var database=firebase.database();
				var usersRef=database.ref('Cart/');
				usersRef.once('value', function(snapshot) {
    			if(snapshot.hasChild(uid)){
    				
    			}else{
  					database.ref('Cart/'+uid+'/').set({
  						Buy_Product: Buy_Item,
  						Buy_Num: Buy_Num		
  			});
    		}
   	 		
  		});
  			}
		}else{
			alert("請先登入");
		}
	});
}

