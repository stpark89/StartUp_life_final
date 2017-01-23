
//시간 바꿔주는 함수
function TimeFormatFuc(obj){
	var test = new Date(Date.parse(obj));
	var day = test.getDay()+1;
	var year = test.getFullYear();
	var month = test.getMonth()+1;
	if(month < 10){
		month = String("0"+month);
	}
	var day = test.getDay()+1;
	
	if(day < 10){
		day = String("0"+day);
	}
	var result = year+"."+month+"."+day;
	return result;
}

$(function(){
	
	
	// 회원의 관심사에 맞춰서 탭 메뉴 구성 하는 부분
	
	var id = $('#hidden_id').val();
	var favorit = $('#hidden_favorit').val();
	
	
	var liTag = '<li id="sock">속보</li><li id="jung">정치</li>';
	if(favorit != '' && favorit != undefined){
	   //정규표현식 쓰는 부분
	   favorit = regExp(favorit);
	   var favoritArray = favorit.split(",");
	   	   if(favoritArray.length > 0 ){
			   for(var i = 0; i < favoritArray.length; i++){
				   switch (favoritArray[i]) {
				   		case '경제':
				   			liTag += '<li id="gyung">경제</li>';
				   			break;
				   		case '사회':
				   			liTag += '<li id="sa">사회</li>';
				   			break;
				   		case '연예':
				   			liTag += '<li id="love">연예</li>';
				   			break;
				   		case '스포츠'	:
				   			liTag += '<li id="sports">스포츠</li>';
				   		default:
							break;
						}
					   
				   }
			   $('#newsUlTag').html(liTag); 
	   	  }
	  }else{
		   $('#newsUlTag').html(liTag);
	  }   
   	
	
   	  ///////////////////////////////////////////////////////////////////////////// 
   	   
	//대한민국 정보
	$.ajax({
		url : "CommunityNews_1.do",
		dataType : "json",
		success : function(data){
			
			$('#mainNews').empty();
			$('#goUl').empty();
			
			if(data.goyoung === undefined || data.goyoung == null){
				$('#educationHtag').html("<h4>점검중입니다.</h4>");
				return;
			}
			
			var link = "http://www.korea.go.kr/";
			
			$.each(data.goyoung, function(index, obj){
				var please = TimeFormatFuc(obj.date);
				var subLink = obj.link.substring(2);
				if(index == 0){
					if(obj.title.length < 30){
					$('#GoverMenthGoyoung').append("<a href="+(link+subLink)+" target='_blank'><span>"+obj.title+"</span></a><br/><span>"+please+"</span>");
					}else{
						var title = substringTitle(obj.title);
						$('#GoverMenthGoyoung').append("<a href="+(link+subLink)+" target='_blank'><span>"+title+"</span></a><br/><span>"+please+"</span>");
					}
				}else if(index >= 6 && index < 9){
					$('#goUl').append("<li><a href="+(link+subLink)+" target='_blank'>"+obj.title+"</a><span>"+please+"</span>");
					
				}
			});
			
			
	/*	
			if(data.Goyoung  === undefined || data.Goyoung == null){
				
				$('#GoverMenthGoyoung').html("<h4>점검중입니다.</h4>");
				return;
			}
			
			
			$.each(data.Goyoung,function(index, value){
				var dateResult = TimeFormatFuc(value["dc:date"]["#text"]);
				//한줄 리스트 있는것
				//console.log("index : " + index + "hi : "+value);
				if(index == 0){
					if(value.title.length <= 30){
						var title = value.title;
						var link = value.link;
						$('#GoverMenthGoyoung').append("<a href="+value.link+" target='_blank'><span>"+title+"</span></a><br/><span>"+dateResult+"</span>");
					}else{
						var title = substringTitle(value.title);
						$('#GoverMenthGoyoung').append("<a href="+value.link+" target='_blank'><span>"+title+"</span></a><br/><span>"+dateResult+"</span>");
					}
				}else if(index >= 1 && index < 4){
					
					if(value.title.length <= 30){
						var title = value.title;
						var link = value.link;
						$('#goUl').append("<li><a href="+value.link+" target='_blank'>"+title+"</a><span>"+dateResult+"</span></li>");
						
					}else{
						var link = value.link;
						var title = substringTitle(value.title);
						$('#goUl').append("<li><a href="+value.link+" target='_blank'>"+title+"</a><span>"+dateResult+"</span></li>");
					}
					
					*/
		
		}, error : function(){
			$('#GoverMenthGoyoung').html("<h4>점검중입니다.</h4>");
		}
	});

	
	//정부 RSS
	$.ajax({
		url:"education.do",
		success : function(data){
			$('#educationHtag').empty();
			$('#eduli').empty();
			if(data.education === undefined || data.education == null){
				$('#educationHtag').html("<h4>점검중입니다.</h4>");
				return;
			}
			
			var link = "http://www.korea.go.kr/";
			
			$.each(data.education, function(index, obj){
				var please = TimeFormatFuc(obj.date);
				var subLink = obj.link.substring(2);
				if(index == 0){
					if(obj.title.length < 30){
					$('#educationHtag').append("<a href="+(link+subLink)+" target='_blank'><span>"+obj.title+"</span></a><br/><span>"+please+"</span>");
					}else{
						var title = substringTitle(obj.title);
						$('#educationHtag').append("<a href="+(link+subLink)+" target='_blank'><span>"+title+"</span></a><br/><span>"+please+"</span>");
					}
				}else if(index >= 6 && index < 9){
					$('#eduli').append("<li><a href="+(link+subLink)+" target='_blank'>"+obj.title+"</a><span>"+please+"</span>");
					
				}
			});
			//education
		}
	});
	
	
	//오마이 속보
	chooseSock_ohMy();
	//매일 경제 속보
	chooseSock_Mail();
	//조선 속보
	chooseSock_Josun();
	//JTBC 속보
	chooseSock_JTBC();
	

	//탭클릭시 !!
	$("#news>ul").find("li").click(function(e) {
		$(this).css({backgroundColor:"#333",color:"#fff"}).siblings().css({backgroundColor:"#fff",color:"#000"});
		var tabMenu = $(this).attr("id");
		chooseMenu(tabMenu);
    });
	
});	

