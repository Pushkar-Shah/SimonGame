
var list = ["green","red","yellow","blue"];
var userChosenColour = [];
var gamePattern = [];
// We have to figure out after keypress program starts.
var started = false;
var Level = 0;
// this work only for the first time key is pressed.. 
$(document).keypress(function(event){
        if (!started){
                $("h1").text("Level "+level);
                nextSequence();
                started = true;
        }

})
// now we need to record user input.. 
$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        soundplay(userChosenColour);
        animatePress(userChosenColour);
        checkanswer(userClickedPattern.length-1);
})

function nextSequence(){
        // here we have to increase Levels .. 
        level++;
        $("h1").text("Level "+ level);
        var random = Math.floor(Math.random()*4);
        var r_element = list[random];
        gamePattern.push(r_element);
        animatePress();
        soundplay();
        // button highlight..
        $("#"+r_element).fadeOut(100).fadeIn(100);
        // user press sound..
        soundplay(r_element);
}
function soundplay(r_element){
        var audioFile = "sounds/"+r_element+".mp3";
        var audio = new Audio(audioFile);
        audio.play();
}
function animatePress(r_element){
        $("#"+r_element).addClass("pressed");
        setTimeout(function(){
                $("#"+r_element).removeClass("pressed"); 
        },100);
}
// now we will check answer for each element user has clicked
function checkanswer(currentIndex){
        if (userClickedPattern[currentIndex] == gamePattern[currentIndex]){
                console.log("Success");
                // now we have to check here for if the enetered array was the last answer or other answer is still left;
                if (userClickedPattern.length == gamePattern.length){
                        setTimeout(function(){
                                // user pattern empty 
                                userClickedPattern = [];
                                nextSequence();
                        })
                }
        } // check for wrong answer if user entered answer is wrong than we reset everything and start from sratch.. 
        else{
                // we add a game over theme..
                console.log("Wrong");
                soundplay("wrong");
                $("body").addClass("game-over");
                setTimeout(function(){
                        $("body").removeClass("game-over"); 
                },200);
                $("h1").text("Game Over!! Press any key to restart");
                // now we need a start over function to reset everything...
                startOver();
        }

}
function startOver(){
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        started = false;
}