/**
 * 작성자 : 박성준
 * 작성일 : 2017-01-11
 * 목 적 : 국회의원에게 한마디 하려고 ....
 */
//스크립트 객체 생성 > 유효성 끝나고 정상적인 데이터면 객체 생성 해줌.
var obj ={
   title : '',
   content : '',
   writer : '',
   catego : '',
   uploadfile:''
};

//yyyymmdd 형태로 포매팅된 날짜 반환
Date.prototype.yyyymmdd = function()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy +"-"+ (mm[1] ? mm : '0'+mm[0])+"-"+(dd[1] ? dd : '0'+dd[0]);
}


//말말말 유효성 검사 체크 하는 함수
function CheckUser(){
   var result = true;
   //제목
   var title = $('#talk_title').val();
   //내용
   var content = CKEDITOR.instances.content.getData();
   //누구에게 쓰는지
   var catego = $('#catego').val();
   //작성자
   var writer = $('#logId').val();
   
   var uploadfile =$('#uploadfile').val();
   
   if(title == ''){
      alert("제목을 입력해주세요 !!");
      $('#talk_title').focus();
      result = false;
      return result;
   }

   if(content == ''){
      alert("내용을 입력해주세요 !!");
      $('#content').focus();
      result = false;
      return result;
   }
   if(catego == '' || writer == ''){
      alert("올바르지 못한 접근입니다!!");
      result = false;
      return result;
   }
   //유효성 통과시 스크립트 객체에 데이터 담아둠
   if(result == true){
      //obj.regdate = new Date().yyyymmdd()
      obj.title = title;
      obj.content = content;
      obj.catego = catego;
      obj.writer = writer;
      obj.uploadfile=uploadfile;
      
   }
   return result;
}


$(function(){
   
   

   //말말말 글쓰기 버튼 클릭시
   $('#writeButton').click(function(){
      var checkLogin = CheckUser();
      if(checkLogin == false){
         return false;
      }else{
         var parseData = JSON.stringify(obj);
         //유효성 검사 통과한 객체 를 json 형식의 문자열 변환하여 쏘아보냄 submit!!
         $('#obj').val(parseData);
         alert("엘스 탔어요!!!!! "+parseData);
         $('#writeForm').submit();
      }
   });
   

   //실제 수정 작업 시작
   $('#modifyButton').click(function(){
      
      var title = $("#talk_title").val();
      var content = CKEDITOR.instances.content.getData();
      if(title ==''){
         alert("제목을 입력해주세요 !");
         $('#talk_title').focus();
         return false;
      }
      
      if(content == ''){
         alert("내용을 입력해주세요 !");
         $('#content').focus();
         return false;
      }
      
      $('#modifyForm').submit();
      
      
   });
   
   
});


//말,말,말 상세 글보기 부분 > 수정
function modifyTalk(seq){
   $('#session_id').val();
   alert("수정 버튼 클릭!");
   $.ajax({
      url:"paliamentTalk_modifyDetail.do",
      data : {
         seq : seq,
         id : $('#session_id').val()
      },
      success : function(data){
         if(data.result =='성공'){
            console.log("if 내부 호출 : "+data);
            var obj = JSON.stringify(data);
             
            var dept_cd = $("#dept_cd").val();
            var img = $("#img").val();
            var name = $("#name").val();
            var num = $("#num").val();
            var seq = data.dto.paliament_talk_seq;
            console.log("dept : "+dept_cd + " / img : "+img + " nmae : "+name + " /num : "+num);
            location.href="modifyTalk_WriteModify.do?seq="+seq+"&dept_cd="+dept_cd+"&name="+name+"&num="+num+"&img="+img +"&obj="+obj;
         }else{
            alert("죄송합니다. 올바르지 못한 접근 입니다.");
         }
      }
   });
   
}
