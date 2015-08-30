var colours = {};

function toggleSame(checkbox) {
    var inputSpectrum = $(checkbox).siblings('.spectrum');

    if (checkbox.checked) {
        var newStyle = $('<style class="tempStyle"></style>'),
            code = $(checkbox).attr("name");
        colours[code] = colours[$(checkbox).attr("data-lowercase")];
        newStyle.append('.col' + code + '{color: ' + colours[code] + '}');
        $('head').append(newStyle);


        inputSpectrum.spectrum("disable");
    } else {
        inputSpectrum.spectrum("enable");
    }
}

function createStyles() {
    var newStyle = $('<style class="mainStyle"></style>');

    for (var code in colours) {
        newStyle.append('.col' + code + '{color: ' + colours[code] + '}');
    }

    $('.mainStyle').replaceWith(newStyle);

    $('.tempStyle').remove();
}

function updateColour(picker, tinycolor) {
    var colour,
        code = picker.name,
        upperCheckbox = $('input[type=checkbox][data-lowercase=' + code + ']'),
        newStyle = $('<style class="tempStyle"></style>');

    try {
        colour = tinycolor.toHexString();
    } catch (err) {
        colour = "black";
    }

    colours[code] = colour;
    newStyle.append('.col' + code + '{color: ' + colours[code] + '}');

    if (upperCheckbox.is(':checked')){
        var upCode = upperCheckbox.attr("name")
        colours[upCode] = colour;
        newStyle.append('.col' + upCode + '{color: ' + colours[upCode] + '}');
    }

    $('head').append(newStyle);
}

// windowload
$(window).load(function () {
    var colourDiv = $('#colourContainer');

    colourDiv.empty();

    for (var i = 65; i <= 90; i++) {
        var newhtml = $('<div></div>'),
            lowerC = (i + 32).toString(),
            lower = String.fromCharCode(i + 32),
            upperC = i.toString(),
            upper = String.fromCharCode(i);

        newhtml.append('<p>' +
            '<span class="col' + lowerC + ' black">' + lower + '</span>' +
            '<span class="col' + lowerC + ' white">' + lower + '</span>' +
            '<input type="text" class="lowercase spectrum" name="' + lowerC + '" ' + ((lowerC in colours) ? 'value="' + colours[lowerC] + '"' : '') + '/>' +
            '</p>');

        newhtml.append('<p>' +
            '<span class="col' + upperC + ' black">' + upper + '</span>' +
            '<span class="col' + upperC + ' white">' + upper + '</span>' +
            '<input type="text" class="uppercase spectrum" name="' + upperC + '" ' + ((upperC in colours) ? 'value="' + colours[upperC] + '"' : '') + '/>' +
            '<input type="checkbox" checked="true" onclick="toggleSame(this);" name="' + upperC + '" data-lowercase="' + lowerC + '"/>Same as lowercase' +
            '</p>');

        colourDiv.append(newhtml);
    }

    $(".spectrum").spectrum({
        preferredFormat: "hex",
        showInput: true,
        allowEmpty: true,
        change: function (tinycolor) {
            updateColour(this, tinycolor);
        }
    });


    $(".uppercase").spectrum({
        preferredFormat: "hex",
        showInput: true,
        allowEmpty: true,
        disabled: true,
        change: function (tinycolor) {
            updateColour(this, tinycolor);
        }
    });

    createStyles();

});
