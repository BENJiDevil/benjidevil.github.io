$('form').on('submit', function (e){
    /* simple validate */
    $(this).find('.required-input').each(function (){
        if($(this).val() == ''){
            $(this).addClass('error');
            $(this).parents('.input-group').find('.input-message').fadeIn('fast');
            e.preventDefault();
        }
        else{
            if($(this).hasClass('error')){
                $(this).removeClass('error');
                $(this).parents('.input-group').find('.input-message').fadeOut('fast');
                return;
            }
        }
    });
})