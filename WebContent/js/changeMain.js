// JavaScript Document
$(document).ready(function(e) {
    
	var pNum = 0;
	var psts = 0;
	var mwEvt = (/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel");	
	
	$(".fdMenu").click(function() {
		
		var mSts = $(this).parent().index()+1;
		pNum = mSts;
		
		$("html,body").animate({scrollTop : $("body>section").eq(pNum).offset().top + "px"},
		700);
	});
	
	
	$(document).on(mwEvt,function(e){
		
		e.preventDefault();	
		
		if(psts==1)return false;
		psts=1;
		
		var evt = window.event || e;
		
		var delta = evt.detail?evt.detail:evt.wheelDelta;
		
		
		
		if(/Firefox/i.test(navigator.userAgent)) delta = -evt.originalEvent.detail;
		
		if(delta>0){//윗방향
			pNum--;//1씩감소
			if(pNum==-1)pNum=0;//한계페이지 고정
		}
		else{//아랫방향
			pNum++;//1씩증가
			if(pNum==4)pNum=3;//한계페이지 고정
		}
		
		
		console.log(pNum);
		
		$("html,body").animate({
			scrollTop : $("body>section").eq(pNum).offset().top + "px"
		},700,function(){
			psts=0;//잠금상태 풀기~! 이제 드루와~~~!
		});//animate
	});
	
	
	var mo_sts = 0;
	$("#more").click(function(e) {
        
		if(mo_sts == 0) {
			$("#dashboard").animate({height:"1000px"});
			$("#more").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>');
			$(".hidden_box").animate({opacity:1});
			mo_sts = 1;
		} else if(mo_sts == 1) {
			$("#dashboard").animate({height:"600px"});
			$("#more").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>');
			$(".hidden_box").animate({opacity:0});
			mo_sts = 0;
		}
    });
	
	//의안 상세보기 클릭시
	$("#statuteBtn").click(function(){
		location.href="statute.do";
	});
	
	//국회의원 상세보기 버튼 클릭시
	$('#ParliamentBtn').click(function(){
		location.href="Member_Parliament.do";
	});
	
	//커뮤니티 페이지
	$('#boardIndexBtn').click(function(){
		location.href="CommunityIndex.do";
	});
	
	//코멘트 보내기
	$('#sendCommentBtn').click(function(){
		var title = $('#title').val();
		var comment = $('textarea#comment').val();
		var admin = $('#masterHidden').val();
		alert("입력하신 제목 : "+title + " comment : "+comment);
		$.ajax(
				{
					url:"indexComment.do",
					data : {
						title : title,
						comment : comment,
						admin : admin
					},
					success : function(data){
						alert(data.data);
					},error : function(){
						alert("실패 하였습니다.")
					}
				}
			  );
	});
	
});