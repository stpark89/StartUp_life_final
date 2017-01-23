<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
    <input type="hidden" id="hidden_id" value="${id}">
    <input type="hidden" id="hidden_favorit" value='${favorit}'>
    
    <section id="dashboard">
       <h1>커뮤니티</h1>
       <p>설명 설명 설명</p>
       <article>
           <div>
               <h1 class="dashH">자유게시판<span onclick="location.href='board.do?category=자유게시판'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
               		<c:forEach var="list" items="${free}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
               </ul>
           </div>
           <div>
           	   <h1 class="dashH">오늘의 이슈<span onclick="location.href='board.do?category=오늘의 이슈'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
                   <c:forEach var="list" items="${issue}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
				</ul>
           </div>
           <div>
	           	<h1 class="dashH">정치게시판<span onclick="location.href='board.do?category=정치게시판'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
	               <hr/>
	               <ul class="dashList">
	               <c:forEach var="list" items="${politics}">
						<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
						</li>
				   </c:forEach>
	               </ul>
           </div>
           <div>
           		<h1 class="dashH">이미지 갤러리<span onclick="location.href='board.do?category=이미지 갤러리'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
                   <c:forEach var="list" items="${gif}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
               </ul>
           </div>
           <div>
           		<h1 class="dashH">토론방<span onclick="location.href='board.do?category=토론방'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
                   <c:forEach var="list" items="${chat}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
               </ul>
           </div>
           <div>
           		<h1 class="dashH">연예게시판<span onclick="location.href='board.do?category=연예게시판'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
                   <c:forEach var="list" items="${entertainment}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
               </ul>
           </div>
           <div>
           		<h1 class="dashH">사회게시판<span onclick="location.href='board.do?category=사회게시판'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
                   <c:forEach var="list" items="${society}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
               </ul>
           </div>
           <div>
           		<h1 class="dashH">공지사항/QnA<span onclick="location.href='board.do?category=공지사항/QnA'"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></span></h1>
               <hr/>
               <ul class="dashList">
                   <c:forEach var="list" items="${qa}">
					<li onclick="location.href='boardDetail.do?no=${list.no}&category=${list.category }&currentpage=1'">
						${list.title}<span>${list.regdate}</span>
					</li>
					</c:forEach>
               </ul>
           </div>
        </article>
       <!-- <div id="more"><i class="fa fa-angle-double-down" aria-hidden="true"></i></div>-->
	</section>
    
    
    
     <section id="recent">
    	<h1>최신소식</h1>
        <p>설명 설명 설명</p>
	       <article>
	       	    <div>
	            	<div class="main_news">
	                	<img src="img/dashimg/goverment.jpg" alt="대한민국정부(창업)" width="130"/>
	                    <h2 id="GoverMenthGoyoung"></h2>
	                </div>
	                <ul class="dashList" id="goUl"></ul>
	            </div>
	            <div>
	            	<div class="main_news">
	                	<img src="img/dashimg/goverment.jpg" alt="대한민국정부(취업)" width="130"/>
	                    <h2 id="educationHtag"></h2>
	                </div>
	                <ul class="dashList" id="eduli"></ul>
	            </div>
	       </article>
    </section>
    
    <section id="news">
    	<h1>NEWS</h1>
        <p>각 분야별 최신 뉴스를 한눈에 모아보기 !<br/> 회원가입하시고 더많은 정보를 받아보세요.</p>
        <ul id="newsUlTag">

        </ul>
        <article>
			<div>
            	<img src="img/dashimg/ohmyLogo.gif" alt="오마이 뉴스" width="200"/>
                <ul class="dashList" id="OhMyUl">
                   
               </ul>	
            </div>
            <div>	
            	<img src="img/dashimg/mailLogo.jpg" alt="매일경재" width="150"/>
                <ul class="dashList" id="mail">
               </ul>	
            </div>
            <hr>
            <div>
            	<img src="img/dashimg/josunLogo.png" alt="조선닷컴" width="180"/>
                <ul class="dashList" id="josun">
                   
               </ul>	
            </div>
            <div>
            	<img src="img/dashimg/jtbcLogo.png" alt="JTBC 뉴스" width="100"/>
                <ul class="dashList" id="jtbc">
               </ul>	
            </div>
        </article>
    </section>
    
    
    
