  var playing = false;
  var step;
  var score;
  var trailsleft;
  var action;//use for the setInterval
  var fruits = ["apple","banana","cherries","grapes","mango","orange","peach","pear","watermelon"];
  //click on start reset button 
  $(function(){
  $("#startreset").click(function(){
      //are we playing?
      if(playing){
          //yes
          //reload page
          location.reload();
      }
      else{
          //no 
          playing = true;
          //changes button text to reset game
          $("#startreset").html("Reset Game");
          //set score to zero
          score = 0;
          $("#scorevalue").html(score);
          //show trails left
          $("#trailsleft").show();
          //hide game over box
          $("#gameOver").hide();
          trailsleft = 3;
          addHearts();
          startAction();
      }
  });

//slice a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);//update score
    //play sound
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    //stop fruit
    clearInterval(action);

    //explode fruit
    $("#fruit1").hide("explode", 500);

    //send new fruit
    setTimeout(startAction, 800);
});

    
    



//functions
function addHearts(){
    $("#trailsleft").empty();
    for(var i=0;i<trailsleft;i++){
        $("#trailsleft").append(' <img src="images/heart.png" class="life">' );
      }
};

function startAction(){
    $("#fruit1").show();
    //1.create a random fruit 
    chooseFruit();
    //random position
    $("#fruit1").css({'left' : Math.round(550*Math.random()),'top' : -50});
    //define a random step
    step = Math.round(5*Math.random())+1;

    //2.move fruit dawn one step every 10 ms
    action = setInterval(function(){
        //move fruit dawn one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        //if fruit too low?
        if($("#fruit1").position().top > $("#fruitContainer").height()){
            //any trails left?
            if(trailsleft > 1){
                $("#fruit1").show();
                //1.create a random fruit 
                chooseFruit();
                //random position
                $("#fruit1").css({'left' : Math.round(550*Math.random()),'top' : -50});
                //define a random step
                step = Math.round(5*Math.random())+1;
                //reduce trails left
                trailsleft--;
                //reduce hearts 
                addHearts();
            }
            else{
                //show game over, button text = startgame
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p></p>Your Score Is '+score+'</p>');
                $("#trailsleft").hide();
                stopAction();
            }
        }
    },10);
};

function chooseFruit(){
    var index = Math.round((fruits.length-1)*Math.random());
    $("#fruit1").attr('src','images/'+fruits[index]+'.png');
};

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
};
});