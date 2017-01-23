<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
 <link rel="stylesheet" type="text/css" href="css/sub02_0121.css"> 

<div id="wrap">
   	<h1 id="category">${dto.category }</h1>
    <hr/>
    
    	<input type="hidden" value="${dto.no}" id="contentNo">
    	<input type="hidden" value="${currentpage}" id="currentpage">
    <div id="title">
    	<h2>${dto.title}&nbsp;&nbsp;&nbsp;<span class="nick">${dto.writer}</span></h2>
        <p>${dto.regdate}<br/> 조회수  :  ${dto.viewcnt}</p>
    </div>
    <c:if test="${id != null}">
    <c:if test="${dto.filename != null}">
    <div id="download">
    	다운로드 : <a href="boardFileDown.do?name=${dto.filename}&id=${dto.id}&pathf=${dto.filepath}">${dto.filename}</a>
    </div>
    </c:if>
    </c:if>
    <div id="content">
    	${dto.content}
    </div>
    
    <div id="comm">
    	<div>
    		<span id="commButton" data-id="${id }">댓글 쓰기</span>
    		<div>
    		<c:if test="${id != null}">
		        <textarea name="content" style="resize:none;" placeholder="댓글을 적어주세요" maxlength="500"></textarea>
		        <button class="commButton" data-depth="0" data-cono="0">등록</button>
    		</c:if>
    		</div>
        </div>
    	<ul id="commList">
        <c:forEach var="comment" items="${comment}">
           	<li class="comment">
            	<h4>${comment.writer}</h4>
               	<p class="content">${comment.content}</p>
                <span>${comment.regdate}</span>
				<ul>
               		<li class="cocobutton" value="0" data-no="${comment.co_no }" data-grpno="${comment.grpno}">답글</li>
               	<c:if test="${comment.id == id}">                	
                	<li class="commmod" data-depth="0" data-cono="${comment.co_no}" data-writer="${comment.writer }">수정</li>
   	            	<li class="commdel" data-depth="0" data-cono="${comment.co_no}">삭제</li>
        		</c:if>
               	</ul>
			</li>
			<c:forEach var="list" items="${list}">
			<c:if test="${comment.co_no == list.grpno}">
			<li class="double_comm comm${comment.grpno }">
            	<h4>${list.writer}</h4>
            	<p class="content">${list.content}</p>
            	<span>${list.regdate}</span>
				<ul>
               	<c:if test="${list.id == id}">                	
                	<li class="commmod" data-depth="1" data-cono="${list.co_no}">수정</li>
   	            	<li class="commdel" data-depth="1" data-cono="${list.co_no}">삭제</li>
        		</c:if>
               	</ul>
			</li>
			</c:if>
			</c:forEach>
			<li class="double_comm comm${comment.grpno }">
				<textarea style="resize:none;" placeholder="답글을 적어주세요" maxlength="500"></textarea>
				<button class="commButton" data-depth="1" data-cono="${comment.co_no }">등록</button>
			</li>
		</c:forEach>
        </ul>
    </div>
    
    <div id="btArray">
    	<c:if test="${dto.id == id}"> 
	    	<button onclick="contentModView()">수정</button>
	    	<button onclick="contentDel()">삭제</button>
        </c:if>
        <button onclick="location.href='board.do?currentpage=${currentpage}&category=${dto.category}'">목록</button>
    </div>
    
</div>

    