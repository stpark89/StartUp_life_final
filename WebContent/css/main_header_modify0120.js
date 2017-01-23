//이메일 정규식 함수
function emailcheck(strValue)
{
	
	var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
	//입력을 안했으면
	if(strValue.lenght == 0 || strValue == '')
	{
		alert("이메일을 입력해주세요 !");
		$('#loginIdInput').focus();
		return false;
	}
	//이메일 형식에 맞지않으면
	if (!strValue.match(regExp))
	{
		alert("이메일 형식이 아닙니다!");
		$('#loginIdInput').focus();
		return false;
	}
	return true;
}

//로그인 유효성 함수
function loginFunc(id, pw){
	
	var result = false;
	
	if(!emailcheck(id)){
		return false;
	}
	if(pw == ''){
		alert("비밀번호를 입력해주세요 !! ");
		$('#loginPwInput').focus();
		return false;
	}
	
	result = true;
	return result;
}

//관심사 관련 전역 변수
var inter0 = 0;
var inter1 = 0;
var inter2 = 0;
var inter3 = 0;

// JavaScript Document
$(document).ready(function(e) {
	
	$('#logo').click(function(){
		location.href="index.do";
	});
	
	var didsub = 0;
	var pNum = 0;
	var psts = 0;
	var mwEvt = (/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel");	
	text_slide();
	setInterval("text_slide()",8000);
	
      //로그인 버튼 클릭시
	  $('#loginBtn').click(function(){
		 var id,pw;
		 id = $('#loginIdInput').val();
		 pw = $('#loginPwInput').val();
		 var result = loginFunc(id, pw);
		 
		 if(result == true){
			alert("if 탐 !!");
			$.ajax({
				url:"Login.do",
				type:"post",
				data : {
					id : id,
					pw : pw
				},		
				success : function(data){
					if(data.result == "성공"){
						alert("로그인 성공!");
						location.reload();
					}else{
						alert("실패하였습니다!");
					}
				},error : function(){
					alert("죄송합니다. 잠시후 다시 이용해 주세요!!");
				}
			});
			
		}
	  });

	   /////////////회원가입 부분 추가
	   //로그인
	  $("#s_loginDiv").click(function() {
	      $("#login_bg").fadeIn();
	      $("#loginForm").fadeIn();   
	  });
	   
	  //내정보 보기 아이콘
	  $('#s_MyInfoIcon').click(function(){
		  location.href="infoView.do";
	  });
	  
	  //로그아웃 버튼
	  $('#s_logOutIcon').click(function(){
		  location.href="LogOut.do";
	  });
	  
		//닫기버튼
		$("#loginForm>span").click(function(e) {
	        
			$("#login_bg").fadeOut();
			$("#loginForm").fadeOut();
			
			
			setTimeout("loginDisplay()", 1000);
	    }); 	
		
	   
		$("#login>button").eq(1).click(function() {
			
			$("#login").css("display","none");
			$("#register").css("display","block");	
		});
		
		var gender = '';
		//회원가입 버튼 클릭시.
		$("#register>button").eq(2).click(function() {
			
			var checkMember = false;
			
			checkMember = AddMemberCheckFun(gender);
			if(checkMember == false){
				return false;
			}
			//아이디 중복검사한 결과 >> 1 넘겨줌
			var hidden_id = $('#check_Id_value').val();
			checkMember = check_addMember(hidden_id , 1);
			
			if(checkMember == false){
				alert("이메일 중복검사를 해주세요 !");
				return false;
			}
			
			//닉네임 중복검사한 결과  >> 2 넘겨줌
			var hidden_nick = $('#hidden_nick').val();
			checkMember = check_addMember(hidden_nick , 2);
			
			if(checkMember == false){
				alert("닉네임 중복 검사를 해주세요!");
				return false;
			}
			
			//생년월일 중복 검사를 시작해볼까 
			var birthC = $('#member_Birth').val();
			checkMember = check_birth(birthC);
		
			if(checkMember == true){
					alert("회원가입에 성공 하셨습니다.");
					
					var nickName = $('#member_nickName').val();
					var email = $('#member_Id').val();
					var pw = $('#member_Pw').val();
					var birth = $('#member_Birth').val();
					
					//관심사 담기는 배열
					var favorit = new Array();
					
					if(inter0 == 1){
						favorit.push('경제');
					} 
					
					if(inter1 == 1){
						favorit.push('사회');
					}
					
					if(inter2 == 1){
						favorit.push('연애');
					}
					
					if(inter3 == 1){
						favorit.push('스포츠');
					}
					
					$.ajax({
						url:"AddMember.do",
						type : "POST",
						data : {
							nickName : nickName,
							id : email,
							pw : pw,
							birth : birth,
							gender : gender,
							favorit : JSON.stringify(favorit)
						},
						success : function(data){
							
							$('#member_nickName').val('');
							$('#member_Id').val('');
							$('#member_Pw').val('');
							$('#member_Repw').val('');
							$('#member_Birth').val('');
							$('#check_Id_value').val('');
							$('#hidden_nick').val('');
						}
					});
					
					
					//초기화 부분
					/*$('#member_nickName').val('');
					$('#member_Id').val('');
					$('#member_Pw').val('');
					$('#member_Repw').val('');
					$('#member_Birth').val('');*/
					//성별 문제 색상 변경 
					
					
					$("#login").css("display","block");
					$("#register").css("display","none");
				}else{
					
				}
			
		});
		
		$("#gender").find("li").click(function(e) {
			
			$(this).css({backgroundColor:"#333",color:"#fff"}).siblings().css({backgroundColor:"#fff",color:"#000"});
			gender = $(this).attr("id");
	    });
		
		
		////////////////////////////////////////////////////////////////
		///관심사///
		$("#interest").find("li").click(function(e) {
	        var interSts = $(this).index();
			
			switch(interSts) {
				case 0:
					if(inter0 == 0) {
						$(this).css({backgroundColor:"#333",color:"#fff"});
						inter0 = 1;
					} else if(inter0 == 1) {
						$(this).css({backgroundColor:"#fff",color:"#000"});
						inter0 = 0;
					}
					break;
					
				case 1:
					if(inter1 == 0) {
						$(this).css({backgroundColor:"#333",color:"#fff"});
						inter1 = 1;
					} else if(inter1 == 1) {
						$(this).css({backgroundColor:"#fff",color:"#000"});
						inter1 = 0;
					}
					break;
					
				case 2:
					if(inter2 == 0) {
						$(this).css({backgroundColor:"#333",color:"#fff"});
						inter2 = 1;
					} else if(inter2 == 1) {
						$(this).css({backgroundColor:"#fff",color:"#000"});
						inter2 = 0;
					}
					break;
					
				case 3:
					if(inter3 == 0) {
						$(this).css({backgroundColor:"#333",color:"#fff"});
						inter3 = 1;
					} else if(inter3 == 1) {
						$(this).css({backgroundColor:"#fff",color:"#000"});
						inter3 = 0;
					}
					break;
						
			}
			
	    });
		
		////////////////////////////////
	   

	
	
	var address = location.href.split("/");
	var leng = address.length;	
	address = address[leng-1].split(".")[0];
	
	if(address == "index" || address == "header") {
		didsub = 0;
	} else {
		didsub = 1;	
	}
	
	
	
	if(didsub == 1) {
		$("#nav").css({position:"relative", opacity:"1"});
	}
	
	
	var mo_sts = 0;
	$("#more").click(function(e) {
        
		if(mo_sts == 0) {
			$("#dashboard").animate({height:"1000px"});
			$("#more").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
			$(".hidden_box").animate({opacity:1});
			mo_sts = 1;
		} else if(mo_sts == 1) {
			$("#dashboard").animate({height:"600px"});
			$("#more").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
			$(".hidden_box").animate({opacity:0});
			mo_sts = 0;
		}
    });
	
	
	//화살표 누를때 메뉴 나오는 것 /////////////////////////////////////// 
	var bot_sts = 0;
	$("#bott_menu").click(function(e) {
     	var bott_ul = $("#banner>div").eq(1).find("ul").height();
		if(bot_sts == 0) {
			$("#banner>div").eq(1).animate({bottom:"0px"});
			$("#bott_menu").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
			bot_sts = 1;
		} else if(bot_sts == 1) {
			$("#banner>div").eq(1).animate({bottom:-bott_ul+"px"});
			$("#bott_menu").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
			bot_sts = 0;
		}
    });
	
	
	$(window).resize(function() {
		var bott_ul = $("#banner>div").eq(1).find("ul").height();
		
		if(bot_sts == 0) { 
			$("#banner>div").eq(1).css({bottom:-bott_ul+"px"});
		} else if(bot_sts == 1) {
			$("#banner>div").eq(1).css({bottom:"0px"});
		}
			
	});

	////////////////////////////////////////////////////////////////////////
	
	
	$("#mainMenu").find("li").eq(3).hover(function(){
		
		$("#menu_bg").stop().animate({height:"80px"},300);
	}, function(){
		
		$("#menu_bg").stop().animate({height:"0px"},300);
	});
	
	//모바일 용 메뉴
	var mSts = 0;
	$("#nav>div").eq(0).click(function() {
		
		if(mSts == 0) {
			$("#m_menu").animate({height:"200px"});
			mSts = 1;
		} else if(mSts == 1) {
			
			$("#m_menu").animate({height:"0"});	
			mSts = 0;
		}
	});
	
	//의안 상세보기 클릭시
	$("#statuteBtn").click(function(){
		location.href="statute.do";
	});
	
	//국회의원 상세보기 버튼 클릭시
	$('#ParliamentBtn').click(function(){
		location.href="Member_Parliament.do";
	});
	
	//커뮤니티 페이지
	$('#boardIndexBtn').click(function(){
		location.href="CommunityIndex.do";
	});
	
	$('#noticeIndexBtn').click(function(){
		location.href="NoticeIndex.do";
	});
	
});

var tSts = 0;
function text_slide() {
	
	if(tSts == 0) {
		$("#banner>div").eq(0).find("h2").animate({top:"0",opacity:"1"},1000);	
		$("#banner>div").eq(0).find("p").delay(200).animate({top:"0",opacity:"1"},1000);
		
		$("#banner>div").eq(0).find("h2").delay(5000).animate({top:"-50px",opacity:"0"},1000,function() {
			$(this).text("대한민국 헌법 1조 2항");
			$("#banner>div").eq(0).find("h2").css({top:"50px",opacity:"0"});
		});	
		$("#banner>div").eq(0).find("p") .delay(5000).animate({top:"-50px",opacity:"0"},1000,function() {
			$(this).text("대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.");
			$("#banner>div").eq(0).find("p").css({top:"50px",opacity:"0"});
		});
		
		tSts = 1;
		
	} else if (tSts == 1) {
		$("#banner>div").eq(0).find("h2").animate({top:"0",opacity:"1"},1000);	
		$("#banner>div").eq(0).find("p").delay(200).animate({top:"0",opacity:"1"},1000);
		
		$("#banner>div").eq(0).find("h2").delay(5000).animate({top:"-50px",opacity:"0"},1000,function() {
			$(this).text("대한민국 헌법 1조 1항");
			$("#banner>div").eq(0).find("h2").css({top:"50px",opacity:"0"});
		});	
		$("#banner>div").eq(0).find("p").delay(5000).animate({top:"-50px",opacity:"0"},1000,function() {
			$(this).text("대한민국은 민주공화국이다.");
			$("#banner>div").eq(0).find("p").css({top:"50px",opacity:"0"});
		});
		
		tSts = 0;
	}
}

function loginDisplay() {
	$("#login").css("display","block");
	$("#register").css("display","none");
}


//아이디 >> 이메일 중복 체크
function check_Id(){
	var id = $("#member_Id").val();
	if(id == ''){
		alert("이메일을 입력해주세요 !!");
		$('#member_Id').focus();
	}else{
		$.ajax({
			url:"id_Check.do",
			data : {
				id : id
			},
			success : function(data){
				//중복검사 통과 했을때 !!
				if(data.use == 1){
					alert(data.msg);
					$('#check_Id_value').val(data.hidden_id);
				}else{
					alert(data.msg);
					$('#member_Id').val('');
					$('#member_Id').focus();
				}
			}
		});
	}
}

//닉네임 중복 체크
function check_Nick(){
	var nick = $('#member_nickName').val();
	if(nick == ''){
		alert("닉네임을 입력해주세요 !!");
		$('#member_nickName').focus();
		return false;
	}else{
		$.ajax({
			url : "check_N.do",
			data : {
				nick : nick
			},
			success : function(data){
				//중복검사 통과 했을때 !!
				if(data.use == 1){
					alert(data.msg);
					$('#hidden_nick').val(data.hidden_nick);
				}else{
					alert(data.msg);
					$('#member_nickName').val('');
					$('#member_nickName').focus();
				}
			}
		});
	}
}

//회원가입 유효성 검사하는 함수
function AddMemberCheckFun(gender){
	var result = true;
	
	var email = $('#member_Id').val();
	if(!emailcheck(email)){
		$('#member_Id').focus();
		result = false;
		return result;
	}
	
	var nickName = $('#member_nickName').val();
	if(nickName == ''){
		alert("닉네임을 입력해주세요!");
		$('#member_nickName').focus();
		result = false;
		return result;
	}
	
	var pw = $('#member_Pw').val();
	if(pw == ''){
		alert("비밀번호를 입력해주세요 !!");
		$('#member_Pw').focus();
		result = false;
		return result;
	}
	var rePw = $('#member_Repw').val();
	if(rePw == ''){
		alert("비밀번호를 입력해주세요 !!");
		$('#member_Repw').focus();
		result = false;
		return result;
	}
	
	if(pw != rePw){
		alert("비밀번호가 다릅니다. 비밀번호를 확인해주세요 !!");
		$('#member_Pw').val();
		$('#member_Repw').val();
		$('#member_Pw').focus();
		result = false;
		return result;
	}
	
	var birth = $('#member_Birth').val();
	if(birth == ''){
		alert("생년월일을 입력해주세요!");
		$('#birth').focus();
		result = false;
		return result;
	}
	
	//성별 유효성
	if(gender == '' || gender == null){
		alert("성별을 선택해주세요 !!");
		result = false;
		return result;
	}
	return result;
}

//회원가입시 사용 하는 id , 닉네임 중복검사  했는지 확인하는 최종 함수
function check_addMember(obj , choose){
	//아이디 검사
	if(choose == 1){
		var result = false;
		var inputValue = $('#member_Id').val();
		if(inputValue == obj){
			result = true;
		}
		return result;
	}
	
	//닉네임 검사
	if(choose == 2){
		var result = false;
		var inputValue = $('#member_nickName').val();
		if(inputValue == obj){
			result = true;
		}
		return result;
	}
	
}

//생년월일 관련된 유효성 검사
function check_birth(birth){
	var result = true;
	//숫자 입력한건지 확인함
	regNumber = /^[0-9]*$/;
	if(!regNumber.test(birth)) {
	    alert('숫자만 입력해주세요.');
	    $('#member_Birth').focus();
	    result = false;
	    return result;
	}
	//날짜형식 YYYY-MM-DD 형식인지 체크함
	var format = /[12][0-9]{3}[01][0-9][0-3][0-9]/; //YYYY-MM-DD 검사표현식
    if(birth.search(format) == -1){
    	alert("날짜 형식을 지켜주세요 !! ex - 19990101");
    	$('#member_Birth').focus();
    	result = false;
	    return result;
    }
    return result;
}

