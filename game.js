var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).on("keydown",function (){
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true; 
  }
});


$(".btn").click(function(){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); 
  
})

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function() {
      nextSequence();
      }, 1000);

    }
  } else {
   console.log("wrong");
   var audio = new Audio("sounds/wrong.mp3");
  //  audio.play();
   playSound("wrong");
   $("h1").text("Game Over, Press Any Key to Restart");
 
   $("body").addClass("game-over");
   setTimeout(function() {
   $("body").removeClass("game-over");
   }, 200);

   startOver();

  }
 
 
}
 


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()* 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

   console.log(gamePattern);
  


   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   
   $("h1").text("Level " + level);
  //  console.log("Level " + level);
  

  level++;

}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
  $("." + currentColour).removeClass("pressed");
  }, 100);
}










