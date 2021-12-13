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
  /* product list replace title function */

  if ($(window).width() >= 1024) {
    $('.catalog__title').detach().prependTo('.catalog__content__right-side');
  }

  ;
  /* product list catalog function */

  $('.catalog-menu').on('click', '.catalog-link', function () {
    if ($(this).hasClass('open')) {
      $(this).siblings('.catalog-menu__list').slideUp('fast');
      $(this).removeClass('open');
    } else {
      $(this).siblings('.catalog-menu__list').slideDown('fast');
      $(this).addClass('open');
    }
  });
  /* product list filter fix function */

  $('.catalog__content .filter-link').on('click', function () {
    if ($(this).hasClass('open')) {
      $(this).siblings('.product-filters-block').slideUp('fast');
      $(this).removeClass('open');
    } else {
      $(this).siblings('.product-filters-block').slideDown('fast');
      $(this).addClass('open');
    }
  });
  $('.product-filters-block .filter-item-name').on('click', function () {
    if ($(this).hasClass('open')) {
      $(this).siblings('.product-filter').slideUp('fast');
      $(this).removeClass('open');
    } else {
      $(this).siblings('.product-filter').slideDown('fast');
      $(this).addClass('open');
    }
  });
  $('.product-filters-block input').on('change', function () {
    if ($(this).prop('checked') == true) {
      $(this).parents('li.checkbox').addClass('active');
    } else {
      $(this).parents('li.checkbox').removeClass('active');
    }
  });
  /* product list subcategory slider */

  $('.catalog__content .category-menu__list').owlCarousel({
    loop: true,
    margin: 20,
    mouseDrag: false,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-left-open"></i>', '<i class="icon icon-right-open"></i>'],
    items: 2,
    responsive: {
      0: {
        items: 2
      },
      414: {
        items: 3
      },
      640: {
        items: 4
      },
      768: {
        items: 5
      },
      1024: {
        items: 6
      }
    }
  });
  /* product list count btn function */

  $('.count-btn').on('click', function () {
    var curVal = parseInt($(this).siblings('.count-input').val());

    if ($(this).hasClass('minus-btn')) {
      if (curVal <= 1) {
        curVal = 1;
      } else {
        curVal--;
      }
    } else {
      curVal++;
    }

    $(this).siblings('.count-input').val(curVal);
  });
  /* product list add to cart function */

  $('.add-cart-btn').on('click', function (e) {
    if (!$(this).hasClass('active')) {
      e.preventDefault();
      $(this).addClass('active');
      $(this).parent().siblings('.count-group').slideDown('fast');
    }
  });
  /* product color change */

  $('.property-color input[name="color"]').on('click', function () {
    $(this).parents('.property-color').find('.property-value').text($(this).val());
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
    dots: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 4,
        vertical: false
      }
    }, {
      breakpoint: 413,
      settings: {
        slidesToShow: 3,
        vertical: false
      }
    }],
    nextArrow: '<i class="icon icon-right-open next-btn"></i>',
    prevArrow: '<i class="icon icon-left-open prev-btn"></i>'
  }); // Remove active class from all thumbnail slides

  $('#slickSlider-thumb .slide-item').removeClass('slide-active'); // Set active class to first thumbnail slides

  $('#slickSlider-thumb .slide-item').eq(0).addClass('slide-active'); // On before slide change match active thumbnail to current slide

  $('#slickSlider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('#slickSlider-thumb .slide-item').removeClass('slide-active');
    $('#slickSlider-thumb .slide-item').eq(mySlideNumber).addClass('slide-active');
  });
  /* product add sliders */

  $('.addproducts__content').owlCarousel({
    loop: true,
    margin: 20,
    mouseDrag: false,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-left-open"></i>', '<i class="icon icon-right-open"></i>'],
    items: 2,
    responsive: {
      0: {
        items: 1
      },
      414: {
        items: 2
      },
      576: {
        items: 3,
        margin: 15
      },
      768: {
        items: 4,
        margin: 15
      },
      1024: {
        items: 5
      },
      1200: {
        items: 6
      }
    }
  });
  /* product answers/questions tabs */

  $('.questions__menu .question-type-link').on('click', function () {
    var curType = $(this).attr('data-type');
    $('.questions__menu .question-type-link').removeClass('active');
    $(this).addClass('active');
    $('.questions__content .questions__content__tab').removeClass('active').slideUp('fast');
    $('.questions__content .questions__content__tab[data-type="' + curType + '"]').addClass('active').slideDown('fast');
  });
  $('.product-comments a').on('click', function () {
    if ($(this).attr('data-type') == 'questions') {
      $('.questions__menu .question-type-link[data-type="questions"]').click();
    }

    if ($(this).attr('data-type') == 'reviews') {
      $('.questions__menu .question-type-link[data-type="reviews"]').click();
    }
  });
  /* product answers photos slider */

  $('.photo-block').owlCarousel({
    loop: true,
    margin: 20,
    mouseDrag: false,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-left-open"></i>', '<i class="icon icon-right-open"></i>'],
    items: 2,
    responsive: {
      0: {
        items: 3
      },
      414: {
        items: 3
      },
      576: {
        items: 5
      },
      640: {
        items: 6
      },
      768: {
        items: 7
      },
      960: {
        items: 9
      },
      1024: {
        items: 11
      },
      1200: {
        items: 13
      }
    }
  });
  /* product answers photo modal */

  $('.questions__content .photo-block').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      preload: [0, 2],
      type: 'image',
      tClose: 'Закрыть',
      tLoading: 'Загрузка...',
      mainClass: 'my-mfp-zoom-in',
      gallery: {
        enabled: true,
        tPrev: 'Назад',
        tNext: 'Вперед',
        tCounter: '' // markup of counter || '%curr% of %total%'

      },
      image: {
        tError: 'Невозможно загрузить :('
      },
      ajax: {
        tError: 'Невозможно загрузить :('
      }
    });
  });
  /* stocks page enterprises mobile fix */

  if ($(window).width() <= 1024) {
    $('.enterprises-stocks__content__item .enterprise-link').on('click', function (e) {
      if (!$(this).hasClass('active')) {
        e.preventDefault();
        $('.enterprises-stocks__content__item .enterprise-link').removeClass('active');
        $(this).addClass('active');
      }
    });
  }
  /* resize functions */


  $(window).resize(function () {
    if ($(window).width() >= 1024) {
      $('.catalog__title').detach().prependTo('.catalog__content__right-side');
    } else {
      $('.catalog__title').detach().prependTo('.catalog__content');
    }
  });
  /* scroll to block */

  $("body").on('click', '.go_to', function (e) {
    var fixed_offset = 65;
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
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