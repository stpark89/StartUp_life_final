<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<link rel="stylesheet" type="text/css" href="css/sub04_0121.css">
	
<div id="wrap">
	<h1 id="category">${title }</h1>
	<input type="hidden" id="cpage" value="${cpage }">
	<hr/>
	
	<section id="board">
		<div>
            <select id="pagesize">
            	<c:choose>
	           		<c:when test="${pgsize==10}">
		            	<option selected="selected">10개씩 보기</option>
		           	</c:when>
		           	<c:otherwise>
		           		<option>10개씩 보기</option>
		           	</c:otherwise>
	           	</c:choose>
	           	<c:choose>
	           		<c:when test="${pgsize==15}">
		            	<option selected="selected">15개씩 보기</option>
		           	</c:when>
		           	<c:otherwise>
		           		<option>15개씩 보기</option>
		           	</c:otherwise>
	           	</c:choose>
	           	<c:choose>
	           		<c:when test="${pgsize==20}">
		            	<option selected="selected">20개씩 보기</option>
		           	</c:when>
		           	<c:otherwise>
		           		<option>20개씩 보기</option>
		           	</c:otherwise>
	           	</c:choose>
	           	<c:choose>
	           		<c:when test="${pgsize==25}">
		            	<option selected="selected">25개씩 보기</option>
		           	</c:when>
		           	<c:otherwise>
		           		<option>25개씩 보기</option>
		           	</c:otherwise>
	           	</c:choose>
            </select>
        </div>
        
    	<table id="board_table">
    		<tbody id="board_list">
    			<tr>
					<th>No</th>
					<th>제목</th>
					<th>글쓴이</th>
					<th>조회수</th>
				</tr>
				<c:forEach var="list" items="${list}">
				<tr>
					<td>${list.no}</td>
					<td><a href="boardDetail.do?no=${list.no}&category=${title }&currentpage=${cpage}">${list.title}</a></td>
					<td>${list.writer}</td>
					<td>${list.viewcnt}</td>
				</tr>
				</c:forEach>
    		</tbody>
            <tfoot>
            	<tr>
                    <td colspan="4">
                    	<ul id="board_page">
                    		<c:choose>
	                        	<c:when test="${cpage > 1}">
					               <li class="paging" onclick="location.href='board.do?category=${title}&currentpage=${cpage-1}&pagesize=${pgsize}'"><</li>
					            </c:when>
					            <c:otherwise>
					            	<li><</li>
					            </c:otherwise>
				            </c:choose>
					        <c:forEach var="i" begin="1" end="${pagecount}" step="1">
				               	<c:choose>
				                	<c:when test="${cpage==i}">
				                     	<li class="pgNum" style="font-weight:bold; font-size:18px;">${i}</li>
				                  	</c:when>
				                  	<c:otherwise>
				                     	<li class="pgNum" onclick="location.href='board.do?category=${title}&currentpage=${i}&pagesize=${pgsize}'">${i}</li>
				                  	</c:otherwise>
				            	</c:choose>
				            </c:forEach>
				            <c:choose>
					           	<c:when test="${cpage < pagecount}">
					              	<li onclick="location.href='board.do?category=${title}&currentpage=${cpage+1}&pagesize=${pgsize}'">></li>
					           	</c:when>
					            <c:otherwise>
					            	<li>><li>
					            </c:otherwise>
				            </c:choose>					        
                    	</ul>
                    	<c:if test="${id != null}">
                    		<c:choose>
                    		<c:when test='${title == "공지사항/QnA" }'>
                    			<c:if test='${id == "admin@admin.com"}'> <!-- 운영자일때 -->
	                        		<button onclick="writeContentView()">글쓰기</button>
	                        	</c:if>
	                        </c:when>
	                        <c:otherwise>
	                        	<button onclick="writeContentView()">글쓰기</button>
	                        </c:otherwise>
	                        </c:choose>
                    	</c:if>
                    </td>
                <tr>
            </tfoot>
        </table>
	</section>
	
</div>
