+function ($) {
  'use strict';

  // ENTER CLASS DEFINITION
  // ======================

$("#play-video").on('hidden.bs.modal', function (e) { $("#play-video iframe").attr("src", $("#play-video iframe").attr("src"));
});

}(jQuery);


+function ($) {
  'use strict';

  // ENTER CLASS DEFINITION
  // ======================
  
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
   animationTime: 0,             // AnimationTime let you define how long each section takes to animate
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

      currentSection = index;


   },  
   afterMove: function(index) {
   },
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
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

}(jQuery);
