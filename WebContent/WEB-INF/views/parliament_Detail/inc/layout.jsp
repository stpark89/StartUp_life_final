<!--  
	작성자 : 박성준
	작성일 : 2016-12-19
	목  적 : 국회의원 상세 정보 보는 페이지
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
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">	
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/final_header3_0119.css">
<link rel="stylesheet" type="text/css" href="paliament/final_sub3.css">
<link rel="stylesheet" href="css/WriteForm.css">
<link rel="stylesheet" type="text/css" href="css/sub02.css">
<link rel="stylesheet" type="text/css" href="css/icon.css">
<link rel="stylesheet" type="text/css" href="loading/loading.css">
<script src="js/jquery-3.1.1.min.js"></script>
<!--ck 에디터 -->
<script type="text/javascript" src="ckeditor/ckeditor.js"></script>
<script src="css/main_header_modify0120.js"></script>
<script src="paliament/paliament_Talk3.js"></script>
<title>의원 상세 정보</title>
</head>
<body>

	<!-- Header -->
	<tiles:insertAttribute name="header" />
	
	<!-- Main Wrapper -->
	<tiles:insertAttribute name="content" />
	
<!--풋터-->
	<tiles:insertAttribute name="footer" />

<script>
	
	
	//국회의원 상세보기시 - 발의한 법안 보기
	function memberStatute(data){
		
		//이름
		var name = data.detail.body.item.empNm;
		//현재 대수
		var dasu = data.detail.body.item.electionNum.split(",");
		//잘라낸 최종 결과 - lastdasu
		var lastdasu = dasu[dasu.length-1].substring(0,2);
		
		$.ajax({
			url:"paliamentStatue.do",
			data : {
				name : name,
				dasu : lastdasu
			},
			success : function(data){
				
				$('#statusDiv').empty();
				var table = "<table id='bill_table'><tr><th>제안일</th><th>의안명</th><th>진행</th></tr>";
				//Model 에 담긴값 : result
				$.each(data.result, function(index, obj){
					var billId=obj.billId;
					table +="<tr><td>"+obj.proposeDt+"</td><td><a href='http://likms.assembly.go.kr/bill/billDetail.do?billId="+billId+" target='_blank'>"+obj.billName+"</a></td><td>"+obj.procStageCd+"</td></tr>";
				});
				table+="</table>";
				
				$('#statusDiv').html(table);
				var tb_height = $("#info").height();
				$("#basicInfo").css({height:600 + tb_height});
				
			}
		});
	}
	
	$(function(){
		
		//말, 말, 말  > 글쓰기
		$('#wirteTalk').click(function(){
			var name = $('#nameTd').text();
			var num = $('#detailHiden_num').val();
			var dept_cd = $('#detailHiden_dept_cd').val();
			var img = $('#detail_img').val();
			location.href="paliament_talk_Write.do?name="+name+"&num="+num+"&dept_cd="+dept_cd+"&img="+img;
		});
		
		//국회의원 법안 더보기 버튼 클릭시 !!
		$('#statusDivMore').click(function(){
			var tr_length = $("#bill_table").find("tr").length;
			
			
			var billSts = 0;
			if(billSts == 0) {	
				$("#bill").animate({height:500+(50*(tr_length-5))},400);
				$("#bill").find("div").animate({height:(50*(tr_length))},400);
				billSts = 1;
			} else if(billSts == 1) {
				$("#bill").animate({height:"500px"},400);
				$("#bill").find("div").animate({height:"290px"},400);
				billSts = 0;
			}
		});
		
		//상세보기 실질적 데이터 받아옴
		if($('#tid').val() == '1'){
			$.ajax({
				url:"PaliamentDetailView.do",
				data : {
					num : $('#detailHiden_num').val(),
					dept_cd : $('#detailHiden_dept_cd').val(),
					img : $('#detail_img').val()
				},
				success : function(data){
					//의원 이미지
					$('#paliamentDetail_img').attr("src");
					//의원 이름
					$('#nameTd').text();
					//정당 이름
					$('#jungTd').text();
					//당선 횟수
					$("#electionNumTd").text();
					//소속 위원회
					$('#shrtNmTd').empty();
					//학력
					$('#memTitleTd').empty();
					//전화번호
					$('#phoneTd').text();
					//이메일
					$('#emailTd').text();
					
					//출석 관련 > 위원회 이름 
					$('#detailSangim_Name').text();
					
					$('#paliamentDetail_img').attr("src",data.detailImg);
					$('#nameTd').text(data.detail.body.item.empNm);
					$('#jungTd').text(data.detail.body.item.polyNm);
					
					var splitelectionNum = data.detail.body.item.electionNum.split(",");
				
					$('#electionNumTd').text(data.detail.body.item.electionNum + " / " +splitelectionNum.length + "회");
					
					///////////////소속 위원회 정보 보기
					if(data.detail.body.item.shrtNm == '' || data.detail.body.item.shrtNm == null){
						$('#shrtNmTd').text(data.detail.body.item.shrtNm);
						//상임 위원회 출석 부분에 쓰이는 것
						$('#detailSangim_Name').text(data.detail.body.item.shrtNm);
					}else{
						var array = data.detail.body.item.shrtNm.split(",");
						var splitResult ='';
				
							for(var i = 0; i < array.length; i++){
								if(array[i] !== undefined){
									splitResult +='<p>'+array[i]+"</p>";
								}
							}
						$('#shrtNmTd').append(splitResult);
						$('#detailSangim_Name').text(data.detail.body.item.shrtNm);
					}
					/////////////////////////////////////////////////////
					
					if(data.detail.body.item.memTitle != null || data.detail.body.item.memTitle !== undefined){
						var array = data.detail.body.item.memTitle.replace(/\r-/gi,"<br/>");
						$('#memTitleTd').append(array);
					}
					
					//전화번호
					$('#phoneTd').text(data.detail.body.item.assemTel);
					
					if(data.detail.body.item.assemEmail != null || data.detail.body.item.assemEmail !== undefined){
						$('#emailTd').text(data.detail.body.item.assemEmail);
					}else{
						$('#emailTd').text("없음");
					}
	
					//상세보기 하고자 하는 국회의원이 발의한 법안
					memberStatute(data);
					//출석률 확인 함수 > 상임 위원회 , 본회의
					memberAttend(data.detail.body.item.shrtNm, data.detail.body.item.electionNum, data.detail.body.item.empNm);
				} 
			});
		}
		
	});
 	

	//출석률 현황 보기
	function memberAttend(obj, dasu, name){
		
		var splitDasu = dasu.split(",");
		var resultDasu = splitDasu[splitDasu.length - 1].substring(0,2);

		//상임위원회 
		var array = ["국회운영위원회","법제사법위원회","정무위원회","기획재정위원회","미래창조과학방송통신위원회","교육문화체육관광위원회","외교통일위원회","국방위원회","안전행정위원회","농림축산식품해양수산위원회","산업통상자원위원회","보건복지위원회","환경노동위원회","국토교통위원회","정보위원회","여성가족위원회"];
		//선택한 국회의원 위원회
		var weOnH = obj.split(",");
		//속해있는 상임위원회 뽑은 것 담기 위한 배열
		var sockArray = new Array();
		
		for(var i = 0; i < weOnH.length; i++){
			for(var j = 0; j < array.length; j++){
				if(weOnH[i].replace(/ /gi, '') == array[j]){
					sockArray.push(weOnH[i]);
				}
			}
		}
		//상임 위원회 출석률 관련 함수 > 1.첫번째		
		sangImConfference(sockArray,resultDasu, name);
}