//글짜르기 함수
function substringTitle(obj){
	var title = obj.substring(0,29);
	title += "...";
	return title;
}

//탭메뉴 클릭시
function chooseMenu(value){
	
	
	switch (value) {
		case 'sock':
			$('#OhMyUl').empty();
			chooseSock_ohMy();
			
			$('#mail').empty();
			chooseSock_Mail();
			
			$('#josun').empty();
			chooseSock_Josun();
			
			$('#jtbc').empty();
			chooseSock_JTBC();
			break;
	
			
			
		case 'jung':
			//MBC 선택
			$('#OhMyUl').empty();
			chooseJung_ohMy();	
			//매일
			$('#mail').empty();
			chooseJung_Mail();
			//조선
			$('#josun').empty();
			chooseJung_Josun();
			//jtcb
			$('#jtbc').empty();
			chooseJung_JTBC();
			 break;
		
			 //경제 부분
		case 'gyung':
			//MBC
			$('#OhMyUl').empty();
			chooseGyung_ohMy();

			//매일
			$('#mail').empty();
			chooseGyung_Mail();
			
			//조선
			$('#josun').empty();
			chooseGyung_Josun();
			
			//경제
			$('#jtbc').empty();
			chooseGyung_JTBC();
			break;
		
		case 'sa':
			$('#OhMyUl').empty();
			chooseSa_OhMy();	
			//매일
			$('#mail').empty();
			chooseSa_Mail();
			//조선
			$('#josun').empty();
			chooseSa_Josun();
			//jtcb
			$('#jtbc').empty();
			chooseSa_JTBC();
			break;
		
		case 'love':
			//오마이
			$('#OhMyUl').empty();
			chooseLove_OhMy();
			//매일
			$('#mail').empty();
			chooseLove_Mail();
			//조선
			$('#josun').empty();
			chooseLove_Josun();
			//jtbc
			$('#jtbc').empty();
			chooseLove_JTBC();
			
			break;
			
		case 'sports':
			//오마이
			$('#OhMyUl').empty();
			chooseSports_OhMy();
			//매일
			$('#mail').empty();
			chooseSports_Mail();
			//조선
			$('#josun').empty();
			chooseSports_Josun();

			//JTBC 스포츠\
			$('#jtbc').empty();
			chooseSports_JTBC()
			break;
			
	default:
		alert("메뉴를 다시 선택해주세요");
		break;
	}
	
}

