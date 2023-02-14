//function to pull image based off id and then randomise---------------------
let featuredCard = $("#featured-cards");

//fetches image and name information
function getImageName() {

    //generates random number for id
    function getRandomNumber() {
        return Math.floor(Math.random() * 731) + 1;
      }
    
    let randomID = getRandomNumber();
    
    // console.log(randomID);
    
    const apiKey = "10160292594515991";
    const newUrl = "https://superheroapi.com/api.php/" + apiKey + "/" + randomID;


//using fetch----------------------------------------------------------------
// fetch(newUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     // console.log(data);
//     // console.log(data.name);
//     // console.log(data.image.url);

//     let featuredCardNew = $("<div>");
//     featuredCardNew.addClass("col-3 featured");
//     featuredCard.append(featuredCardNew);

//     let heroName = $("<p>").text(data.name);
//     let heroImageUrl = data.image.url;
//     let heroImage = $("<img>");
//     heroImage.attr("src", heroImageUrl);
//     heroImage.addClass("featured-image");
//     heroImage.data("FName",data.name);
//     heroImage.click(function(){
//         console.log(data.name);
//     })
//     featuredCardNew.append(heroName,heroImage);
    
//   })
//   .catch(function (error) {
//     console.log(error);
//     console.log("Error occurred!");
//   });




// Jquery version---------------------------------------------------------------------
$.ajax({
  type: "GET",
  url: newUrl,
  dataType: "json",
  success: function(data) {
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
       heroImage.data("FName",data.name);
       heroImage.click(function(){
    console.log(data.name);
    })
    featuredCardNew.append(heroName,heroImage);
  },
  error: function(error) {
    console.log(error);
    console.log("Error occurred!");
  }
});
//---------------------------------------------------------------------------------------


}

for (let i = 0; i < 4; i++){
    getImageName()
};









