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

   function isInteger(obj) {
    return obj%1 === 0
}
 
function PutCart(){
	firebase.auth().onAuthStateChanged(function(user) {
		//check if login
		var uid = user.uid;
		var today=new Date();
		var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日'+today.getHours()+'時'+today.getMinutes()+'分'+today.getSeconds()+'秒';
		if(user){
			var url = location.search;
    		var temp = url.split("?");
  			var Buy_Item=temp[1];
  			var Buy_Num=document.getElementById('Buy_Num').value;
  			//check if input==null
  			if(Buy_Num==""||Buy_Num<=0||isInteger(Buy_Num)==false){
  				alert('請輸入大於0的整數');
  			}else{
  				alert("已放入購物車!");
  			
  				var database=firebase.database();
				var usersRef=database.ref('Cart/');
				usersRef.once('value', function(snapshot) {
    			if(snapshot.hasChild(uid)){
    				var postData={
    					Buy_Product : Buy_Item,
    					Buy_Num:Buy_Num
    				};
    				//var newPostKey=firebase.database().ref().child('Cart/').push().key;
    				var updates={};
    				updates['/Cart/'+uid+'/'+currentDateTime]=postData;
    				return firebase.database().ref().update(updates);

    			}else{
 					var postData={
    					Buy_Product : Buy_Item,
    					Buy_Num:Buy_Num
    				};
    				//var newPostKey=firebase.database().ref().child('Cart/').push().key;
    				var updates={};
    				updates['/Cart/'+uid+'/'+currentDateTime]=postData;
    				return firebase.database().ref().update(updates);
    		}
   	 		
  		});
  			}
		}else{
			alert("請先登入");
		}
	});
}

function ShowCart(){
	firebase.auth().onAuthStateChanged(function(user) {
		var uid =user.uid;
		var Total=0;
		var database=firebase.database().ref('Cart/');
		database.once('value',function(snapshot){
			if(snapshot.hasChild(uid)){
				var Ref=firebase.database().ref('Cart/'+uid+'/');
				Ref.on("value",function(snapshot){
					snapshot.forEach(function(childSnapshot){
						var key=childSnapshot.key;
						var P_No=childSnapshot.child('Buy_Product').val();
						var P_Num=childSnapshot.child('Buy_Num').val();
						var P_Ref=firebase.database().ref('Product/'+P_No+'/');
						P_Ref.on("value",function(snapshot){
							var P_Name=snapshot.child('P_Name').val();
							var P_Price=snapshot.child('P_Price').val();
							
							//html
							var tr=document.createElement("tr");

							var td1=document.createElement("td");
							var td1_text =document.createTextNode(P_Name);
							td1.appendChild(td1_text);

							var td2=document.createElement("td");
							var td2_text =document.createTextNode("NT$"+P_Price);
							td2.appendChild(td2_text);

							var td3=document.createElement("td");
							var td3_text =document.createTextNode(P_Num);
							td3.appendChild(td3_text);

							var td4=document.createElement("td");
							var t=P_Price*P_Num;
							var td4_text =document.createTextNode(t);
							td4.appendChild(td4_text);

							var td5=document.createElement("td");
							var A=document.createElement("A");
							var href=document.createAttribute("href");
							var onclick=document.createAttribute("onclick");
							onclick.value="deleteCart('"+key+"')";
							href.value="#";
							A.setAttributeNode(href);
							A.setAttributeNode(onclick);
							var image=document.createElement('img');
							var src=document.createAttribute('src');
							src.value=('img/delete.png');
							var id=document.createAttribute('id');
							id.value=('xxx');
							image.setAttributeNode(id);
							image.setAttributeNode(src);
							A.appendChild(image);
							td5.appendChild(A);

							tr.appendChild(td1);
							tr.appendChild(td2);
							tr.appendChild(td3);
							tr.appendChild(td4);
							tr.appendChild(td5);

							document.getElementById('CartTable').appendChild(tr);
							
							Total=Total+t;
							document.getElementById('All_Price').innerHTML="總價格:NT$"+Total;
						});
					});
					
				});
			}else{
				alert("目前沒有資料喔");
			}
	});

	});
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function deleteCart(key){
	firebase.auth().onAuthStateChanged(function(user) {
		var uid=user.uid;
		var ref=firebase.database().ref('Cart/'+uid+'/');
		ref.child(key).remove();
		});
		location.reload();
}

function Buy(){
	firebase.auth().onAuthStateChanged(function(user){
		var Cart_keys=[];
		var today=new Date();
		var currentDateTime =today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日'+today.getHours()+'時'+today.getMinutes()+'分'+today.getSeconds()+'秒';
		var uid=user.uid;
		var record_content=[];
		var total=0;
		var record_no=0;
		var ref=firebase.database().ref('record/'+uid+'/');
		ref.once('value', function(snapshot) {
    			var num=snapshot.numChildren();
    			if(num==0){
    				alert("no child");
    			}else{
    				var record_no=(num+1);
    				var ref=firebase.database().ref('Cart/'+uid+'/');
					ref.on('value',function(snapshot){
						snapshot.forEach(function(childSnapshot){
							var Cart_key=childSnapshot.key;
							var P_No=childSnapshot.child('Buy_Product').val();
							var P_Num=childSnapshot.child('Buy_Num').val();
							var P_Ref=firebase.database().ref('Product/'+P_No+'/');
							P_Ref.on("value",function(snapshot){
								var P_Name=snapshot.child('P_Name').val();
								var P_Price=snapshot.child('P_Price').val();
								record_content.push(P_Name+"*"+P_Num);
								var t=(P_Price*P_Num);
								Cart_keys.push(Cart_key);
								total=total+t;
							});

						});
						for(i=0;i<Cart_keys.length;i++){
							deleteCart(Cart_keys[i]);
							}

						var postData={
    						record_content : record_content,
    						record_total : total,
    						record_Time : currentDateTime
    					};
    					var updates={};
    					updates['/record/'+uid+'/'+'record_'+record_no]=postData;
    					return firebase.database().ref().update(updates);
    					/*firebase.database().ref().update(updates).then(function(){
    						for(i=0;i<Cart_keys.length;i++){
							deleteCart(Cart_keys[i]);
							}
    					});*/
    					

					

					});
    			}
	});
		
	});

}