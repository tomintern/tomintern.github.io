document.getElementsByTagName("body")[0].style.cursor = "url('http://puu.sh/pD2Ti/1501ac33bd.cur'), auto";



$('#cat').mousedown(function(){
	$('.catbody').addClass('purr');
  $('.head').addClass('purr2');
  $('.eye').addClass('purreye');
  $('.petme').hide();
});

$('#cat').mouseup(function(){
	$('.catbody').removeClass('purr');
  $('.head').removeClass('purr2');
  $('.eye').removeClass('purreye');
});

$('#cat').touchstart(function(){
	$('.catbody').addClass('purr');
  $('.head').addClass('purr2');
  $('.eye').addClass('purreye');
});

$('#cat').touchend(function(){
	$('.catbody').removeClass('purr');
  $('.head').removeClass('purr2');
  $('.eye').removeClass('purreye');
});