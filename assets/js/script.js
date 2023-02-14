$(document).ready(function() {

var temp = JSON.parse(localStorage.getItem("Superhero")) || [];


function getSearchHistory() {
    
    // get user input to form
    var userInput = $('.form-input').val().trim();
    
    // convert user entry to start with uppercase and push to array
    var capInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
    temp.push(capInput);

    // store in local storage
    localStorage.setItem('Superhero', JSON.stringify(temp));

    //query URL to get SH name and image and display search items on page
    var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";

    $.ajax({
    url: queryURL + userInput,
    method: "GET"
    }).then(function(response) {
    var superheroName = response.results[0].name;
    var superheroImage = response.results[0].image.url;

    
    var div = $('<div>');
    var h4 = $('<h4>');
    var picture = $('<img>');
    var url = $('<a>');

    // div.addClass('col searched');
    h4.text(superheroName);
    h4.addClass('col searched');
        
    picture.addClass('btn history-button searched');
    picture.attr('data-value', userInput);
    theSuperhero = picture.attr('data-value');
    picture.attr('src', superheroImage);

    url.attr('href', queryURL + theSuperhero);

    picture.append(url);
    h4.append(picture);
    // div.append(picture);

    $('#search-history').text('Your recent search history')
    $('#recent-search').append(h4);


    })

}


$('#search-form').on('submit', function(event) {
    event.preventDefault();

    var userInput = $('.form-input').val().trim();
    if (!userInput) {
        $('#alert-modal').modal('show');
        return;
    }

    $('#superhero-modal').modal('show')

    // call function
    getSearchHistory();

    //clear form input field after click/submit
    $('.form-input').val('');
})


function displayHistory() {

    for (i = 0; i < temp.length; i++) {
        shName = temp[i];
    var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";

$.ajax({
      url: queryURL + shName,
      method: "GET"
    }).then(function(response) {
        var nameLink = response.results[0].name;
        var imgLink = response.results[0].image.url;

    // var div = $('div');
    var h4 = $('<h4>');
    var img = $('<img>');
    var link = $('<a>');

    // div.addClass('col searched')
    h4.text(nameLink);
    h4.addClass('col searched');
        
    img.addClass('btn history-button searched');
    img.attr('data-value', shName);
    theSuperhero = img.attr('data-value');
    img.attr('src', imgLink);

    link.attr('href', queryURL + theSuperhero);

    img.append(link);
    h4.append(img);
    // div.append(img);

    $('#search-history').text('Your recent search history')
    $('#recent-search').append(h4);

    });
    }
}
displayHistory();

$(document).on('click', '.history-button', function() {
    // console.log('this happened!');

    clearForm();

    $('#superhero-modal').modal('show')

    // $('.find-movies').attr('src', '#');
    
    var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";
    theSuperhero = $('.history-button').attr('data-value');
    $('a').attr('href', queryURL + theSuperhero);

    $.ajax({
        url: queryURL + theSuperhero,
        method: "GET"
        }).then(function(response) {
        var theName = response.results[0].name;
        var image = response.results[0].image.url;
        var fullName = response.results[0].biography['full-name'];
        var alterEgos = response.results[0].biography['alter-egos'];
        var aliases = response.results[0].biography.aliases;
        var birthPlace = response.results[0].biography['place-of-birth'];
        var fAppearance = response.results[0].biography['first-appearance'];
        var affiliation = response.results[0].connections['group-affiliation'];
        var relatives = response.results[0].connections.relatives;

        console.log(theSuperhero);
        console.log(fullName, birthPlace, alterEgos, affiliation);

        $('.rounded-start').attr('src', image);
        // var h5 = $('superhero-name');
        // h5.attr('data-name', theSuperhero);

        ($('.superhero-name').attr('data-name', theSuperhero)).text(theName);

        var li = $('<li>');
        li.addClass('list-group-item');

        li.text('Full name: ' + fullName);
        li.text("Alter egos: " + alterEgos);
        li.text("Aliases: " + aliases);
        li.text("Place of birth: " + birthPlace);
        li.text("First appearance: " + fAppearance);
        li.text("Group affiliation: " + affiliation);
        li.text("Relatives: " + relatives);


        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Full name: " + "</td><td>" + fullName + "</td></tr>");
        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Alter egos: " + "</td><td>" + alterEgos + "</td></tr>");
        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Place of birth: " + "</td><td>" + birthPlace + "</td></tr>");
        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "First appearance: " + "</td><td>" + fAppearance + "</td></tr>");
        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Group affiliation: " + "</td><td>" + affiliation + "</td></tr>");
        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Aliases: " + "</td><td>" + aliases + "</td></tr>");
        // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Relatives: " + "</td><td>" + relatives + "</td></tr>");

        $('.list-group').append(li);
})

});


function findMovies() {
    var heroName = $('.superhero-name').attr('data-name');
    var queryURL = 'https://imdb-api.com/en/API/SearchTitle/k_eh717r40/';
    $.ajax({
    url: queryURL + heroName,
    method: 'GET'
    }).then(function(response) {
        response.results.forEach((element, index, array) => {
            var movieTitle = element.title;
            var description = element.description;
            var poster = element.image;
        
    console.log(movieTitle);
    console.log(description);
    console.log(poster);

    var h4 = ($('<h4>').addClass('movie-title'));
    var para = ($('<p>').addClass('movie-description'));
    var photo = ($('<img>').addClass('movie-poster'));
    var div = $('<div>');

    $('.movie-list-head').text('Movie list for ' + heroName);
    $('.movie-list-head').append(div);

    h4.text('Movie title: ' + movieTitle);
    para.text('Description: ' + description);
    photo.attr('src', poster);

    div.append(h4);
    div.append(para);
    div.append(photo)
})

})
}


$('.find-movies').on('click', function() {
    $('section.py-5.container.my-5').hide();
    $('.featured-superheroes').hide();
    $('.searched-superheroes').hide();
    $('#superhero-modal').hide();
    $('#movie-list').show();
    
    findMovies();

})

function clearForm() {
    $('.rounded-start').empty();
    $('.superhero-name').empty();
    $('.list-group').empty();
}

});