// 상임 위원회 > 출석률 확인 하기 한 첫번째. - 전체 리스트에서 - > 내가 속한것만 위원회만 뽑기 위한 것.
function sangImConfference(sockArray, resultDasu, name){
	$.ajax({
		url:"paliamentSang.do",
		type :"get",
		data:{
			resultarray : JSON.stringify(sockArray),
			dasu : resultDasu,
			name : name
		},
		success : function(data){
			var makeTable = "<tr><th>날짜</th><th>상임위원회</th><th>회차</th><th>출석부</th></tr>";				
			var chulsuck = 0;
			$.each(data.attend_list,function(index, obj){
				
				if(obj.join == '출석'){
					chulsuck++;
				}
				
				if(index <= 4){	
					if(obj.join == '출석'){
						makeTable+="<tr><td>"+obj.meeting2+"</td><td>"+obj.commName+"</td><td>"+obj.meeting1+"</td><td class='attendance'>"+obj.join+"</td>";
					}else{
						makeTable+="<tr><td>"+obj.meeting2+"</td><td>"+obj.commName+"</td><td>"+obj.meeting1+"</td><td class='absence'>"+obj.join+"</td>";
					}
				}else{
					return;
				}
			});
			var chulsuck_sosuJum = (chulsuck/data.attend_list.length)*100;
			var chulsuck_result = chulsuck_sosuJum.toFixed(2);
			
			$('#chulsuck_Sang').text("출석률 : " +chulsuck_result+"%");
			$('#progress>div').css('width',chulsuck_result+"%");
			//넘버링 만들기 위한 변수
			var litag = pageNumFunc(data);
			$('#resultTbody').html(makeTable);
			//페이지 넘버링
			$('#ulTd').html(litag);
		},beforeSend:function(){
			$('#loading_form').css("display","block");
			$('#attendance').css("display","none");			
		},complete:function(){
			$('#loading_form').css("display","none");
			$('#attendance').css("display","block");
		},timeout : 100000
	});
}	

