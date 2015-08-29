/* global $, document, jquery */

var Person = function (name, special, capitals, words) {
    'use strict';

    this.name = name;
    // special characters in HEX code
    this.specialCharacters = new RegExp('([' + special + '])', 'gi');
    this.capitals = new RegExp('([' + capitals + '])', 'g');
    this.words = words;
    this.otherFunction = function (textArray, text) {
        return textArray;
    };
};

var yachen = new Person('yachen', 'çÇüÜß', 'GQ', []);

yachen.otherFunction = function (textArray, text) {
    'use strict';

    var newText = textArray,
        i;

    for (i = 0; i < text.length; i++) {
        if ((newText[0][i] === '1')) {
            // before/after 1-9)
            if ((/([1-9])/.test(newText[0][i - 1])) || (/([1-9])/.test(newText[0][i + 1]))) {
                newText[1][i] = 'alt1';
            }
            if (newText[0].indexOf('0') > -1) {
                newText[1][i] = '1';
            }
        }
    }

    return newText;
};

var surabi = new Person('surabi', '', '', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);

var fiona = new Person('fiona', '', '', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']);

var su = new Person('su', '', '', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);

function exceptions(textArray, text) {
    'use strict';
    var newText = textArray,
        person = currentPerson,
        i, j,
        match, startPos, endPos;

    for (i = 0; i < text.length; i++) {
        // special characters
        if (person.specialCharacters.test(newText[0][i])) {
            newText[1][i] = 'u' + ('000' + newText[0][i].charCodeAt(0).toString(16)).slice(-4);
        }

        // capital letters
        if (person.capitals.test(newText[0][i])) {
            newText[1][i] = 'cap' + newText[0][i];
        }
    }

    // words
    for (i = 0; i < person.words.length; i++) {
        var regex = new RegExp(person.words[i], 'gi');
        while ((match = regex.exec(text))) {
            startPos = match.index;
            endPos = match.index + match[0].length;
            for (j = startPos; j < endPos; j++) {
                newText[1][j] = person.words[i];
            }
        }
    }

    newText = person.otherFunction(newText, text);

    return newText;
}

function addColours(text) {
    'use strict';
    var colourText = '',
        newText = [],
        i;

    // 0 is text, 1 is classes
    newText[0] = text.split('');
    newText[1] = text.toLowerCase().split('');

    for (i = 0; i < text.length; i++) {
        // if a number preprend 'num'
        if (/^\d$/.test(newText[0][i])) {
            newText[1][i] = 'num' + newText[1][i];
        }

        // if a paragraph break, no class, replace with tags
        if (newText[0][i] === '\n') {
            newText[0][i] = '<br>';
            newText[1][i] = '';
        }

        // no class if space or punctuation
        if (/([^a-zA-Z0-9])/.test(newText[0][i])) {
            newText[1][i] = '';
        }
    }

    // exceptions
    newText = exceptions(newText, text);

    for (i = 0; i < text.length; i++) {
        if (newText[1][i] !== '') {
            colourText += '<span class="' + newText[1][i] + 'Col">' + newText[0][i] + '</span>';
        } else {
            colourText += newText[0][i];
        }
    }

    return colourText;
}

function changeBackground() {
    'use strict';
    var colour;

    colour = $('input[type="radio"][name="background"]:checked').val();
    if (colour === 'rainbow') {
        colour = 'none';
        $('#formattedText').css('background', 'url(trippy.gif)');
        return;
    }
    if (colour === 'other') {
        colour = $('input[type="text"][name="background"]').val();
        if (colour === '') {
            colour = '#aaa';
        }
    }
    $('#formattedText').css({
        'background': 'none',
        'background-color': colour
    });
}

function overlayEffect() {
    'use strict';

    if ($('input[value="overlay"]:checked').length === 1) {
        var text, opacity;

        $('#overlay').empty();

        text = $('#originalText').val();

        // changes newlines to <br>
        text = text.replace(/\n/g, '<br>');

        $('#overlay').append('<p>' + text + '</p>');

        opacity = $('input[type="text"][name="overlay"]').val();
        if (opacity > 1 || opacity < 0 || isNaN(opacity)) {
            opacity = '0.5';
        }
        $('#overlay').css('opacity', opacity);
    } else {
        $('#overlay').empty();
    }
}

function changeEffects() {
    'use strict';
    var shadow = '',
        outlineColour = $('input[type="text"][name="outline"]').val(),
        blur = $('input[type="text"][name="glow"]').val(),
        opacity = $('input[type="text"][name="overlay"]').val();

    $('#formattedText span').removeAttr("style");

    if ($('input[value="outline"]:checked').length === 1) {

        // set outlineColour
        if (outlineColour === '') {
            outlineColour = '#aaa';
        }
        outlineColour = outlineColour.replace(' ', '');

        // setting shadow
        shadow = outlineColour + ' 0 0 1px, 1px 0 0 ' + outlineColour + ', -1px 0 0 ' + outlineColour + ', 0 1px 0 ' + outlineColour + ', 0 -1px 0 ' + outlineColour;
        $('#formattedText span').css('text-shadow', shadow);
    }

    if ($('input[value="glow"]:checked').length === 1) {
        if (shadow !== '') {
            shadow += ', ';
        }
        if (blur === '') {
            blur = '3';
        }
        $('#formattedText span').each(function () {
            $(this).css(
                'text-shadow',
                shadow +
                '0 0 ' + blur + 'px ' + $(this).css('color')
            );
        });
    }

    if ($('input[value="overlay"]:checked').length === 1) {
        $('#overlay').css('color', 'rgba(0, 0, 0, ' + opacity + ')');
        $('#overlay').css('display', 'inherit');
    } else {
        $('#overlay').css('display', 'none');
    }
}

function magic() {
    'use strict';
    var text;

    $('#formattedText').empty();
    $('#overlay').empty();

    text = $('#originalText').val();
    text = addColours(text);

    $('#formattedText').append('<p>' + text + '</p>');
    $('#overlay').append(text);
    changeEffects();
}


var currentPerson = yachen;

$(document).ready(function () {
    'use strict';

    // change background when "other" colour is changed
    $('input[type="text"][name="background"]').keyup(function () {
        $('input[value="other"]').click();
        changeBackground();
    });

    // outline change
    $('input[type="text"][name="outline"]').keyup(function () {
        $('input[value="outline"]').prop("checked", true);
        changeEffects();
    });

    // glow change
    $('input[type="text"][name="glow"]').keyup(function () {
        $('input[value="glow"]').prop("checked", true);
        changeEffects();
    });

    // overlay change
    $('input[type="text"][name="overlay"]').keyup(function () {
        $('input[value="overlay"]').prop("checked", true);
        changeEffects();
    });
});

function switchPerson(cool) {
    'use strict';

    $('.switchButton').removeClass('active');
    $('#' + cool.name).addClass('active');

    $('#formattedText').fadeTo(500, 0.1, function () {
        currentPerson = cool;
        $('#CSSstyle').attr('href', '/css/' + cool.name + '.css');
        magic();

        $('#formattedText').fadeTo(750, 1);
    });
}

$(document).bind("keyup keydown", function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
        magic();
    }
});
