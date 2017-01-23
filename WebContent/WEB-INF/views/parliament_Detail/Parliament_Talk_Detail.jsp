<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!--
       작성자 : 박성준
       작성일 : 2017-01-12
       목 적  : 게시글 상세보기 페이지.
       num, name, dept_cd, img 를 가지고 댕겨야하는 이 불편함...
    -->
   
    <input type="hidden" id="dept_cd" value="${dept_cd}">
    <input type="hidden" id="img" value="${img}">
    <input type="hidden" id="name" value="${detail.catego}">
    <input type="hidden" id="num" value="${detail.num}">
        
  
  <!--위에있는 4개 + content + id 가지고 가야한다...-->
    <div id="wrap">
       <c:choose>
          
          <c:when test="${detail ne null}">
                <h1 id="category">${detail.catego} 님에게 한마디!</h1>
                <hr/>
                <br/>
                첨부파일 :<a href="paliament_talk_fileDown.do?name=${detail.filename}">${detail.filename}</a> 
                     <div id="title">
                      <h2>${detail.title}&nbsp;&nbsp;&nbsp;<span class="nick">작성자 : ${detail.writer}</span></h2>
                       <p>작성일 : ${detail.writeDate}</p><br>
                   </div>
                <div id="content">
                   ${detail.content}
                </div>
                <div id="comm">
                   <ul id="commList">
                   
                   </ul>
                   <div>
                      <form id="commentform">
                          <textarea id="comment" name="content" style="resize:none;"></textarea>
                           <button onclick="commentWrite(0)">등록</button>         
                      </form>
                    </div>
               </div>
               
               <div id="btArray">
                      <c:if test="${detail.writer == id}"> 
                         <button onclick="modifyTalk(${detail.paliament_talk_seq});">수정</button>
                         <input type="hidden" id="session_id" value="${sessionScope.id}">
                         <button onclick="deleteTalk()">삭제</button>
                       </c:if>
                       <button onclick="location.href='board.do?currentpage=${currentpage}&category=${dto.category}'">목록</button>
               </div>
                                       
          </c:when>
          <c:otherwise>
             <h4>잘못된 접근입니다!</h4>
          </c:otherwise>
       </c:choose>
       
    
    </div>   