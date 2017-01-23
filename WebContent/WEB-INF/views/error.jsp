<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" />
<title>죄송합니다.</title>
<link rel="stylesheet" type="text/css" href="css/core.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<style type="text/css">
	
	html,body {
		margin:0;
		padding:0;
		width:100%;
		height:100%;	
		background-color:#ccc;
	}
	
	#errorForm {
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		width:1000px;
		height:700px;
		/*background-color:#999;*/	
	}
	
	#errorForm>img {
		position:relative;
		left:50%;
		transform:translateX(-50%);
		margin-bottom:30px;	
	}
	
	#errorForm>h1 {
		height:100px;
		font-size:50px;
		font-weight:bold;
		text-align:center;	
		color:#333;
	}
	
	#errorForm>p {
		width:100%;
		text-align:center;	
		font-size:20px;
		margin-bottom:100px;
	}
	
	#errorForm button {
		position:relative;
		left:50%;
		transform:translateX(-50%);
		width:100px;
		height:100px;
		border-radius:50px;	
		background-color:#fff;
		border:0;
		font-size:50px;
		cursor:pointer;
		
		color:#333;
		transition:all 0.4s ease-out;
	}
	
	#errorForm button:hover {
		box-shadow:5px 5px 10px #999;	
	}
	
	#errorForm span {
		display:block;
		width:100%;
		margin-top:10px;
		font-size:20px;
		text-align:center;
		opacity:0;
	}
</style>

<script type="text/javascript"> 
	$(document).ready(function(e) {
        
		$("#errorForm").find("button").hover(function() {
			
			$("#errorForm").find("span").stop().animate({opacity:1},400);
		}, function() {
			
			$("#errorForm").find("span").stop().animate({opacity:0},400);
		});
		
		$('#backBtn').click(function(){
			location.href="index.do";
		});
		
    });

</script>
</head>

<body>
	<div id="errorForm">
    	<img src="img/error.png" alt="오류" width="300px"/>
        <h1>페이지를 표시할 수 없습니다.</h1>
        <p>잠시 후 다시 이용해주세요.</p>
        <button id="backBtn"><i class="fa fa-undo" aria-hidden="true"></i></button>
        <span>돌아가기</span>
    </div>

</body>
</html>
