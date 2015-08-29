// windowload
$(window).load(function () {
    var colourDiv = $('#colours'),
        newhtml = ''


    colourDiv.empty();

    for (var i = 65; i <= 90; i++) {
        newhtml = $('<div></div>')

        newhtml.append('<p>' + String.fromCharCode(i + 32) + '<input type="text" class="basic"/></p>');
        newhtml.append('<p>' + String.fromCharCode(i) + '<input></input></p>');

        colourDiv.append(newhtml);
    }


    $(".basic").spectrum({
        preferredFormat: "hex",
        showInput: true,
        showButtons: false,
        allowEmpty: true
    });



});
