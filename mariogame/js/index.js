$(document).ready(function(){

   $("img").draggable();
   
   $(document).keydown(function(k){
      //alert( parseInt(k.which,10) );
      
      switch( parseInt(k.which,10) ){
            
         case 37:   
            $("img").attr("src","https://s3-us-west-2.amazonaws.com/s.cdpn.io/462663/mb-left.png");
            $("img").animate( {left: "-=15px"},"fast" );
            break;
            
            
         case 39:   
            $("img").attr("src","https://s3-us-west-2.amazonaws.com/s.cdpn.io/462663/mb-right.png");
            $("img").animate( {left: "+=15px"},"fast" );
            break;
            
            
         case 38:   
           $("#jump").trigger("play"); $("img").attr("src","https://s3-us-west-2.amazonaws.com/s.cdpn.io/462663/mb-jump.png");
            $("img").animate( {top: "-=15px"},"fast" );
            break;
            
            
         case 40: 
            $("img").attr("src","https://s3-us-west-2.amazonaws.com/s.cdpn.io/462663/mb-front.png");
            $("img").animate( {top: "+=15px"},"fast" );
            break;
            
            
         case 66:
            //b
            $("#jump").trigger("play");
            $("img").effect('bounce', {times: 5}, 500 );
            break;
            
            
         case 67:
            //c
            $("img").effect('clip', {times: 1}, 500 );
            break;
            
            
         case 68:
            //d
            $("img").effect('drop', {times: 1}, 500 );
            break;
            
            
         case 69:
            //e
            $("img").effect('slide', {times: 1}, 500 );
            break;
            
            
         case 80:
            //p
             $("img").trigger("dblclick");
            $("img").effect('puff', {times: 1}, 500 );
            break;
            
            
            
            
         case 83:
            //s
            $("img").effect('shake', {times: 5}, 500 );
            break;
            
            
      }
   });
   
   
   $("img").dblclick(function(){
      $("img").effect("explode");
   });
   
   
   
});