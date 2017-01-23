<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="css/sub05.css">
<script type="text/javascript" src="js/writeView.js"></script>

<div id="wrap">
   	<h1>${dto.category} 글 수정</h1>
   	<hr/>
   	
   	<form action="boardModify.do" method="POST" id="writeForm" enctype="multipart/form-data">
	   	<input type="hidden" name="no" value="${dto.no }">
	   	<input type="hidden" name="id" value="${dto.id }">
	   	<input type="hidden" id="category" name="category" value="${dto.category }">
	   	<div id="title">
	        <input type="text" name="title" value="${dto.title }">
	    </div>
	    
	    <div>
		    <div>
	           	<input type="hidden" name="oldfile" value="${dto.filename }">
	           	<input type="hidden" name="oldfilepath" value="${dto.filepath }">
	        </div>
	        <div id="file">
	           	<input type="file" name="uploadfile" id="uploadfile">
	           	<p>이전 파일 : ${dto.filename }</p>
	        </div>
        </div>
        
	    <div id="content">
	      	<textarea id="ckeditor" name="ckeditor" required>${dto.content }</textarea>
	    </div>
	    
	    <div id="btArray">
	    	<button onclick="contentMod()">등록</button>
	    	<button onclick="location.href='board.do?category=${category}&currentpage=${currentpage}'">취소</button>
	    </div>
    </form>
</div>
