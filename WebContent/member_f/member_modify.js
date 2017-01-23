// JavaScript Document

$(document).ready(function(e) {
	
    //수정 완료 버튼 미리 숨겨둠
	$('#modifyBtn').hide();
	
	$("#tabMenu").find("li").click(function(e) {
        
		var tSts = $(this).index();
		
		//console.log(tSts);
		
		$(this).css({backgroundColor:"#333",color:"#fff"}).siblings().css({backgroundColor:"#fff",color:"#000"});
		
		$("#tabContent").find("div").eq(tSts).css({display:"block"}).siblings().css({display:"none"});
    });
	

	
	$("#news>ul").find("li").click(function(e) {
        
		$(this).css({backgroundColor:"#333",color:"#fff"}).siblings().css({backgroundColor:"#fff",color:"#000"});
    });
	
	$("#comm>div").find("span").click(function() {
		
		$("#comm>div").html("<textarea></textarea><button>등록</button>");	
	});
	
	var tr_length = $("#bill_table").find("tr").length;
	
	var billSts = 0;
	$("#bill").find("button").click(function() {
		
		if(billSts == 0) {	
			$("#bill").animate({height:500+(50*(tr_length-5))},400);
			$("#bill").find("div").animate({height:(50*(tr_length))},400);
			billSts = 1;
		} else if(billSts == 1) {
			$("#bill").animate({height:"500px"},400);
			$("#bill").find("div").animate({height:"290px"},400);
			billSts = 0;
		}
	});
	
	$("#attendance_table ul").find("li").click(function(e) {
        
		$(this).css({backgroundColor:"#333",color:"#fff"}).siblings().css({backgroundColor:"#fff",color:"#000"});
    });
	
	$(".pgNum").click(function(e) {
        
		$(this).css({backgroundColor:"#333",color:"#fff"}).siblings().css({backgroundColor:"#fff",color:"#000"});
    });
	
	var property_list = $("#property>ul").find("li").length;
	
	$("#property").css({height:250+(50*property_list)});

	var tb_height = $("#info").height();
	$("#basicInfo").css({height:600 + tb_height});

	//hidden 값 !! 
	var hiddenNick = $('#nick').val();
	
	$("#wrap>button").click(function(e) {
        var nick_form = "";
		nick_form += '<input type="text" class="nick" name="nickName" value='+hiddenNick+'>';
		nick_form += '<button type="button" class="short_btn" onclick="checkNickName(this);">중복확인</button>';
		
		var interest = '';
		interest += '<th>관심사</th>';
		interest += '<td><input type="checkbox" id="favorit1" name="favorit2" value="경제" onclick="checkBox(this)"/>경제</td>';
		interest += '<td><input type="checkbox" id="favorit2" name="favorit2" value="사회" onclick="checkBox2(this)"/>사회</td>';
		interest += '<td><input type="checkbox" id="favorit3" name="favorit2" value="연예" onclick="checkBox3(this)"/>연예</td>';
		interest += '<td><input type="checkbox" id="favorit4" name="favorit2" value="스포츠" onclick="checkBox4(this)"/>스포츠</td>';
		
		$("#personal_tb>table").find("tr").eq(1).find("td").html(nick_form);
		$("#personal_tb>table").find("tr").eq(4).html(interest);
		//$(this) >> 정보수정하기 버튼
		$(this).hide();
		//수정완료 버튼
		$('#modifyBtn').show();
    });
	
}); 

//첫번째꺼 
var chk_Array = '';
function checkBox(obj){
	
	console.log("checkBox 호출");
	
	var $chk = $(obj);
	if($chk.prop("checked")){
		chk_Array = $chk.attr("value");
		console.log("체크 : "+$chk.attr("value"));	
	}else{
		chk_Array = '';
		console.log("체크 안됨");
	}
}

var chk_Array2 = '';
function checkBox2(obj){
	console.log("checkBox2 호출");
	
	var $chk = $(obj);
	if($chk.prop("checked")){
		chk_Array2 = $chk.attr("value");
		console.log("체크 : "+$chk.attr("value"));	
	}else{
		chk_Array2 = '';
		console.log("체크 안됨");
	}
}

var chk_Array3 = '';
function checkBox3(obj){
	console.log("checkBox3 호출");
	
	var $chk = $(obj);
	if($chk.prop("checked")){
		chk_Array3 = $chk.attr("value");
		console.log("체크 : "+$chk.attr("value"));	
	}else{
		chk_Array3 = '';
		console.log("체크 안됨");
	}
}

var chk_Array4 = '';
function checkBox4(obj){
	
	console.log("checkBox4 호출");
	
	var $chk = $(obj);
	if($chk.prop("checked")){
		chk_Array4 = $chk.attr("value");
		console.log("체크 : "+$chk.attr("value"));	
	}else{
		chk_Array4 = '';
		console.log("체크 안됨");
	}
}


var inputNick = '';

