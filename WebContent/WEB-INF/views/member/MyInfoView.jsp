<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    
    <input type="hidden" id="nick" value="${dto.nickName}">
    <!--중복검사해야지 값들어감 -->
    <input type="hidden" id="short_btn_hidden">
    
	<form method="POST" id="modifyForm">
    <input type="hidden" id="member_favorit" name="favorit">
    <div id="wrap">
    	<h1>내 정보 보기</h1>
        <hr/>								
        <section id="personal_tb">
        	<table>
            	<tr>
                	<th>아이디</th><td colspan="4">${dto.id}</td>
                </tr>
                <tr>
                	<th>닉네임</th><td colspan="4">${dto.nickName}</td>
                </tr>
                <tr>
                	<!-- 19890425 앞에 4자리 뒤에 2자리 2자리 잘라야함 -->
                	<th>생년월일</th><td colspan="4" id="birth"></td>
                </tr>
                <tr>
                	<!-- m 이면 남자, w 면 여자 -->
                	<th>성별</th>
                	<td colspan="4">
                		<c:choose>
                			<c:when test="${dto.gender == 'm'}">
                				남자
                			</c:when>
                			<c:otherwise>
                				여자
                			</c:otherwise>
                		</c:choose>
                	</td>
                </tr>
                <tr id="myfavoritTr">
                	
                </tr>
                
            </table>
        </section>
        
        <button type="button">정보수정하기</button>
    	<button type="button" id="modifyBtn" onclick="modifyResult();">수정완료</button>
    </div>
    </form>

 <script>
 	$(function(){
 		
 		var db_favorit = ${dto.favorit};
 		var dongTd = "<th>관심사</th>";
 		if(db_favorit.length > 0){
			for(var i = 0; i < db_favorit.length; i++){
				dongTd += "<td>"+db_favorit[i]+"</td>";
			} 		
 		}else{
 			dongTd += "<td colspan='4'>선택하신 관심사가 없습니다.</td>";
 		}
		$('#myfavoritTr').html(dongTd);
		
		
		var birth = ${dto.birth};
		var ttt = String(birth);
		for(var i = 0; i < ttt.length; i++){
			console.log("글짜 검색을 좀 : "+i+" / 번째 : "+ttt[i]);
		}
		
		var year = String(birth).substring(0,4);
		var month = String(birth).substring(4,6);
		var day = String(birth).substring(6,9);
		
		var result = year+"년"+month+"월"+day+"일";
		$('#birth').text(result);
 	});
 </script>   