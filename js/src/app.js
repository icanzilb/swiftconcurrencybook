function closecontact() {
    $('#contact').trigger('reveal:close');
}

(function ($, window, undefined) {
    'use strict';

    var $doc = $(document),
        Modernizr = window.Modernizr;

    $(document).ready(function () {
        $.fn.foundationAlerts ? $doc.foundationAlerts() : null;
        $.fn.foundationButtons ? $doc.foundationButtons() : null;
        $.fn.foundationAccordion ? $doc.foundationAccordion() : null;
        $.fn.foundationNavigation ? $doc.foundationNavigation() : null;
        $.fn.foundationTopBar ? $doc.foundationTopBar() : null;
        $.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
        $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
        $.fn.foundationTabs ? $doc.foundationTabs({callback: $.foundation.customForms.appendCustomMarkup}) : null;
        $.fn.foundationTooltips ? $doc.foundationTooltips() : null;
        $.fn.foundationMagellan ? $doc.foundationMagellan() : null;
        $.fn.foundationClearing ? $doc.foundationClearing() : null;

        $.fn.placeholder ? $('input, textarea').placeholder() : null;

        // image gallery
        $('.image-gallery a').touchTouch();



        // scroll-up icon
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
        $('.scrollup').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

        // prepare captcha
        $.getJSON('contact.php?action=captcha', function (data) {
            $('#captcha').html(data.i1 + ' ' + data.o + ' ' + data.i2);
            $('#s').val(data.s);
        });
        // contact form handler
        var form = $("form#contactform");
        form.submit(function (e) {
            $.post('contact.php', $("form#contactform").serialize(), function (data) {
                if (data.status == 200) {
                    $('#formwrapper').hide();
                    $('#contactmessages').empty().append('<p class="success">'+phrases.contact_success+'</p><a href="javascript:closecontact();" id="contact_close_counter">Close (<span id="counter">5</span>)</a>');
                    var sec = $('span#counter').text() || 0;
                    var timer = setInterval(function () {
                        $('span#counter').text(--sec);
                        if (sec == 0) {
                            closecontact();
                            clearInterval(timer);
                        }
                    }, 1000);
                } else {
                    $('#contactmessages').empty();
                    $.each(data.messages, function (i, message) {
                        $('#contactmessages').append('<p class="fail">' + message + '</p>');
                    });
                }
            }, 'json');

            return false;
        });
        // make contact form available on click
        $('.feedback,#feedback').click(function (e) {
            $('#contact').reveal();
            return false;
        });



    });

    // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
    $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
    $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
    $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
    $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

    // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
    if (Modernizr.touch && !window.location.hash) {
        $(window).load(function () {
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 0);
        });
    }

})(jQuery, this);
