$(document).ready(function(e) {

	$("#pagesize").change(function(){
		var pagesize = ($(this).val()).substring(0,2);
		var category = $('#category').text();
		location.href='board.do?category='+category+'&currentpage=1&pagesize='+pagesize;
	});
	
	//댓글 쓰기 관련
	$("#comm>div").find("div").hide();
	$(".double_comm").hide();
	$("#comm>div").find("span").click(function() {
		if($(this).attr("data-id")==null){
			//로그인 연결
		}else{
			$(this).next().show();
		}	
	});
	
	//답글 펼치기
	$(".cocobutton").click(function(){
		var flag = $(this).attr("value");
		var grpno = $(this).attr("data-grpno");
		
		if(flag==0){
			$(".comm"+grpno).show();
			$(this).attr("value", 1);
		}else{
			$(".comm"+grpno).hide();
			$(this).attr("value", 0);
		}
	});
	
	//답글 수정 뷰
	$(".commmod").click(function(){
		var co_no = $(this).attr("data-cono");
		var depth = $(this).attr("data-depth");
		var li = $(this).parent().parent();
		var content = li.find(".content").html();
		content = content.replace(/<br>/g, '\n');
		li.empty();
		var div = '<textarea style="resize:none;">'+content+'</textarea>';
		div += '<button class="commmodButton" data-cono="'+co_no+'">등록</button>';
		li.append(div);
	});
	
	//답글 수정 뷰
	$("#commList").on("click",".commmodButton",function(){
		var co_no = $(this).attr("data-cono");
		var content =$(this).prev().val();
		var no = $("#contentNo").val();
		var currentpage = $("#currentpage").val();
		content = content.replace(/\n/g, "<br>");
		
		$.ajax({
			url: "modifyComment.do",
			type : "POST",
			data : {
				no : no,
				currentpage: currentpage,
				content : content,
				co_no : co_no
			},
			success : function(data){
				$(data).each(function(index,item){
					with(item){
						if(result==1){
							location.href='boardDetail.do?category='+category+'&no='+no;
						}else{
							alert("다시 시도해주세요");
						}
					}
				});
			}
		});
	});
	
	//답글,댓글 쓰기
	$(".commButton").click(function(){
		var no = $("#contentNo").val();
		var currentpage = $("#currentpage").val();
		var depth = $(this).attr("data-depth");
		var cono = $(this).attr("data-cono");
		var content = $(this).prev().val();
		content = content.replace(/\n/g, "<br>");
		
		$.ajax({
			url: "writeComment.do",
			type : "POST",
			data : {
				no : no,
				currentpage: currentpage,
				content : content,
				depth : depth,
				coNo : cono
			},
			success : function(data){
				$(data).each(function(index,item){
					with(item){
						if(result==1){
							location.href='boardDetail.do?category='+category+'&no='+no;
						}else{
							alert("로그인 해줘");
						}
					}
				});
			}
		});
	});
	
	//답글,댓글 삭제
	$(".commdel").click(function(){
		var no = $("#contentNo").val();
		var currentpage = $("#currentpage").val();
		var depth = $(this).attr("data-depth");
		var cono = $(this).attr("data-cono");
		
		if(confirm('삭제하시겠습니까?')){
			var no = $("#contentNo").val();
			var category = $('#category').val();
			$.ajax({
				url: 'removeComment.do',
				data : {
					no : no,
					depth : depth,
					co_no : cono,
					currentpage : currentpage
				},
				success : function(data){
					$(data).each(function(index,item){
						with(item){
							location.href='boardDetail.do?currentpage='+currentpage+'&no='+no;
						}
					});
				}
			});
		}
	});
});


//자유게시판 글쓰기 버튼 클릭시
function writeContentView(){
	var category = $("#category").text().trim();
	var cpage = $("#cpage").val();
	location.href="boardWriteView.do?category="+category+"&currentpage="+cpage;
}


function writeContent(){
   if($('#title > input').val() == ''){
         alert("제목을 입력해주세요 !");
         $('#title > input').focus();
         return false;
   }else if($('#content > textarea') == ''){
         alert("내용을 입력해주세요!");
         $('#content > textarea').focus();
         return false;
   }
      
   $('#writeForm').submit();
   
}

//글 삭제
function contentDel(){
	if(confirm('삭제하시겠습니까?')){
		var no = $("#contentNo").val();
		var category = $('#category').text();
		$.ajax({
			url: 'removeContent.do?no='+no+'&category='+category,
			success : function(data){
				$(data).each(function(index,item){
					with(item){
						if(result==1){
							location.href='board.do?category='+category;
						}else{
							alert("삭제못함");
						}
					}
				});
			}
		});
	}
}

//글 수정 뷰
function contentModView(){
	var currentpage = $('#currentpage').val();
	var no = $("#contentNo").val();
	
	location.href="boardModifyView.do?currentpage="+currentpage+"&no="+no;
	
}

//글 수정 완료
function contentMod(){
	if($('#title > input').val() == ''){
		alert("제목을 입력해주세요 !");
		$('#title > input').focus();
		return false;
	}else if($('#content > textarea').val() == ''){
		alert("내용을 입력해주세요!");
		$('#content > textarea').focus();
		return false;
	}

	$('#writeForm').submit();
}


function captureReturnKey(e) { 
  if(e.keyCode==13 && e.srcElement.type != 'textarea') 
  return false; 
} 
