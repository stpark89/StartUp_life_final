<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

	<aside id="login_bg">
    	
    </aside>

    
    <div id="loginForm">
    	<div id="login">
    	<h1>로그인</h1>
        <input type="email" id="loginIdInput" placeholder="아이디 입력"/>
        <input type="password" id="loginPwInput" placeholder="비밀번호 입력"/>
        <button id="loginBtn">로그인</button>
        <button id="addMemberBtn">회원가입</button>
        <p>아이디 또는 비밀번호 찾기</p>
		</div>
      <div id="register">
            <h1>회원가입</h1>
            
            <label>닉네임 입력</label>
            <input type="text" placeholder="닉네임을 입력하세요" id="member_nickName"/>
            
            <label>이메일 입력</label>
            <input type="email" placeholder="이메일을 입력하세요" id="member_Id"/>
            <label>비밀번호 입력</label>
            <input type="password" placeholder="비밀번호를 입력하세요" id="member_Pw"/>
            <input type="password" placeholder="비밀번호를 한번 더 입력하세요" id="member_Repw"/>
            <label>생년월일 입력</label>
            <input type="text" placeholder="년도입력 ex)xxxx" id="member_Birth"/>
            <select>
            	<option>월</option>
            </select>
            <select>
            	<option>일</option>
            </select>
            <label>성별</label>
            <ul id="gender">
            	<li id="m">남자</li>
                <li id="w">여자</li>
            </ul>
            <label>관심사</label>
            <ul id="interest">
            	<li id="gyung">경제</li>
                <li id="sa">사회</li>
                <li id="love">연예</li>
                <li id="sport">스포츠</li>
            </ul>
            <button>가입하기</button>
        </div>
    	<span>×</span>
    </div>

    

	<nav id="nav">
    	<div><i class="fa fa-bars" aria-hidden="true"></i></div>
  		<h1><a href="index.do" id="tit">Title</a></h1>
        <ul id="mainMenu">
            <li><a href="statute.do" class="fdMenu">의안</a></li>
            <li><a href="Member_Parliament.do" class="fdMenu">의원</a></li>
            <li><a href="CommunityIndex.do">커뮤니티</a>
            	<ul id="b_menu">
                	<li><a href="#">오늘의 이슈</a></li>
                	<li><a href="#">자유게시판</a></li>
                    <li><a href="#">정치게시판</a></li>
                    <li><a href="#">이미지 갤러리</a></li>
                </ul>
          </li>
   		</ul>
		<c:choose>
			<c:when test="${id == null}">					
       			<div id="s_loginDiv"><i class="fa fa-sign-in" aria-hidden="true"></i>로그인</div>
			</c:when>
		<c:otherwise>
				<div id="s_logOutDiv">
					<i id="s_MyInfoIcon" class="fa fa-user" aria-hidden="true"></i>
					<i id="s_logOutIcon" class="fa fa-sign-out" aria-hidden="true"></i>
				</div>
		</c:otherwise>
		</c:choose>
        
        
        
        <aside id="menu_bg"></aside>
        <ul id="m_menu">
        	<li><a href="#">의안</a></li>
            <li><a href="#">의원</a></li>
            <li><a href="#">게시판</a></li>
            <li><a href="#">채팅</a></li>
        </ul>
	</nav>