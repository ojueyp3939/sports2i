$(document).ready(function(){
  // 햄버거 메뉴를 클릭시 X자로 모양 바뀐 후 메뉴on
  $('.btn-hamburger').on('click',function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(".m-menu").removeClass('on');
      $(".menu-box").removeClass('on');
      $("body").css({overflow:'auto',height:'auto'});
    } else{
      $(this).addClass('on');
      $(".m-menu").addClass('on');
      $(".menu-box").addClass('on');
      $("body").css({overflow:'hidden',height:'100%'});
    }
  });
});
