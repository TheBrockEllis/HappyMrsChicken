//create global namespaced object to house all properties and methods
var App = window.App = {};

//pixels available in the x space
App.playable_x = 800;

//The playable space that the chicken can roam around on the y axis
App.playable_y = 250;

//How many seconds will the game last?
App.time = 3;

//How many points is a chicken worth
App.points = 1;

//Keep track of the score 
App.total_score = 0;

//Has this game been started yet?
App.started = 0;

App.MRS_CHICKEN_WIDTH = 121;
App.MRS_CHICKEN_HEIGHT = 119;

//Init our Happy Mrs. Chicken
App.mrschicken = new Image();
App.mrschicken.src = "img/mrschicken.png";
App.mrschicken.id = "mrschicken";
App.mrschicken.width = App.MRS_CHICKEN_WIDTH;
App.mrschicken.height = App.MRS_CHICKEN_HEIGHT;
document.getElementById("game").appendChild(App.mrschicken);

//array of Eggs
App.eggs = [];

//Initialize the game, event listeners and display start screen
App.init = function(){

    //add listening to the start button click
    $("#start").click(function(){
        App.game_start();        
    });
    
    $("body").on("keypress", function(e){
        if(App.started == 1){
            if(e.keyCode == 13){
                App.update_score(App.points);    
                App.move_chicken();
            }
        }
    });
       
    App.move_chicken();
     
}

//Start the game
 App.game_start = function(){
    //set the game to started
    App.started = 1;
    
    //reset the displayed score
    App.total_score = 0;
      
    App.toggle_elements();  
    App.update_score(); 
    App.start_timer();
    
 }

//Hide the start button and display timer and score boxes
App.toggle_elements = function(){
    $("#timer").toggle(); 
    $("#score").toggle(); 
    $("#start").toggle(); 
};

App.move_chicken = function(){
    //find playable area
    var x = 800 - App.MRS_CHICKEN_WIDTH;
    var y = 240 - App.MRS_CHICKEN_WIDTH;

    //calculate random x and y position
    x = Math.floor(Math.random() * x) + "px"; 
    y = 240 + Math.floor(Math.random() * y) + "px"; 

    
    console.log(x);
    console.log(y);
    //move image to that location

    console.log("Moving chicken");
    $("#mrschicken").css("top", y).css("left", x);    
};

//call this method every time the space bar is pressed
App.update_score = function(score){

    //if score is set, add it to the global score property    
    if (typeof score != "undefined") {
        App.total_score += score;
    }
    
    //update the score box
    $("#score").empty().text(App.total_score);
    
}

App.start_timer = function(){
    // set timer minutes and seconds, initialize variable to display timer as a string
    var time_left = App.time;

    // initially set the timer to the start time
    $("#timer").text(time_left);
    
    // update countdown clock every 1 second
    var countdown = setInterval(function(){
        //  decrement seconds
        if (time_left != 0) {
            time_left--;
        }
        
        // overwrite old timer with new timer string
        $("#timer").text(time_left);

        // if minutes and seconds are both zero, stop updating countdown and call attack function
        if (time_left == 0) {
            clearInterval(countdown);
            App.game_end();
        }
        
    }, 1000);
        
} //end start_timer

App.game_end = function(){
    //Game is no longer started
    App.started = 0;
    
    //Remove the score and timer from the screen and display button to play again
    App.toggle_elements();
    
    //check for high score here
    
    //Clear text from button and add event listener to restart game
    $("#start").empty().text("Play Again?");
}

$(document).ready(function(){
    App.init();
}); //end document ready

