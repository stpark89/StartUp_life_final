<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="container-fluid">
	
	<div class="row">
		<div class="col-sm-offset-4 col-sm-4 text-center">
			<h3>의안이란?</h3>
			<p>국회는 법률안·예산안·동의안 등의 심의를 통하여 헌법이 요구하는 국회의 기능을 수행하고 국민의 의사를 국정에 반영하게 된다.<br/> 
			이와 같이 국회에서 심의하는 법률안·예산안·동의안 등과 같은 안건을 의안이라고 부른다.</p> 
		</div>
	</div>
	
	<hr/>
	
	<div class="row">
		
	<div class="col-sm-offset-2 col-sm-8">
	
	<div id="wrap">	
	
		<ul id="tabMenu">
		    <li>최근 통과의안</li>
			<li>최근 접수의안</li>
			<li>처리의안</li>
			<li>계류의안</li>
		</ul>	
	
		<select id="pagingSize_Select" class="form-control">
			<option>선택</option>
			<option value="10">10개</option>
			<option value="30">30개</option>
			<option value="50">50개</option>
		</select>
		<br/>
		<div id="statuteTable">
			
		</div>
	</div>
	
	<div class="container text-center" id="pagingDiv">
		
	</div>	
	
	<div class="col-sm-2"></div>
	
	</div>
	
	</div>
	
</div>