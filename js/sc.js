$( document ).ready(function() {

SC.initialize({
 client_id: 'ebe2d1362a92fc057ac484fcfb265049'
});
// ALL CODE GOES BELOW THIS LINE
$("#submit").click(function(){
    $(".well").slideDown("fast", function() {
     var query = $('#search').val();
        console.log(query);
    $("#stop").slideDown("fast");
     SC.get('/tracks', {
     q: query,}).then(function(tracks) {
//display fallback artwork if none is present in SC
     if (tracks[0].artwork_url == null) {
       tracks[0].artwork_url = "imgs/doge.jpg"
     } ;
     console.log(tracks);
     console.log(tracks[0].user.username); //username
     console.log(tracks[0].permalink_url);
     console.log(tracks[0].genre);
//display artist info and artwork. first song in the array is the one displayed/played
     $("#art").html("<img src='"+tracks[0].artwork_url+"'/>");
     $("#htmlTitle").html("<p>"+tracks[0].title+"</p></br>");
     $("#username").html("<p>Username: "+tracks[0].user.username+"</p></br>");
     $("#genre").html("<p>Album: "+tracks[0].genre+"</p></br>");
     $("#url").html("<a href="+tracks[0].permalink_url+">Link to SoundCloud</a>");
//begin streaming when artwork is clicked
     $("#art").click(function(){
       SC.stream("/tracks/"+tracks[0].id).then(function(player){
         player.play();
//stop button functionality
       $("#stop").click(function(){
         player.pause();
       });


          });




        }); //sc.stream
      }); //click function




   }); //search query callback closing tag

 }); //submit function closing tag


}); //document ready closing tag!
