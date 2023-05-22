/*
=====================
JS Table of Conttent 
=====================

*/
(function ($) {
  "use strict";
  /*
------------------------  
01. Preloader
--------------------------
*/ 
  $(window).on('load', function () {
    var preLoder = $(".preloader");
    preLoder.fadeOut(10);
  });
   /*
  ------------------------  
  03. Mobile Menu 
  --------------------------
  */ 
  $(".mobile-toggle").on("click", function () {
    $(this).toggleClass("open");
    $(".toggle-menu-class").slideToggle();
  }); 
  /*
  ------------------------  
  02. Sticky Header
  --------------------------
  */ 
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $(".header-bottombar").addClass("header-sticky");
    } else {
      $(".header-bottombar").removeClass("header-sticky");
    } 
  });

  /*
  ------------------------  
   23. Scroll to Top
  --------------------------
  */
AOS.init({
  offset: 120,
  delay: 0,
  duration: 1000,
  easing: 'ease',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
  
});
  /*
  ------------------------  
   23. Scroll to Top
  --------------------------
  */

  function scrolltop() {
    var wind = $(window);
    wind.on("scroll", function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop >= 500) {
        $(".scroll-top").fadeIn("slow");
      } else {
        $(".scroll-top").fadeOut("slow");
      }
    });
    $(".scroll-top").on("click", function () {
      var bodyTop = $("html, body");
      bodyTop.animate({
        scrollTop: 0
      }, 800, "easeOutCubic");
    });
  }
  scrolltop();
  
}(jQuery));
