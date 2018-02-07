var proteins = {};

$.getJSON('/Scripts/proteins.json', function (result) {
    proteins = result;
});

var upload = function () {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/api/Protein/AddMany',
        data: JSON.stringify(proteins)
    })
    .done(function () { alert("Success!") })
    .fail(function () { alert("Failure!") });
}