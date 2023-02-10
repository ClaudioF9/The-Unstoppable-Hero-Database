var temp = JSON.parse(localStorage.getItem("Superhero")) || [];

$('#history-button').on('click', function(event) {
    event.preventDefault();

    alert('This was clicked!');
    
    // var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";
    // theSuperhero = $('img').attr('data-value');
    // $('a').attr('href', queryURL + theSuperhero);
    
      
})

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

    var h4 = $('<h4>');
    var img = $('<img>');
    var a = $('<a>');

    h4.text(superheroName);
    h4.addClass('col btn searched');
        
    img.addClass('btn history-button searched img-thumbnail');
    img.attr('data-value', userInput);
    img.attr('data-bs-toggle', 'modal');
    img.attr('id', 'history-button');
    img.attr('data-bs-target', '#superhero-modal');
    theSuperhero = img.attr('data-value');
    img.attr('src', superheroImage);

    a.attr('href', queryURL + theSuperhero);

    img.append(a);
    h4.append(img);

    $('#search-history').text('Your recent search history')
    $('#recent-search').append(h4);


    })

}


$('#search-form').on('submit', function(event) {
    event.preventDefault();

    var userInput = $('.form-input').val().trim();
    if (!userInput) {
        // alert('Please enter a superhero to search for.');
        $('#alert-modal');
    }

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

    var h4 = $('<h4>');
    var img = $('<img>');
    var a = $('<a>');

    h4.text(nameLink);
    h4.addClass('col btn searched');
        
    img.addClass('btn searched img-thumbnail');
    img.attr('data-value', shName);
    img.attr('data-bs-toggle', 'modal');
    img.attr('id', 'history-button');
    img.attr('data-bs-target', '#superhero-modal');
    theSuperhero = img.attr('data-value');
    img.attr('src', imgLink);

    a.attr('href', queryURL + theSuperhero);

    img.append(a);
    h4.append(img);

    $('#search-history').text('Your recent search history')
    $('#recent-search').append(h4);

    });
    }
}
displayHistory();