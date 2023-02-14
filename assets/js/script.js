$(document).ready(function() {

var temp = JSON.parse(localStorage.getItem("Superhero")) || [];


// $('#search-button').on('click', function(event) {
//     event.preventDefault();

//     var userInput = $('.form-input').val().trim();
//     if (!userInput) {
//         $('#alert-modal').modal('show');
//         return;
//     }

//     $('#superhero-modal').modal('show')

//     // call function
//     getSearchHistory();

//     //clear form input field after click/submit
//     $('.form-input').val('');
// })


$('#search-button').on('click',function(){

    getSearchHistory();

    var userInput = $('.form-input').val().trim();
    if (!userInput) {
        $('#alert-modal').modal('show');
        return;
    } else ($('#superhero-modal').modal('show'));

    var apiKey = "10160292594515991";
    var apiUrl = "https://superheroapi.com/api.php/" + apiKey + "/search/";
    var queryUrl;
    var searchString='';

      
      $('.list-group-item').empty();
      searchString=$('.form-input').val();
      queryUrl=apiUrl+ searchString;
      // console.log('query:',queryUrl);
  
      $.ajax({
        url: queryUrl,
        method: 'GET'
      }).then(function (response){
        var superHeroName=response.results[0].name;
        
        // console.log(superHeroName);
        
        var heroName=$('.heroName');
      
        $(heroName).append('Full Name: ' + superHeroName);

        $('.find-movies').attr('data-value', superHeroName)

        var superHeroAlias=response.results[0].biography.aliases;
        
        // console.log(superHeroAlias);
        
        var heroAlias=$('.heroAliases');

        $(heroAlias).append('Aliases: ' +superHeroAlias)

        var superHeroBirth=response.results[0].biography['place-of-birth'];
        
        // console.log(superHeroBirth);
        
        var heroBirth=$('.heroBirth');
      
        $(heroBirth).append('Place of Birth: ' +superHeroBirth);

        var superHeroRace=response.results[0].appearance.race;
        // console.log(superHeroRace);

        var heroRace=$('.heroRace');

        $(heroRace).append('Race: ' + superHeroRace);

        var superHeroAff=response.results[0].connections['group-affiliation'];
        // console.log(superHeroAff);

        var heroAff=$('.heroAff');

        $(heroAff).append('Group affiliation: ' + superHeroAff);

        var superHeroImg=response.results[0].image.url;
        
        var heroImg=$(".heroImg").attr("src", superHeroImg);

        $(heroImg).append(superHeroImg);

        $('.form-input').val('');
        

      });
    });


function getSearchHistory() {
    
    // get user input to form
    var searchString = $('.form-input').val().trim();
    
    // convert user entry to start with uppercase and push to array
    var capInput = searchString.charAt(0).toUpperCase() + searchString.slice(1);
    temp.push(capInput);

    // store in local storage
    localStorage.setItem('Superhero', JSON.stringify(temp));

    //query URL to get SH name and image and display search items on page
    var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";

    $.ajax({
    url: queryURL + searchString,
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
    picture.attr('data-value', superheroName);
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



function displayHistory() {

    // temp.forEach(theHeroName => {
    //     shName = theHeroName;
    //     return;
    // }) 
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
    img.attr('data-value', nameLink);
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

// $(document).on('click', '.history-button', function() {
//     // console.log('this happened!');

//     clearForm();

//     $('#superhero-modal').modal('show')

//     // $('.find-movies').attr('src', '#');
    
//     var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";
//     theSuperhero = $('.history-button').attr('data-value');
//     $('a').attr('href', queryURL + theSuperhero);

//     $.ajax({
//         url: queryURL + theSuperhero,
//         method: "GET"
//         }).then(function(response) {
//         var theName = response.results[0].name;
//         var image = response.results[0].image.url;
//         var fullName = response.results[0].biography['full-name'];
//         var alterEgos = response.results[0].biography['alter-egos'];
//         var aliases = response.results[0].biography.aliases;
//         var birthPlace = response.results[0].biography['place-of-birth'];
//         var fAppearance = response.results[0].biography['first-appearance'];
//         var affiliation = response.results[0].connections['group-affiliation'];
//         var relatives = response.results[0].connections.relatives;

//         console.log(theSuperhero);
//         console.log(fullName, birthPlace, alterEgos, affiliation);

//         $('.rounded-start').attr('src', image);
//         // var h5 = $('superhero-name');
//         // h5.attr('data-name', theSuperhero);

//         ($('.superhero-name').attr('data-name', theSuperhero)).text(theName);

//         var li = $('<li>');
//         li.addClass('list-group-item');

//         li.text('Full name: ' + fullName);
//         li.text("Alter egos: " + alterEgos);
//         li.text("Aliases: " + aliases);
//         li.text("Place of birth: " + birthPlace);
//         li.text("First appearance: " + fAppearance);
//         li.text("Group affiliation: " + affiliation);
//         li.text("Relatives: " + relatives);


//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Full name: " + "</td><td>" + fullName + "</td></tr>");
//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Alter egos: " + "</td><td>" + alterEgos + "</td></tr>");
//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Place of birth: " + "</td><td>" + birthPlace + "</td></tr>");
//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "First appearance: " + "</td><td>" + fAppearance + "</td></tr>");
//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Group affiliation: " + "</td><td>" + affiliation + "</td></tr>");
//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Aliases: " + "</td><td>" + aliases + "</td></tr>");
//         // $('.list-group').append("<tr><td class='row-title list-group-item' >" + "Relatives: " + "</td><td>" + relatives + "</td></tr>");

//         $('.list-group').append(li);
// })

// });
// });


$(document).on('click', '.history-button', function() {

    searchString = $(this).attr('data-value');
    
    var apiKey = "10160292594515991";
    var apiUrl = "https://superheroapi.com/api.php/" + apiKey + "/search/";
    var queryUrl;

    console.log('the superhero is: ' + searchString);
  
    $('#superhero-modal').modal('show');
    $('.find-movies').attr('data-value', searchString)
  
    // $('#search-button').on('click',function(){

      queryUrl = apiUrl + searchString;
  
      $.ajax({
        url: queryUrl,
        method: 'GET'
      }).then(function (response){

        var superHeroName=response.results[0].name;
        var heroName=$('.heroName');
        $(heroName).append('Full Name: ' + superHeroName);

        var superHeroAlias=response.results[0].biography.aliases;
        var heroAlias=$('.heroAliases');
        $(heroAlias).append('Aliases: ' +superHeroAlias)

        var superHeroBirth=response.results[0].biography['place-of-birth'];
        var heroBirth=$('.heroBirth');
        $(heroBirth).append('Place of Birth: ' +superHeroBirth);

        var superHeroRace=response.results[0].appearance.race;
        var heroRace=$('.heroRace');
        $(heroRace).append('Race: ' + superHeroRace);

        var superHeroAff=response.results[0].connections['group-affiliation'];
        var heroAff=$('.heroAff');
        $(heroAff).append('Group affiliation: ' + superHeroAff);

        var superHeroImg=response.results[0].image.url;
        var heroImg=$(".heroImg").attr("src", superHeroImg);
        $(heroImg).append(superHeroImg);

      });
    // });

    clearForm();

})

function searchMovies() {

    var searchString = $('.find-movies').data('value');
    console.log('pre ajax: ' + searchString);
    var queryURL = 'https://imdb-api.com/en/API/SearchTitle/k_eh717r40/';

    $.ajax({
    url: queryURL + searchString,
    method: 'GET'
    }).then(function(response) {
        response.results.forEach((element, index, array) => {
            var movieTitle = element.title;
            var description = element.description;
            var poster = element.image;
        
    // console.log(movieTitle);
    // console.log(description);
    // console.log(poster);
    // console.log('inside ajax: ' + searchString);

    var h4 = ($('<h4>').addClass('movie-title'));
    var para = ($('<p>').addClass('movie-description'));
    var photo = ($('<img>').addClass('movie-poster'));
    var div = $('<div>');

    $('.movie-list-head').text('Movie list for ' + searchString);
    $('.movie-list').append(div);

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
    
    searchMovies();

})

function clearForm() {
    $('.rounded-start').empty();
    $('.superhero-name').empty();
    $('.list-group-item').empty();
}


});