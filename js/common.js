$(document).ready(function() {
$('.mmenu-list__link').on('click', function () {
        $('.mmenu-list__link').removeClass('active');
        $(this).addClass('active');
        var curTab = $(this).attr('data-tab');
        $('.main-tab').fadeOut('fast');
        $('.main-tab[data-tab="'+ curTab +'"]').fadeIn('fast');
        if(curTab == 'skills'){
            setTimeout(function () {
                $('.range-row').addClass('loaded');
            }, 500)
        }
        else{
            $('.range-row').removeClass('loaded');
        }
    });
$('.filter-list__type label').on('click', function () {
    $('.filter-list__type label').removeClass('active');
    $(this).addClass('active');
});
$('.filter-list__lang label').on('click', function () {
    $('.filter-list__lang label').removeClass('active');
    $(this).addClass('active');
});
$('.filter-list').on('change', function () {
    var type = $('input[name="site-type"]:checked').val();
    var lang = $('input[name="site-lang"]:checked').val();
    $('.projects-block .projects-block__item').fadeOut('fast');
    setTimeout(function () {
        if(type == 'all' && lang != 'all'){
            $('.projects-block .projects-block__item[data-lang="'+ lang +'"]').fadeIn('fast');
        }
        if(lang == 'all' && type != 'all'){
            $('.projects-block .projects-block__item[data-type="'+ type +'"]').fadeIn('fast');
        }
        if(lang != 'all' && type != 'all'){
            $('.projects-block .projects-block__item[data-lang="'+ lang +'"][data-type="'+ type +'"]').fadeIn('fast');
        }
        if(lang == 'all' && type == 'all'){
            $('.projects-block .projects-block__item').fadeIn('fast');
        }
    }, 300);
});
});