//뉴스 - 오마이뉴스 부분 - 속보
function chooseSock_ohMy(){
	$.ajax({
	    url:"CommunityNews_2.do",
		dataType:"json",
		success:function(data){
			$.each(data.joinsmsn, function(index, obj){
				
				var result = TimeFormatFuc(obj.date);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){			
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}

//오마이 뉴스 - 정치 탭 선택시
function chooseJung_ohMy(){
	$.ajax({
		url:"JungChi.do",
		dataType : "json",
		success : function(data){
			$.each(data.ohmy_Jung, function(index, obj){
				var result = TimeFormatFuc(obj.date);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){			
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
			
		}
	});
}

//오마이 뉴스 경제 부분
function chooseGyung_ohMy(){	
	$.ajax({
		url : "GyungJae.do",
		success : function(data){
			$.each(data.ohmy_Gyung, function(index, obj){
				var result = TimeFormatFuc(obj.date);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
	
}

//오마이 뉴스 사회 부분
function chooseSa_OhMy(){
	$.ajax({
		url : "ohMy_Sa.do",
		success : function(data){
			$.each(data.ohmy_Sa, function(index, obj){
				var result = TimeFormatFuc(obj.date);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}

//오마이 뉴스 연애 부분
function chooseLove_OhMy(){
	$.ajax({
		url : "ohMy_Love.do",
		success : function(data){
			$.each(data.ohmy_Love, function(index, obj){
				var result = TimeFormatFuc(obj.date);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}
//오마이 뉴스 >> 스포츠 부분
function chooseSports_OhMy(){
	$.ajax({
		url : "ohMy_Sports.do",
		success : function(data){
			$.each(data.ohmy_Sports, function(index, obj){
				var result = TimeFormatFuc(obj.date);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#OhMyUl').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}
//오마이 끝
//////////////////////////////////////////////////////////////////////////////////////////

//m-1 매일 경재 속보 뉴스 탭 선택시
function chooseSock_Mail(){
	//뉴스 - 매일경재 - 속보
	$.ajax({
		url:"MailNews.do",
		dataType:"json",
		success : function(data){
			
			$.each(data.mail_news.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				//console.log("매일 경재 확인 : " +obj["dc:date"]["#text"]);
				if(index >=0 && index <= 3){
					
					if(obj.title.length <= 30){
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}


//m-2 매일경재 정치 뉴스 탭 선택 시
function chooseJung_Mail(){
	$.ajax({
		url:"MailJung.do",
		dataType : "json",
		success : function(data){
			$.each(data.mail_jung.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
					$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}
//m-3 매일경제 경제 뉴스 탭 선택 시
function chooseGyung_Mail(){
	$.ajax({
		url:"MailGyung.do",
		dataType : "json",
		success : function(data){
			$.each(data.mail_gyung.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
					$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
					var title = substringTitle(obj.title);
					$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}
//매일 경제 사회 뉴스 탭 선택시
function chooseSa_Mail(){
	$.ajax({
		url : "MailSociety.do",
		success : function(data){
			$.each(data.mail_society.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}

//m-4 매일 경제 연예 뉴스 탭 선택시
function chooseLove_Mail(){
	$.ajax({
		url : "MailLove.do",
		success : function(data){
			$.each(data.mail_love.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}
//m-5 매일 경제 스포츠 뉴스 탭 선택시
function chooseSports_Mail(){
	$.ajax({
		url : "MailSports.do",
		success : function(data){
			$.each(data.mail_sports.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+obj.title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#mail').append("<li><a href="+obj.link+" target='_blank'>"+title.replace(/<br[^>]*>/gi,"")+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}
//매일 끝
/////////////////////////////////////////////////////////////////////////


//뉴스 - 조선 - 속보
function chooseSock_Josun(){
	$.ajax({
		url:"JoSun.do",
		dataType : "json",
		success : function(data){
			$.each(data.josun.channel.item, function(index, obj){
				
				console.log("조선 속보 확인좀 ...  "+obj.pubDate);
				
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
			});
			
		}
	});
}

//조선 정치 뉴스 탭 선택시
function chooseJung_Josun(){
	$.ajax({
		url:"JosunJung.do",
		dataType : "json",
		success : function(data){
			$.each(data.josun_jung.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
			});
		}
	});
}

//조선 경제 뉴스 탭 선택 시
function chooseGyung_Josun(){
	$.ajax({
		url:"JosunGyung.do",
		dataType : "json",
		success : function(data){
			$.each(data.josun_Gyung.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
				
			});
		}
	});
}

//조선 - 사회 뉴스 탭 선택시
function chooseSa_Josun(){
	$.ajax({
		url:"JosunSociety.do",
		dataType : "json",
		success : function(data){
			$.each(data.josun_Society.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
				
			});
		}
	});
}

//조선 - 연애 뉴스 탭 선택시
function chooseLove_Josun(){
	$.ajax({
		url:"JosunLove.do",
		dataType : "json",
		success : function(data){
			$.each(data.josun_Love.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
				
			});
		}
	});
}

//조선 > 스포츠 선택시
function chooseSports_Josun(){
	$.ajax({
		url:"JosunSports.do",
		dataType : "json",
		success : function(data){
			$.each(data.josun_Sports.channel.item, function(index, obj){
				var result = TimeFormatFuc(obj.pubDate);
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+result+"</span></li>");
					}else{
						var title = substringTitle(obj.title);
						$('#josun').append("<li><a href="+obj.link+" target='_blank'>"+title+"</a><span>"+result+"</span></li>");
					}
				}
				
			});
		}
	});
}
//조선 끝
///////////////////////////////////////////////////////////////////////////////////

//JTBC 속보 뉴스 탭 선택시
function chooseSock_JTBC(){
	//뉴스 - JTBC - 속보
	$.ajax({
		url:"jtbc_News1.do",
		success : function(data){
			$(data.jtbc).each(function(index,obj){
				
				if(index >= 0 && index <= 3){
					if(obj.title.length <= 30){
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+obj.date+"</span></li>");
					}else{
						var sub_title=substringTitle(obj.title);
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+sub_title+"</a><span>"+obj.date+"</span></li>");
					
					}
				}
			});
		}
	});
	
}

//JTBC 정치 뉴스 탭 선택시
function chooseJung_JTBC(){
	
	$.ajax({
		url:"Jtbc_Jung.do",
		success : function(data){
			$(data.jtbc_jung).each(function(index,obj){
				
				if(index >= 0 && index <= 3){
					
					if(obj.title.length <= 30){
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+obj.date+"</span></li>");
					}else{
						var sub_title=substringTitle(obj.title);
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+sub_title+"</a><span>"+obj.date+"</span></li>");
					
					}
				}
				
			});
		}	
	});
} 

//JTBC 경제 뉴스 탭 선택시
function chooseGyung_JTBC(){
	$.ajax({
		url:"Jtbc_Gyung.do",
		success : function(data){

			$(data.jtbc_Gyung).each(function(index, obj){
				if(index >= 0 && index <= 3){
					
					if(obj.title.length <= 30){
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+obj.date+"</span></li>");
					}else{
						var sub_title=substringTitle(obj.title);
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+sub_title+"</a><span>"+obj.date+"</span></li>");
					
					}
				}
				
			});
		}
	});
} 

//JTBC 사회 뉴스 탭 선택시
function chooseSa_JTBC(){
	$.ajax({
		url:"Jtbc_Society.do",
		success : function(data){
			$(data.jtbc_society).each(function(index, obj){
				if(index >= 0 && index <= 3){					
					if(obj.title.length <= 30){
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+obj.date+"</span></li>");
					}else{
						var sub_title=substringTitle(obj.title);
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+sub_title+"</a><span>"+obj.date+"</span></li>");
					}
				}
			});
		}
	});
}

//JTBC 연예 뉴스 탭 선택시
function chooseLove_JTBC(){
	$.ajax({
		url:"Jtbc_Love.do",
		success : function(data){
			$(data.jtbc_entertainment).each(function(index, obj){
				if(index >= 0 && index <= 3){					
					if(obj.title.length <= 30){
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+obj.date+"</span></li>");
					}else{
						var sub_title=substringTitle(obj.title);
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+sub_title+"</a><span>"+obj.date+"</span></li>");
					}
				}
			});
		}
	});
}

//JTBC 스포츠 뉴스 탭 선택시
function chooseSports_JTBC(){
	$.ajax({
		url:"Jtbc_Sports.do",
		success : function(data){
			$(data.jtbc_sports).each(function(index, obj){
				if(index >= 0 && index <= 3){					
					if(obj.title.length <= 30){
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+obj.title+"</a><span>"+obj.date+"</span></li>");
					}else{
						var sub_title=substringTitle(obj.title);
						$('#jtbc').append("<li><a href="+obj.link+" target='_blank'>"+sub_title+"</a><span>"+obj.date+"</span></li>");
					}
				}
			});
		}
	});
}


//특수 문자 검증
function regExp(favorit){  
	 var regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
	 if(regExp.test(favorit)){
	      var result = favorit.replace(regExp, "");
	      return result
	  }	  
}

