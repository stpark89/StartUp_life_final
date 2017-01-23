<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<link rel="stylesheet" type="text/css" href="css/sub05.css">
<script type="text/javascript" src="js/writeView.js"></script>

<div id="wrap">
   	<h1>${category} 글쓰기</h1>
   	<hr/>
   	
   	<form action="writeBoard.do" method="POST" id="writeForm" enctype="multipart/form-data" onkeydown="return captureReturnKey(event)">
	   	<input type="hidden" id="category" name="category" value="${category }">
	   	
	   	<div id="title">
	        <input type="text" name="title" placeholder="제목을 입력하세요">
	    </div>
	    <div id="file">
           	<input type="file" name="uploadfile" id="uploadfile">
        </div>
	    <div id="content">
	      	<textarea id="ckeditor" name="ckeditor" required></textarea>
	    </div>
	    <div id="btArray">
	    	<button onclick="writeContent()">작성완료</button>
	    	<button onclick="location.href='board.do?category=${category}&currentpage=${currentpage}'">취소</button>
	    </div>
    </form>
</div>
