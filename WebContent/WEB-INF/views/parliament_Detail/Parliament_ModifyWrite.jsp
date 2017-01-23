<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

	<div id="wrap">
    	<h1>${name} 님에게 한마디 (수정)</h1>
        <hr/>
        
        <form method="POST" id="modifyForm">
	        <div id="title">
	        	<input type="text" name="title" id="talk_title" value="${title}"/>
	        </div>
	      	<textarea id="content" name="content" class="ckeditor">${content}</textarea>
	      	<div id="btArray">
	        	<button type="button" id="modifyButton">수정</button>
	        	<button>취소</button>
	        </div>
	        <!--상세 보기시 필요한 데이터들-->
	        <input type="hidden" name="seq" value="${seq}">
	        <input type="hidden" name="img" value="${img}">
	  		<input type="hidden" name="num" value="${num}">
	    	<input type="hidden" name="dept_cd" value="${dept_cd}">
	    	<input type="hidden" name="cate_name" value="${name}">
        </form>
        
    </div>
        