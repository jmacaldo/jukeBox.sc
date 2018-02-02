$( document ).ready(function() {

var track =[]
class Jukebox {
  constructor(){
    SC.initialize({client_id: 'SUPPLY SC API KEY HERE'});
    console.log('init fired!');
  }

  search(e){
    var query = $('#search').val();
    SC.get('/tracks', {
      q: query,
    }).then(function(res) {
      track.push(res[0])
      $(".well").slideDown("fast", function() {
        $("#stop").slideDown("fast");
        $("#play").slideDown("fast");
        if (track[0].artwork_url == null) {
          track[0].artwork_url = "imgs/doge.jpg"
        } ;
        $("#art").html("<img src='"+track[0].artwork_url+"'/>");
        $("#htmlTitle").html("<p>"+track[0].title+"</p></br>");
        $("#username").html("<p>Username: "+track[0].user.username+"</p></br>");
        $("#genre").html("<p>Album: "+track[0].genre+"</p></br>");
        $("#url").html("<a href="+track[0].permalink_url+">Link to SoundCloud</a>");
      })
    })
  }


  play(){
    SC.stream("/tracks/"+track[0].id).then(function(player){
      player.play();
      $("#stop").on("click", function(){
         player.pause();
      })
    })
  }



}

function start(){
  var scInst = new Jukebox;

  $("#submit").on("click", function(e) {
    scInst.search(e);
  })

  $("#play").on("click", function(){
    scInst.play();
  })


}

start()

}); //document ready closing tag!
