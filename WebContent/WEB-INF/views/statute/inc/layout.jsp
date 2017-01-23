<!--  
	작성자 : 박성준
	작성일 : 2016-12-19
	목  적 : 법 관련 페이지
-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>  
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="css/final_header3_0119.css">	
<link rel="stylesheet" type="text/css" href="css/statute.css">
<link rel="stylesheet" type="text/css" href="css/icon.css">
<link rel="stylesheet" type="text/css" href="loading/loading.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">	
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="css/main_header_modify0120.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="js/statute_list_0119.js"></script>
<title>의안</title>
</head>
<body>
<div id="loading_form">
        <div id="loading"></div>
        <p>Loading...</p>  
</div> 

<!-- Header -->
	<tiles:insertAttribute name="header" />
	<br><br><br>
<!-- Main Wrapper -->
	<tiles:insertAttribute name="content" />
	
	<tiles:insertAttribute name="footer" />
</body>
</html>