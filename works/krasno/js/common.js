(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /* on scroll function */
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll > 0) {
      $(".header").addClass("scroll");
      $(".topBtn").fadeIn("fast");
    } else {
      $(".header").removeClass("scroll");
      $(".topBtn").fadeOut("fast");
    }
  });
  /* wow animate function */

  var wow = new WOW({
    boxClass: 'wow',
    // animated element css class
    animateClass: 'animated',
    // animation css class
    offset: 200,
    // distance to the element when triggering the animation
    mobile: false,
    // trigger animations on mobile devices
    live: true // act on asynchronously loaded content

  });
  wow.init();
  /* mobile menu function */

  $(".hamburger").click(function () {
    $(".main-menu").slideToggle("fast");

    if ($('.hamburger').hasClass("is-active")) {
      $('.hamburger').removeClass('is-active');
      $('.main-menu').removeClass('active');
      $('body').removeClass('overflow');
    } else {
      $('.hamburger').addClass('is-active');
      $('.main-menu').addClass('active');
      $('body').addClass('overflow');
    }
  });
  $(".account-link").click(function () {
    $(".account-menu__list").slideToggle("fast");

    if ($('.account-link').hasClass("active")) {
      $('.account-link').removeClass('active');
      $('.account-menu__list').removeClass('active');
    } else {
      $('.account-link').addClass('active');
      $('.account-menu__list').addClass('active');
    }
  });
  $(document).click(function (e) {
    var menu_container = $(".hamburger"),
        account_container = $(".account-menu");

    if (menu_container.has(e.target).length === 0 && e.target.className != 'hamburger hamburger--slider is-active') {
      if ($('.hamburger').hasClass("is-active")) {
        $('.hamburger').removeClass('is-active');
        $('.main-menu').removeClass('active');
        $('body').removeClass('overflow');
        $(".main-menu").slideToggle("fast");
      }
    }

    if (account_container.has(e.target).length === 0 && e.target.className != 'account-link active') {
      if ($('.account-link').hasClass("active")) {
        $('.account-link').removeClass('active');
        $('.account-menu__list').slideUp('fast');
      }
    }
  });
  /* product slider */

  $('#slickSlider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: '#slickSlider-thumb'
  });
  $('#slickSlider-thumb').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '#slickSlider-main',
    dots: true,
    focusOnSelect: true,
    nextArrow: '<span class="slick-arrow-btn next-btn"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"><g><g><path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/></g></g></svg></span>',
    prevArrow: '<span class="slick-arrow-btn prev-btn"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"><g><g><path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/></g></g></svg></span>'
  }); // Remove active class from all thumbnail slides

  $('#slickSlider-thumb .slide-item').removeClass('slide-active'); // Set active class to first thumbnail slides

  $('#slickSlider-thumb .slide-item').eq(0).addClass('slide-active'); // On before slide change match active thumbnail to current slide

  $('#slickSlider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('#slickSlider-thumb .slide-item').removeClass('slide-active');
    $('#slickSlider-thumb .slide-item').eq(mySlideNumber).addClass('slide-active');
  });
  /* scroll top TOP */

  $("body").on('click', '.toTop', function (e) {
    $('html,body').stop().animate({
      scrollTop: 0
    }, 1000);
    e.preventDefault();
  });
});

},{}]},{},[1])

//# sourceMappingURL=common.js.map
