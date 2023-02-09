function saveHistory() {
    // create array to store user search history
    var searchHistory = [];

    // make first letter of user input upperCase for display
    var userInput = $('.form-input').val().trim();
    // var capInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);

    // make first letter of user input lowercase for data value/search
    // var lowInput = userInput.charAt(0).toLowerCase() + userInput.slice(1);

    // pass the user input to the start of the array
    searchHistory.push(userInput);

    var userInput = $('.form-input').val().trim();
    var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/" + userInput;

$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var superheroName = response.results[0].name;
        var superheroImage = response.results[0].image.url;
    

        // create column divs to hold/display the search results
        var div = $('<div>');
        var h4 = $('<h4>');
        var img = $('<img>');
        var a = $('<a>');

        h4.text(superheroName);

        img.addClass('col btn searched img-thumbnail');
        img.attr('data-value', userInput);
        img.attr('data-bs-toggle', 'modal');
        img.attr('data-bs-target', '#superhero-modal');
        theSuperhero = div.attr('data-value');
        img.attr('src', superheroImage);

        a.attr('href', queryURL + theSuperhero);

        img.append(a);
        h4.append(img);
        div.append(h4);
        
        console.log('data-value is ' + theSuperhero);
    
        // loop through array to get the contents and display
        for (i = 0; i < searchHistory.length; i++) {
        if (!userInput) {
            return;
        } else {
            $('search-history').text('Your recent search history')
            $('#recent-search').append(div);
        }
        console.log(searchHistory);
    }
    });


}


$('#search-button').on('click', function(event) {
    event.preventDefault();

    var userInput = $('.form-input').val().trim();
    if (!userInput) {
        alert('Please enter a superhero to search for.');
    }

    saveHistory();
    // buildQueryURL();

    $('.form-input').val('');
})

// function buildQueryURL() {
//     var userInput = $('.form-input').val().trim();
//     var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/" + userInput;

// $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//         var name = response.results[0].name;
//         var image = response.results[0].image.url;
//       console.log(name);
//       console.log(image);
//     });
// }