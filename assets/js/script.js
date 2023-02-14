//function to pull image based off id and then randomise---------------------
let featuredCard = $("#featured-cards");

//fetches image and name information
function getImageName() {

    //generates random number for id
    function getRandomNumber() {
        return Math.floor(Math.random() * 731) + 1;
      }
    
    let randomID = getRandomNumber();
    
    console.log(randomID);
    
    const apiKey = "10160292594515991";
    const newUrl = "https://superheroapi.com/api.php/" + apiKey + "/" + randomID;
    
fetch(newUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.name);
    console.log(data.image.url);

    let featuredCardNew = $("<div>");
    featuredCardNew.addClass("col-3 featured");
    featuredCard.append(featuredCardNew);

    let heroName = $("<p>").text(data.name);
    let heroImageUrl = data.image.url;
    let heroImage = $("<img>");
    heroImage.attr("src", heroImageUrl);
    heroImage.addClass("featured-image");
    featuredCardNew.append(heroName,heroImage);
    
  })
  .catch(function (error) {
    console.log(error);
    console.log("Error occurred!");
  });



// Jquery version---------------------------------------------------------------------
// $.ajax({
//   type: "GET",
//   url: newUrl,
//   dataType: "json",
//   success: function(data) {
//     console.log(data);
//     console.log(data.name);
//     console.log(data.image.url);

//     let featuredCardNew = $("<div>");
//     featuredCardNew.addClass("col-3 featured");
//     featuredCard.append(featuredCardNew);

//     let heroName = $("<p>").text(data.name);
//     let heroImageUrl = data.image.url;
//     let heroImage = $("<img>");
//     heroImage.attr("src", heroImageUrl);
//     heroImage.addClass("featured-image");
//     featuredCardNew.append(heroName,heroImage);
//   },
//   error: function(error) {
//     console.log(error);
//     console.log("Error occurred!");
//   }
// });
//---------------------------------------------------------------------------------------



}

for (let i = 0; i < 4; i++){
    getImageName()
};





//Chukwudi's code
// var temp = JSON.parse(localStorage.getItem("Superhero")) || [];

// function getSearchHistory() {
    
//     // get user input to form
//     var userInput = $('.form-input').val().trim();
    
//     // convert user entry to start with uppercase and push to array
//     var capInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
//     temp.push(capInput);

//     // store in local storage
//     localStorage.setItem('Superhero', JSON.stringify(temp));

//     //query URL to get SH name and image and display search items on page
//     var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";

//     $.ajax({
//     url: queryURL + userInput,
//     method: "GET"
//     }).then(function(response) {
//     var superheroName = response.results[0].name;
//     var superheroImage = response.results[0].image.url;

//     var h4 = $('<h4>');
//     var img = $('<img>');
//     var a = $('<a>');

//     h4.text(superheroName);
//     h4.addClass('col btn searched');
        
//     img.addClass('btn history-button searched img-thumbnail');
//     img.attr('data-value', userInput);
//     img.attr('data-bs-toggle', 'modal');
//     img.attr('data-bs-target', '#superhero-modal');
//     theSuperhero = img.attr('data-value');
//     img.attr('src', superheroImage);

//     a.attr('href', queryURL + theSuperhero);

//     img.append(a);
//     h4.append(img);

//     $('#search-history').text('Your recent search history')
//     $('#recent-search').append(h4);


//     })

// }

// $('#search-button').on('click', function(event) {
//     event.preventDefault();

//     var userInput = $('.form-input').val().trim();
//     if (!userInput) {
//         // alert('Please enter a superhero to search for.');
//         $('#alert-modal');
//     }

//     // call function
//     getSearchHistory();

//     //clear form input field after click/submit
//     $('.form-input').val('');
// })

// $('.history-button').on('click', function() {
    
//     var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";
//     theSuperhero = $('img').attr('data-value');
//     $('a').attr('href', queryURL + theSuperhero);
//     alert('This was clicked!');
      
// })

// function displayHistory() {
//     for (i = 0; i < temp.length; i++) {
//         shName = temp[i];
//     var queryURL = "https://superheroapi.com/api.php/10160292594515991/search/";

// $.ajax({
//       url: queryURL + shName,
//       method: "GET"
//     }).then(function(response) {
//         var nameLink = response.results[0].name;
//         var imgLink = response.results[0].image.url;

//     var h4 = $('<h4>');
//     var img = $('<img>');
//     var a = $('<a>');

//     h4.text(nameLink);
//     h4.addClass('col btn searched');
        
//     img.addClass('btn history-button searched img-thumbnail');
//     img.attr('data-value', shName);
//     img.attr('data-bs-toggle', 'modal');
//     img.attr('data-bs-target', '#superhero-modal');
//     theSuperhero = img.attr('data-value');
//     img.attr('src', imgLink);

//     a.attr('href', queryURL + theSuperhero);

//     img.append(a);
//     h4.append(img);

//     $('#search-history').text('Your recent search history')
//     $('#recent-search').append(h4);

//     });
//     }
// }
// displayHistory();