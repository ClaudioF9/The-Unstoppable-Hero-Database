$(document).ready(function(){
  var apiKey = "10160292594515991";
  var apiUrl = "https://superheroapi.com/api.php/" + apiKey + "/search/";
  var queryUrl;
  var searchString='';
  $('#search-button').on('click',function(){
    $('#superhero-modal').modal('show');
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
    });
  });
})
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
    var searchUrl = "https://superheroapi.com/api.php/" + apiKey + "/search/";
    var clickUrl;
    var clickString='';
// Jquery version---------------------------------------------------------------------
$.ajax({
  type: "GET",
  url: newUrl,
  dataType: "json",
  success: function(data) {
    // console.log(data);
    // console.log(data.name);
    // console.log(data.image.url);
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
//---click API pull from Imran
$('#superhero-modal').modal('show');
    $('.list-group-item').empty();
    clickString=data.name;
    clickUrl= searchUrl + clickString;
    $.ajax({
      url: clickUrl,
      method: 'GET'
    }).then(function (response){
      let superHeroName=response.results[0].name;
      let heroName=$('.heroName');
      $(heroName).append('Full Name: ' + superHeroName);
      let superHeroAlias=response.results[0].biography.aliases;
      let heroAlias=$('.heroAliases');
      $(heroAlias).append('Aliases: ' + superHeroAlias)
      let superHeroBirth=response.results[0].biography['place-of-birth'];
      let heroBirth=$('.heroBirth');
      $(heroBirth).append('Place of Birth: ' + superHeroBirth);
      let superHeroRace=response.results[0].appearance.race;
      let heroRace=$('.heroRace');
      $(heroRace).append('Race: ' + superHeroRace);
      let superHeroAff=response.results[0].connections['group-affiliation'];
      let heroAff=$('.heroAff');
      $(heroAff).append('Group affiliation: ' + superHeroAff);
      let superHeroImg=response.results[0].image.url;
      let heroImg=$(".heroImg").attr("src", superHeroImg);
      $(heroImg).append(superHeroImg);
    });
//--
    // console.log(data.name);
    // console.log(typeof data.name);
    })
    featuredCardNew.append(heroName,heroImage);
  },
  error: function(error) {
    console.log(error);
    console.log("Error occurred!");
  }
});
}
//---------------------------------------------------------------------------------------
for (let i = 0; i < 4; i++){
    getImageName()
};
//End of featured code-------------------------------------------------------------------