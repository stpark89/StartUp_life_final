<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
	<input type="hidden" id="detail_img" value="${img}">
    <input type="hidden" id="detailHiden_num" value="${num}">
    <input type="hidden" id="detailHiden_dept_cd" value="${dept_cd}">
    <input type="hidden" id="tid" value="${tid}">
 <!----------------------------------------------------------------------------------->
 <br/><br/><br/><br/>
 
	<section id="basicInfo">
    	<h1 class="infoTitle">1. 기본정보</h1>
    	<img src="http://placehold.it/300x400" alt="의원사진" id="paliamentDetail_img"/>
        <table id="info">
        	<tr>
            	<th>이름</th><td id="nameTd"></td><th>정당</th><td id="jungTd"></td>
            </tr>
            <tr>
            	<th>소속위원회</th><td id="shrtNmTd"></td><th>당선횟수</th><td id="electionNumTd"></td>
            </tr>
            <tr>
            	<th>학력</th><td colspan="3" id="memTitleTd"></td>
            </tr>
            <tr>
            	<th>연락처</th><td id="phoneTd"></td><th>이메일</th><td id="emailTd"></td>
            </tr>
        </table>
    </section>
    
    <section id="bill">
    	<h1 class="infoTitle">2. 법안발의</h1>
        	<div id="statusDiv"></div>
        <button id="statusDivMore">더보기</button>
    </section>
    
    <div>
	    <div id="loading_form">
	        <div id="loading"></div>
	        <p>Loading...</p>  
	    </div> 
    <section id="attendance">
    	<h1 class="infoTitle">3. 상임의원회 활동</h1>
        <h2 id="detailSangim_Name"></h2>
        <article>
        	<h3 id="chulsuck_Sang"></h3>
        	<div id="progress"><div></div></div>
		</article>
        <div>
            <table id="attendance_table">
				<tbody id="resultTbody">
				
				</tbody>
				<tfoot>
                	<tr>
                        <td colspan="6" id="ulTd">
                            
                        </td>
                    <tr>
                </tfoot>
            </table>
        </div>
    </section>
    </div>
    
    <section id="activity">
    	<h1 class="infoTitle">4. 우리의 말, 말, 말</h1>
        <h2>바라는점을 써주세요!</h2>
		<div>
            <table id="attendance_table">
            	<tbody>
                    <tr>
                       <th>제목</th><th>글쓴이</th><th>날짜</th>
                    </tr>
                   	<c:choose>
                   		<c:when test="${list != '' && list ne null}">
                   			<c:forEach var="list" items="${list}">
                   				<tr>
	                   				<td><a href="Paliament_Talk_Detail.do?seq=${list.paliament_talk_seq}&num=${num}&dept_cd=${dept_cd}&img=${img}&name=${name}">${list.title}</a></td>
	                   				<td>${list.writer}</td>
	                   				<td>${list.writeDate}</td>
                   				</tr>
                   			</c:forEach>
                   		</c:when>
						<c:otherwise>
							<tr>
								<td colspan="3">등록된 글이 없습니다.</td>
							</tr>
						</c:otherwise>                   	
                   	</c:choose>
                   
                   <!--  <tr>
                        <td>이번국회의원은...</td><td>관리자</td><td class="attendance">2017-01-11</td>
                    </tr>
                    -->
                </tbody>
                <tfoot>
                	<tr>
                        <td colspan="4">
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                            </ul>
                        </td>
                    <tr>
                </tfoot>
            </table>
            <c:choose>
            	<c:when test="${sessionScope.id != null}">
            		<div id="btArray">
		        		<button id="wirteTalk">글쓰기</button>
					</div>
            	</c:when>
            	<c:otherwise>
            		
            			<span>로그인하시면 글을 쓰실 수 있습니다!</span>
            		
            	</c:otherwise>
			</c:choose>        	
        </div>
    </section>
    
   
    
    
    
    
    
    
    
    