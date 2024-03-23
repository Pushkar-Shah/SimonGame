//alert("Working");
var userClickedPattern = [];
var gamePattern =[];
var arr = ["red", "blue", "green", "yellow"];
console.log(gamePattern);
$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        soundplay(userChosenColour);
        animatePress(userChosenColour);
        checkanswer(userClickedPattern.length-1);
})

var started = false;
var start = 0;
$(document).keypress(function(event){
        if (!started){
                $("h1").text("Level "+start);
                nextSequence();
                started = true;
        }
});

function nextSequence(){
        start++;
        $("h1").text("Level "+start);
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = arr[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        soundplay(randomChosenColour);
        
        
        
}

function soundplay(press){
        var file = "sounds/"+press + ".mp3";
        var audio = new Audio(file);
        audio.play();
}

// animate press

function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function () {
                $("#"+currentColour).removeClass("pressed")}, 100);
}

// check answer ;

function checkanswer(currentLevel){
        if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
                console.log("success");
                if (userClickedPattern.length == gamePattern.length){
                        setTimeout(function(){
                                userClickedPattern = [];
                                nextSequence();         
                        }, 1000);               
                        
                }
        }else{
                console.log("wrong");
                soundplay("wrong");
                $("body").addClass("game-over");
                setTimeout(function(){
                        $("body").removeClass("game-over"); 
                },200);
                $("h1").text("Game Over!! Press any key to restart");
                startover();
        }
        
}
function startover(){
        started = false;
        userClickedPattern = [];
        gamePattern =[];
        start = 0;
}