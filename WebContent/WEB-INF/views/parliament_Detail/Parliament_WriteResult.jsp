<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script>
	alert("${result}");
	location.replace("PaliamentDetail.do?num=${num}&dept_cd=${dept_cd}&img=${img}&name=${name}");
</script>

