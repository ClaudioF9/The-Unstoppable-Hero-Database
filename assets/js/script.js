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
  });

  

  
  
  