//처음 로그인한 사용자가 사용하는 닉네임과 변경한 닉네임 값 비교 하는 메서드
function checkNickName(tag){
	//model 에 담겨 있던 데이터 
	var dbNickName = $('#nick').val();
	//내가 입력하는 데이터
	var $obj = $(tag);
	var nickNameValue = $obj.prev().val();	
	if(dbNickName == nickNameValue){
		alert("현재 사용하시고 있는 닉네임 입니다!");
		$obj.prev().focus();
		$('#short_btn_hidden').val(nickNameValue);
	}else{
		changeNick(nickNameValue);
	}
}
//디비에서 닉네임값 읽어와서 비교 하는 부분.
function changeNick(nickNameValue){
	$.ajax({
		url : "checkNick.do",
		data : {
			nick : nickNameValue
		},
		success : function(data){
			//사용가능한 닉네임
			if(data.use == '1'){
				//중복검사 했다는 의미
				alert(data.msg);
				$('#short_btn_hidden').val(nickNameValue);
			}else{
				alert(data.msg);
				$obj.prev().focus();
			}
		}
	});
}

//최종 변경 합시다!!
function modifyResult(){
	//input 에  입력해져 있는  닉네임
	var checkNick = $("#personal_tb>table").find("tr").eq(1).find("td").find("input").val();
	if(checkNick == ''){
		alert("닉네임을 입력해주세요");
		return false;
	}else{
		//마지막 비교 하는 부분
		var tandfalse = finalCheck(checkNick);
		if(tandfalse == false){
			return false;
		}else{
			//서브밋 하기전 중복검사 했는지 다시 한번 확인함
			if(checkNick != $("#nick").val()){
				$.ajax({
					url : "submitMyModify.do",
					data : {
						nick : checkNick
					},
					success : function(data){
						//닉네임 중복검사 했다는 의미 
						if(data.result == 'success'){
							$("#personal_tb>table").find("tr").eq(1).find("td").find("input").val(checkNick);
							modifySubmit();
						}else{
							alert("중복검사를 진행해주세요 !!");
							$("#personal_tb>table").find("tr").eq(1).find("td").find("input").focus();
							return false;
						}
					}
				});
			//바로 modify 작업 진행하면 됨
			}else{
				modifySubmit();
			}
		}
	}
}

//서브밋 직전 내가 입력해놓은 값이 중복검사를 한건지 ...
function finalCheck(checkNick){
	
	//중복검사 버튼 클릭시 들어가지는 hidden input 에 있는 값
	var hiddenInput = $('#short_btn_hidden').val();
	if(hiddenInput == '' || (hiddenInput != checkNick)){
		alert("중복검사를 해주세요 !!");
		$("#personal_tb>table").find("tr").eq(1).find("td").find("input").focus();
		return false;
	}
	//최종 서브밋 전 input 태그 값 >> checkNick
}


//>> 다 통과하고 넘어온거니까 여기서 submit 이벤트 발생 시키면 끝남
function modifySubmit(){
	var favorit_Result = new Array();
	if(chk_Array != ''){
		favorit_Result.push(chk_Array); 
	}
	
	if(chk_Array2 != ''){
		favorit_Result.push(chk_Array2);
	}
	if(chk_Array3 != ''){
		favorit_Result.push(chk_Array3);
	}
	
	if(chk_Array4 != ''){
		favorit_Result.push(chk_Array4);
	}

	for(var i = 0; i < favorit_Result.length; i++){
		console.log("최종 : "+favorit_Result[i]);
	}
	
	favorit_Result=JSON.stringify(favorit_Result);
	
	console.log("제이슨 형식 : "+favorit_Result);
	
	$('#member_favorit').val(favorit_Result);
	console.log("왜 안되지 ? : "+$('#member_favorit').val());
	$("#modifyForm").submit();
}

/*function modifySubmit2(){
	//for 문 돌기위한 체크박스 개수 
	var chk_length = $("input:checkbox[name='favorit2']").length;
	console.log("chk_length : "+chk_length);
	//체크박스 통으로 가지고 옴 
	var chk = $("input:checkbox[name='favorit2']");
	
	//, 로 담아둘 변수
	var member_favorit = new Array();
	
	for(var i = 0; i < chk_length; i++){
		console.log("첫번째 포문 : "+chk[i].value);
		if(chk[i].checked){
			console.log("처음 포문 몇개 도는가 : "+i +"  / 값 : "+chk[i].value);
			member_favorit.push(chk[i].value);
		}
	}
	
	console.log("200 번째 : "+member_favorit.length + " << 멤버 favorit");
	for(var i = 0; i < member_favorit.length; i++){
		console.log("관심사 : "+member_favorit[i]);
	}
	
	member_favorit = JSON.stringify(member_favorit);
	
	$('#member_favorit').val(member_favorit);
	console.log("왜 안되지 ? : "+$('#member_favorit').val());
	//submit 호출 해줌
	//$("#modifyForm").submit();
}

*/