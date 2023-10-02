var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence()
        started = true

    }

})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000);

        }
    }
    else {
        console.log("wrong")
        $("#level-title").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}



$(".btn").on("click", function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)

})



function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    // select button 

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)

}



function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