var modelData = '';	
//출석 관련 페이지 넘버링 하기 위한 것.
function pageNumFunc(data){
	modelData = data;
	
	
	var pageNumber = '';
	//회의 한 숫자 > 이걸로 페이지 넘버링 만들어줘야함  
	if((data.attend_list.length % 5) == 0){
		pageNumber = Number((data.attend_list.length/5));	
	}else{
		pageNumber = Number((data.attend_list.length/5)+1);
	}
	pageNumber = Math.floor(pageNumber);
	
	console.log("넘버링 확인 : "+data.attend_list.length + " / 넘버링 할것 : "+pageNumber);
	
	var litag = '<ul>';
		litag +="<li><a href='#'></a><<</li>";
	for(var i = 0; i < pageNumber; i++){
		litag +='<li onclick=pagingAjax_li('+(i+1)+')>'+(i+1)+'</a></li>';
	}
		litag +="<li><a href='#'></a>>></li>";
		litag += "</ul>";
		return litag;
	
}	
			
//ajax 타서 비동기로 페이징			
function pagingAjax_li(pagingValue){
		
		console.log("넘어온 페이징 번호 : "+pagingValue +"모델 데이터 : " + modelData.attend_list);
		//페이지 > td 비움
		//$('#resultTbody').empty();
		//배열 렝스
		var length = modelData.attend_list.length;
		//전역 데이터 이용 >> model에 담긴 데이터
		var model = modelData.attend_list;
		
		//테이블 헤더 고정값
		var makeTable = "<tr><th>날짜</th><th>상임위원회</th><th>회차</th><th>출석부</th></tr>";
		
		//선택한 페이지 번호 와 같을때 + 5개의 값을 가져야함.
		if(pagingValue == 1){
			for(var i = 0; i < length; i++){
				if(i<5){
					makeTable += "<tr><td>"+model[i].meeting2+"</td><td>"+model[i].commName+"</td><td>"+model[i].meeting1+"</td><td class='attendance'>"+model[i].join+"</td>"	
				}else{
					break;
				}
			}
		$('#resultTbody').html(makeTable);
		
		//최소 페이지 2페이지 선택한다는 의미임.
		}else{
				//페이징 번호들어오면 들어온 번호에 따라 시작해야할 변수를 담음
			var paging_minus = ((pagingValue -1)*5+1);
				//5개만 뽑아야 하기때문에 (내가 선택한 페이징 번호 + 5까지만) > 증감연산으로 
			var count = 0;	
			for(var i = 0; i < length; i++){
				if(i == paging_minus && count <= 4){
					for(var j = paging_minus; j<(paging_minus+5); j++){
						if(j < length){
						makeTable += "<tr><td>"+model[j].meeting2+"</td><td>"+model[j].commName+"</td><td>"+model[j].meeting1+"</td><td class='attendance'>"+model[j].join+"</td>"
						//console.log("확인 : 최종 j  값  : "+j + " 내가선택한 페이지 값 : "+pagingValue+" / plus_check 는 ?? "+count);
						count++;	
						}else if(j == length){
							makeTable += "<tr><td>"+model[length-1].meeting2+"</td><td>"+model[length-1].commName+"</td><td>"+model[length-1].meeting1+"</td><td class='attendance'>"+model[length-1].join+"</td>"
						}
					}
				}
			}
			//페이징 처리 결과 다시 뿌려주기
			$('#resultTbody').html(makeTable);
	}
}	
	



	
</script>	
</body>
</html>