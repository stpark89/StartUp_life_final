/**
 * 회원가입 및 로그인 관련 스크립트
 */
var idCheck = 0;
$(function(){
	$('#addMemberBtn').click(function(){
		if($('#id').val()==''){
			alert('사용하실 이메일을 입력하세요');
			$('#id').focus();
			return false;
		}else if($('#pw').val()==''){
			alert('사용하실 비밀번호를 입력하세요');
			$('#pw').focus();
			return false;
		}else if($('#repassword').val() != $('#pw').val()){
			alert('입력하신 비밀번호를 다시 확인해주세요');
			$('#repassword').focus();
			return false;
		}else if($('#name').val()==''){
			alert('사용하실 닉네임을 입력하세요');
			$('#name').focus();
			return false;
		}else if($('input:radio[name=gender]').is(':checked')==false){
			alert('성별을 선택해주세요');
			$('#gender').focus();
			return false;
		}else{
			if(idCheck == 1){
				alert('성공');
			    return true;
			}else{
				alert("ID 중복체크를 해주세요 !");
				return false;
			}
		}
	});
	
	//아이디 중복확인
	$('#checkIdBtn').click(function(){
	   if($('#id').val()!=''){
			$.ajax(
					{
						url:"checkId.do",
						data:{
							    id:$('#id').val()
						     },
						success:function(data){
							idCheck = 1;
							alert(data.msg);
						}     
					}
				  );
	    }else{
	    	alert('사용하실 아이디를 입력하세요');
	    }
	
		
	});
	
	
});