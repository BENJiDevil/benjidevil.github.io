(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

$('.main-scheme__menu__item .icon').on('click', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).parent().removeClass('active');
    $(this).siblings('.submenu-list').slideUp('fast');
  } else {
    $(this).addClass('active');
    $(this).parent().addClass('active');
    $(this).siblings('.submenu-list').slideDown('fast');
  }
});
$('.main-scheme__title .icon').on('click', function () {
  if (!$(this).hasClass('show')) {
    $(this).addClass('show');
    $('.main-scheme__content__left-side').slideDown('fast');
  } else {
    $(this).removeClass('show');
    $('.main-scheme__content__left-side').slideUp('fast');
  }
});
$('.catalog-page__tabs__item').on('click', function () {
  if (!$(this).hasClass('active')) {
    var curtab = $(this).attr('data-tab');
    $('.catalog-page__tabs__item').removeClass('active');
    $(this).addClass('active');
    $('.catalog-page__items-list').fadeOut('fast').removeClass('active');
    $('.catalog-page__items-list[data-tab="' + curtab + '"]').fadeIn('fast').addClass('active');
  }
});

},{}],2:[function(require,module,exports){
"use strict";

$('.main-page__content__item').on('click', '.title-block', function () {
  if (!$(this).parent().hasClass('active')) {
    $('.main-page__content__item').removeClass('active').find('.descr-block');
    $(this).parent().addClass('active').find('.descr-block');
  }
});
$('.section-partners__content').owlCarousel({
  loop: true,
  margin: 20,
  mouseDrag: false,
  touchDrag: true,
  dots: false,
  nav: true,
  navText: ['<i class="icon icon-arrow-right_icon"></i>', '<i class="icon icon-arrow-right_icon"></i>'],
  items: 2,
  responsive: {
    0: {
      items: 2,
      margin: 0
    },
    576: {
      items: 3
    },
    768: {
      items: 4
    },
    960: {
      items: 5
    },
    1200: {
      items: 6
    }
  }
});
/* map */

if ($(window).width() < 1200 && $(window).width() > 576) {
  $('.section-map__item').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).find('.item-descr').slideUp('fast');
    } else {
      $('.section-map__item').removeClass('active');
      $('.section-map__item .item-descr').slideUp('fast');
      $(this).addClass('active');
      $(this).find('.item-descr').slideDown('fast');
    }
  });
  $(document).click(function (e) {
    var container = $(".section-map__item");

    if (container.has(e.target).length === 0) {
      $('.section-map__item').removeClass('active');
      $('.section-map__item .item-descr').slideUp('fast');
    }
  });
}

if ($(window).width() >= 1200) {
  $(".section-map__item").hover(function () {
    $(this).addClass('active').find('.item-descr').stop().slideDown('fast');
  }, function () {
    $(this).removeClass('active').find('.item-descr').stop().slideUp('fast');
  });
}

},{}],3:[function(require,module,exports){
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /* main */
  // menu
  if ($(window).width() < 1200) {
    $('.hamburger').on('click', function () {
      if ($(this).hasClass("is-active")) {
        $(this).removeClass('is-active');

        if ($(window).width() > 576) {
          $("nav.main-menu").removeClass('show');
        } else {
          $('body').removeClass('overflow');
          $("nav.main-menu").slideToggle(350);
        }
      } else {
        $(this).addClass('is-active');

        if ($(window).width() > 576) {
          $("nav.main-menu").addClass('show');
        } else {
          $('body').addClass('overflow');
          $("nav.main-menu").slideToggle(350);
        }
      }
    });
    $('.main-menu__item.submenu .icon').on('click', function () {
      if ($(this).hasClass('show')) {
        $(this).removeClass('show');
        $(this).siblings('.submenu-list').slideUp('fast');
      } else {
        $(this).addClass('show');
        $(this).siblings('.submenu-list').slideDown('fast');
      }
    });
  }

  $(document).click(function (e) {
    var container = $(".hbottom-menu");

    if (container.has(e.target).length === 0 && e.target.className != 'hamburger hamburger--slider is-active' || e.target.className == 'fcall-link btn-style-dark modal-win') {
      if ($('.hamburger').hasClass("is-active")) {
        $('.hamburger').removeClass('is-active');

        if ($(window).width() > 576) {
          $("nav.main-menu").removeClass('show');
        } else {
          $('body').removeClass('overflow');
          $("nav.main-menu").slideToggle("fast");
        }
      }
    }
  }); // search

  if ($(window).width() < 1200 && $(window).width() > 576) {
    $('.hbottom-search .search-btn').on('click', function (e) {
      if (!$(this).parent().hasClass('active')) {
        e.preventDefault();
        $(this).parent().addClass('active');
        $(this).siblings('.search-input').fadeIn('fast');
      }
    });
    $(document).click(function (e) {
      var container = $(".hbottom-search .search-btn");

      if (container.has(e.target).length === 0 && $('.hbottom-search .input-group').hasClass('active') && e.target.className != 'search-input') {
        $('.hbottom-search .input-group').removeClass('active');
        $('.hbottom-search .input-group .search-input').fadeOut('fast');
      }
    });
  } // menu scroll desktop


  if ($(window).width() >= 1200) {
    var header_height = $('.header').height();
    $(window).scroll(function () {
      if ($(window).scrollTop() > header_height + 10) {
        if (!$('.header').hasClass('scroll')) {
          $('body').css('padding-top', header_height);
          $('.header').addClass('scroll');
        }
      } else {
        if ($('.header').hasClass('scroll')) {
          $('body').css('padding-top', '');
          $('.header').removeClass('scroll');
        }
      }

      if ($(window).scrollTop() > header_height + 50) {
        $('.header').addClass('show');
      } else {
        $('.header').removeClass('show');
      }
    });
  }
  /* pages */


  require('./_pages/_main-page');

  require('./_pages/_catalog-page');
  /* check form */


  $('.check-group input[type="checkbox"]').on('change', function () {
    if ($(this).prop('checked')) {
      $(this).parent().siblings('.btn-group').find('button').prop('disabled', false);
    } else {
      $(this).parent().siblings('.btn-group').find('button').prop('disabled', true);
    }
  });
  /* scroll to block */

  $("body").on('click', '.go_to', function (e) {
    var header_height = $('.header').height();
    var fixed_offset = header_height - 50;
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
  });
  $('.document-menu__link').on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.document-menu__link').removeClass('active');
      $(this).addClass('active');
    }
  });
  /* modal */

  $('.modal-win').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    closeBtnInside: true,
    midClick: true,
    removalDelay: 300,
    tClose: 'Закрыть',
    mainClass: 'my-mfp-zoom-in',
    image: {
      tError: 'Невозможно загрузить :('
    },
    ajax: {
      tError: 'Невозможно загрузить :('
    }
  });
  $('.gallery-page__item').each(function () {
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
});

},{"./_pages/_catalog-page":1,"./_pages/_main-page":2}]},{},[3])

//# sourceMappingURL=common.js.map
