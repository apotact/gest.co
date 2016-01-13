+function ($) {

if (window.location.pathname === "/") {

  $("#play-video").on('hidden.bs.modal', function (e) { $("#play-video iframe").attr("src", $("#play-video iframe").attr("src"));});

}

  var fadeInSR = {
    delay   : 80,
    easing : 'ease-in-out',
		viewFactor : 0.1,
    opacity: 0,
		scale: 1,
		distance : '0px',
    reset: false
  };

  var slideUpSR = {
		delay    : 200,
		distance : '90px',
		easing   : 'ease-in-out',
		scale    : .9,
		reset		 : false

  };

  var slideDownSR = {
    origin   : 'top',
		delay    : 333,
		distance : '90px',
		easing   : 'ease-in-out',
		scale    : 1,
		reset		 : false
  };

  // Changing the defaults
  window.sr = ScrollReveal({ reset: false });

  // Customizing a reveal set
  sr.reveal( '.reveal-slide', slideUpSR);
	sr.reveal( '.reveal-fade', fadeInSR);
  sr.reveal('.reveal-slide-down', slideDownSR);



}(jQuery);

/* used for page /technology.html only */
+function ($) {

if (window.location.pathname === "/technology.html" || window.location.pathname === "/technology" ){

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

if (isMobile) {
	window.location.pathname = "/technology-m";
}

  var currentSection = 1;
  var nextSection;

  // Reverse playback help
  var intervalRewind;
  var globalID;
  var globalID2;
  var vid = $("#gblow").get(0);

  var frameCount = 0;
  var fps, fpsInterval, startTime, now, then, elapsed;

  // 0 vertical
  // 1.8 s blowout pause
  // 3.5333 s (before finger cuff)
  // 4.4333 s ( end )
  var timings = [ 0, 1.8, 4.43333 ];

  document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });

  $(".blowout").onepage_scroll({
     sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
     easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
     animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
     pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
     updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
     beforeMove: function(index) {

       nextSection = index;

       if (currentSection === 1 && index === 2){
         console.log("1->2");
         vid.play();
         cancelAnimationFrame(globalID);
         globalID2 = requestAnimationFrame(forwardPlayback);
       }
       else if (currentSection === 2 && index === 3){
         console.log("2->3");
         vid.play();
         cancelAnimationFrame(globalID);
         globalID2 = requestAnimationFrame(forwardPlayback);
       }
			 else if (currentSection === 1 && index === 3) {
         vid.play();
         cancelAnimationFrame(globalID);
         globalID2 = requestAnimationFrame(forwardPlayback);

       }
       /* backwards playback */
       else if (currentSection === 3 && index === 2){
         console.log("3->2");
         
         fpsInterval = 1000 / 30;
         then = Date.now();
         startTime = then;
         console.log(startTime);
         cancelAnimationFrame(globalID2);
         globalID = requestAnimationFrame(reversePlayback);
       }
       else if (currentSection === 2 && index === 1){
         console.log("2->1");

         fpsInterval = 1000 / 30;
         then = Date.now();
         startTime = then;
         console.log(startTime);
         cancelAnimationFrame(globalID2);
         globalID = requestAnimationFrame(reversePlayback);
       }
			 else if (currentSection === 3 && index === 1) {
         fpsInterval = 1000 / 30;
         then = Date.now();
         startTime = then;
         console.log(startTime);
         cancelAnimationFrame(globalID2);
         globalID = requestAnimationFrame(reversePlayback);

       }

        currentSection = index;

     },  
     afterMove: function(index) {
     },
     loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
     keyboard: true,                  // You can activate the keyboard controls
		 //responsiveFallback: 992,        // You can fallback to normal page scroll by defining the width of the browser in which
                                      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                      // the browser's width is less than 600, the fallback will kick in.
     direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
  });

    function forwardPlayback(time) {
      if (vid.currentTime >= timings[nextSection-1]) {
        
        cancelAnimationFrame(globalID2);
        vid.pause();
      }
      else {
        globalID2 = requestAnimationFrame(forwardPlayback);
      }

    }

    function reversePlayback(time) {
      if (vid.currentTime <= timings[nextSection-1]) {
        // Stop animation
        cancelAnimationFrame(globalID);
        vid.pause();
        return;
      }

      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
         then = now - (elapsed % fpsInterval);
         vid.currentTime += -(elapsed/1000);
         //vid.play();
      }
        globalID = requestAnimationFrame(reversePlayback);

    }

		if(window.location.hash) {
				// TODO: hack ignore hash on page load, default to 1
				var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
				$(".blowout").moveTo(1);
		}
    
  }

}(jQuery);
