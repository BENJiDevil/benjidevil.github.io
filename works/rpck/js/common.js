$(document).ready(function() {
$(".hamburger").click(function () {
    $(".header__menu").slideToggle("fast");
    if ($('.hamburger').hasClass("is-active")) {
        $('.hamburger').removeClass('is-active');
    } else {
        $('.hamburger').addClass('is-active');
    }
});
$(document).click(function (e) {
    var container = $(".hamburger");
    if (container.has(e.target).length === 0 && e.target.className != 'hamburger hamburger--slider is-active' ) {
        if ($('.hamburger').hasClass("is-active")) {
            $('.hamburger').removeClass('is-active');
            $(".header__menu").slideToggle("fast");
        }
    }
});
$('.main-menu .submenu-link').hover(
    function () {
        $(this).find('.submenu').stop().slideDown('fast');
    },
    function () {
        $(this).find('.submenu').stop().slideUp('fast');
    }
);
$("body").on('click', '.go_to', function(e){
    var fixed_offset = 0;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('#topbtn').fadeIn();
    } else {
        $('#topbtn').fadeOut();
    }
});
$('#topbtn').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 400);
    return false;
});
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
$('.video-link').magnificPopup({
        type: 'iframe',
        preloader: true,
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
$('input.phone-input').mask('+7 ( 999 ) 999-99-99');
$('input.name-input').keypress(function (key) {
    if (key.charCode < 48 || key.charCode > 57) return true;
    return false;
});
$('input.number-input').keypress(function (key) {
    if (key.charCode < 48 || key.charCode > 57) return false;
    return true;
});
$('input[name="phone_f"]').click(function() {
    this.focus();
    this.setSelectionRange(this.value.length, 4);
});
var mainSlider = $('#main-slider');
$("#main-slider").owlCarousel({
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: true,
    dots: false,
    nav: false,
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    onChange: beforeChange
});
function beforeChange(){
    $('#main-slider .owl-item .slide-image').fadeOut('slow');
    setTimeout(function () {
        $('#main-slider .owl-item.active .slide-image').fadeIn('fast');
    },500);

};
$('.main_next-btn').click(function() {
    mainSlider.trigger('next.owl.carousel');
});
$('.main_prev-btn').click(function() {
    mainSlider.trigger('prev.owl.carousel');
});

$("#clients-slider").owlCarousel({
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: true,
    dots: true,
    nav: true,
    items: 1,
    navText: ['<span class="info-btn-prev"></span>','<span class="info-btn-next"></span>']
});
$(".slider-block").owlCarousel({
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: true,
    dots: true,
    nav: true,
    navText: ['<span class="info-btn-prev"></span>','<span class="info-btn-next"></span>'],
    items: 1
});
$("#interest-slider").owlCarousel({
    loop: true,
    margin: 21,
    mouseDrag: false,
    touchDrag: true,
    dots: true,
    nav: true,
    navText: ['<span class="info-btn-prev"></span>','<span class="info-btn-next"></span>'],
    items: 4,
    slideBy: 4,
    responsive: {
        0:{
            items: 1,
            slideBy: 1
        },
        576:{
            items: 2,
            slideBy: 2
        },
        768:{
            items: 3,
            slideBy: 3
        },
        961:{
            items: 4
        }
    }
});
$('#slickSlider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    vertical: true,
    asNavFor: '#slickSlider-thumb',
});

$('#slickSlider-thumb').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '#slickSlider-main',
    vertical: true,
    dots: false,
    focusOnSelect: true,
    nextArrow: '<span class="slick-arrow-btn next-btn"></span>',
    prevArrow: '<span class="slick-arrow-btn prev-btn"></span>',
    responsive: [
        {
            breakpoint: 575,
            settings: {
                vertical: false
            }
        },
    ]

});

$('#slickSlider-thumb .slide-item').removeClass('slide-active');
$('#slickSlider-thumb .slide-item').eq(0).addClass('slide-active');
$('#slickSlider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('#slickSlider-thumb .slide-item').removeClass('slide-active');
    $('#slickSlider-thumb .slide-item').eq(mySlideNumber).addClass('slide-active');
});
});


function send_form(id) {
    var e = $('#'+id+'').serialize();
    var validateCheck = true;
    $('#'+id+'').find('input.required').each(function(){
        if($(this).val() && $(this).val() != ''){
            $(this).removeClass('validate');
        } else {
            $(this).addClass('validate');
            validateCheck = false;
        }
    });
    if($('#'+id+'').find('input[name="check"]').prop('checked') != true){
        validateCheck = false;
        $('#'+id+'').find('.requires-info').slideDown('fast');
    }
    else{
        $('#'+id+'').find('.requires-info').slideUp('fast');
    }
    if (validateCheck) {
        $.ajax({
            type: "POST",
            url: "include/send.php",
            data: e,
            success: function(e) {
                $('#'+id+'').find('input').not('.d-none').removeClass('error-input');
                var magnificPopup = $.magnificPopup.instance;
                magnificPopup.close();
                setTimeout(function() {
                    $.magnificPopup.open({
                        items: {src: '#thanks_modal'},
                        type: 'inline',
                        fixedContentPos: true,
                        fixedBgPos: true,
                        closeBtnInside: true,
                        midClick: true,
                        tClose: 'Закрыть',
                        mainClass: 'my-mfp-zoom-in'
                    });
                }, 500);
            },
            error: function(e, c) {
                alert("Error: Ошибка отправки");
            }
        });
    } else {
        $('#'+id+'').find('input').not('.d-none').removeClass('error-input');
        $('#'+id+'').find('.validate').addClass('error-input');
    }
}
