//scripts.js
var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;

function setText(id,text){
    document.getElementById(id).innerHTML=text;
}
function show(id){
    document.getElementById(id).style.display="block";
}
function hide(id){
    document.getElementById(id).style.display="none";
}
document.getElementById("startreset").onclick =function(){
    
    if(playing == true){
        //game is on and u want to reset!
        playing=false;
        location.reload();
        
    }else{
        //game is off and u want to start
        playing = true;
        
        score=0;
        setText("scoreValue",score);
        show("timeremaining");
        timeremaining=60;
        setText("timeremainingvalue",timeremaining);
        
        this.innerHTML = "Reset Game";
        hide("gameover");
        startCountdown();
        generateQA();
    }
}
function startCountdown(){
    action=setInterval(function(){
        timeremaining -= 1;
        setText("timeremainingvalue",timeremaining);
        if(timeremaining<=0){
            stopCountdown();
            show("gameover");
            hide("correct");
            hide("wrong");
            playing=false;
            setText("startreset","start game");
            setText("gameover","<p> game over </p> <p> Your Score :"+score+"</p>");
        }
    },1000);
}

function stopCountdown(){
    clearInterval(action);
}

function generateQA(){
    var x = 1  + Math.round(9*Math.random());
    var y = 1  + Math.round(9*Math.random());
    correctAnswer = x * y;
    setText("question",x + " x " + y);
    
    var correctPosition = 1 + Math.round(3 * Math.random());
    setText("box"+correctPosition,correctAnswer);
    
    var answers = [correctAnswer];
//    fill other boxes with wrong answers
    for(i=1;i<5;i++){
        
        if(i != correctPosition){
            var wrongAnswer;
//            do{
//                wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9 * Math.random()));
//            }while(wrongAnswer!=correctAnswer);
            
            do{
                wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9 * Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1);
            setText("box"+i,wrongAnswer);
            answers.push(wrongAnswer);
        }
    }
}

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(correctAnswer == this.innerHTML){
                score++;
                setText("scoreValue",score);
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                },1000);
                
                generateQA();
            }else{
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                },1000);
                
            }
        }
    }
}
