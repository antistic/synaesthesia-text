/* exported colourIt */
/*global $ */

function colourIt() {
    var text = $("#originalText").val();

    $('#colouredText').empty();
    $('#colouredText').append(addColours(text));
}

function addColours(text) {
    var colouredText = '',
        c = '',
        t = '';

    for (var i = 0, len = text.length; i < len; i++) {
        t = text[i];
        c = t.charCodeAt(0);
        if ((c > 47 && c < 58) || (c > 64 && c < 91) || (c > 96 && c < 123)) {
            // alphanumeric
            colouredText += '<span class="col' + c + '">' + t + "</span>";
        } else if (c == 10) {
            // linebreak
            colouredText += '<br>';
        } else if (!(c < 31) && !(c == 127)) {
            // not a special char
            colouredText += t;
        }
    }
    return (colouredText);
}

// windowload
$(window).load(function () {
    autosize($('textarea'));

    $('#main').click(function () {
        $('#originalText').focus();
    });

    // deals with tabs
    $('#tabs li a').on('click', function (e) {
        var currentTab = $(this).attr('href');

        // show/hide tab
        $('.tab' + currentTab).addClass('active').siblings('.tab').removeClass('active');

        e.preventDefault();
    });

    // custom colour subtabs
    $('#colourTabs li a').on('click', function (e) {
        var currentTab = $(this).attr('href');

        // show/hide tab
        $('.colourContainer' + currentTab).addClass('active').siblings('.colourContainer').removeClass('active');

        // style tab links
        $('#colourTabs li').removeClass('active');
        $(this).parent().addClass('active');

        // actions
        updateExport();
//        createStyles();

        e.preventDefault();
    });
});
