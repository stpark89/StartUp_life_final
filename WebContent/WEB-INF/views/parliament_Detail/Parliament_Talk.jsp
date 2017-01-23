<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
   <input type="hidden" id="catego" value="${name}">
    <input type="hidden" id="logId" value="${sessionScope.id}">
   
   <div id="wrap">
       <h1>${name} 님에게 한마디</h1>
        <hr/>
        
        <form method="POST" id="writeForm" enctype="multipart/form-data">
        <div id="title">
           <input type="text" id="talk_title" placeholder="제목을 입력하세요"/>
         </div>
         <div>
              <button id="clip" type="button" value="첨부파일"></button>
           <input type="file" name="uploadfile" id="uploadfile">
         </div>
         <textarea id="content" class="ckeditor"></textarea>
         <div id="btArray">
           <button type="button" id="writeButton">등록</button>
           <button>취소</button>
        </div>
        <input type="hidden" name="dto" id="obj">
        <!--상세 보기시 필요한 데이터들-->
        <input type="hidden" name="img" value="${img}">
        <input type="hidden" name="num" value="${num}">
       <input type="hidden" name="dept_cd" value="${dept_cd}">
       <input type="hidden" name="cate_name" value="${name}">
        </form>
    </div>
    
       