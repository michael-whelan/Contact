var TextDrawer=function(){
	//put each piece of text here. rename all you want it will need to be mentioned in the index too.
	var txtMenuTitle;
    var txtMenuTitle2;
    var txtPlayBtn;
    var txtEndTitle;
	//the name of score; for localization
	var txtScore;
    var txtScoreNum;
    var txtEndScore;
	var txtInstruct;
	var txtTime;
    var txtTimeNum;
	var txtHighscore;
    var txtHighscoreNum;
	var txtPlayAgain;
		
    //Instruction 
    var instruc1;
    var instruc2;
    var instruc2;
    //menu
};



TextDrawer.prototype.init = function(){
	  // Once window is loaded we set the configuration and default styles
   CT.config({
        canvas: canvas,
        context: ctx,
        fontFamily: "nn",
        fontSize: "20px",
        fontWeight: "normal",
        fontColor: "#000",
        lineHeight: "80"
    });
    CT.config({
        canvas: canvas,
        context: ctx,
        fontFamily: "osr",
        fontSize: "14px",
        fontWeight: "normal",
        fontColor: "#000",
        lineHeight: "80"
    });
    CT.config({
        canvas: canvas,
        context: ctx,
        fontFamily: "osr",
        fontSize: "32px",
        fontWeight: "normal",
        fontColor: "#000",
        lineHeight: "80"
    });
    
    /*
     * Definition of some style classes.
     */
     
    CT.defineClass("blue",{
        fontSize: "70px",
        fontColor: "#29a1f1",
        fontFamily: "nn",
        fontWeight: "normal",
        textShadow: "0px 2px 0px #1C6A9E"
    });

    CT.defineClass("yellow",{
        fontSize: "70px",
        fontColor: "#FFCC00",
        fontFamily: "nn",
        fontWeight: "bold",
        fontStyle: "normal",
        textShadow: "0px 2px 0px #336699"
    });
    
    CT.defineClass("score",{
        fontSize: "32px",
        fontColor: "#FFF",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "normal",
        textShadow: "0px 2px 0px #003366"
    });
    CT.defineClass("play-again",{
        fontSize: "32px",
        fontColor: "#FFF",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "normal",
        textShadow: "0px -2px 0px #003366"
    });

     CT.defineClass("instructions",{
        fontSize: "25px",
        fontColor: "#fff",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "normal",
        textShadow: "0px 2px 0px #660000"
    });
       CT.defineClass("white3",{
        fontSize: "30px",
        fontColor: "#FFF",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "normal",
        textShadow: "0px 2px 0px #660000"
    });

	var markupText01 = document.getElementById("txtMenuTitle").innerHTML;
    var markupTextPlayBtn = document.getElementById("txtPlayBtn").innerHTML;
	var markupText04 = document.getElementById("txtInstruct").innerHTML;
	var markupTextIns1 = document.getElementById("instructions01").innerHTML;
    var markupTextIns2 = document.getElementById("instructions02").innerHTML;
	var markupText02 = document.getElementById("txtScore").innerHTML;
	var markupText05 = document.getElementById("txtTime").innerHTML;
    var markupTextEndTit = document.getElementById("txtEnd").innerHTML;
    var markupTextEndScore = document.getElementById("txtFinalScore").innerHTML;
	var markupText06 = document.getElementById("txtHighscore").innerHTML;
	var markupText07 = document.getElementById("txtPlayAgain").innerHTML;
	
    txtMenuTitle = '<class="yellow">' + markupText01 + '</class>';
    txtPlayBtn = '<class="play-again">' + markupTextPlayBtn + '</class>';
	txtInstruct = '<class="yellow">' + markupText04 + '</class>';
	instruc1 = '<class="instructions">' + markupTextIns1 + '</class>';
    instruc2 = '<class="instructions">' + markupTextIns2 + '</class>';
	txtScore = '<class="white3">' + markupText02 + '</class>';
	txtTime = '<class="white3">' + markupText05 + '</class>';
	txtEndTitle = '<class="yellow">' + markupTextEndTit + '</class>';
    txtEndScore= '<class="white3">' + markupTextEndScore + '</class>';
	txtHighscore = '<class="white3">' + markupText06 + '</class>';
	txtPlayAgain = '<class="play-again">' + markupText07 + '</class>';
};

// This represents the Instructions Title
TextDrawer.prototype.drawInstruc =function (){
    CT.textAlign = 'center';
    CT.drawText({
        text:txtInstruct,
        x: canvas.width / 2,
        y: 95,
        boxWidth:800
    }); 
	CT.drawText({
        text:instruc1,
        x: canvas.width / 2,
        y: 165,
        boxWidth:800
    }); 
    CT.drawText({
        text:instruc2,
        x: canvas.width / 2,
        y: 200,
        boxWidth:800
    }); 
}

TextDrawer.prototype.textOnScreen=function(){
    var markupTextSCR = score.toString();
    var markupTextTime = gameTimer.toString();
	// These classes style the Score and Time Numerical values on screen
    txtScoreNum = '<class="white3">' + markupTextSCR + '</class>';
    txtTimeNum = '<class="white3">' + markupTextTime + '</class>';
    CT.textAlign = 'left';
	// This represents your score during the game
	CT.drawText({
    	text:txtScore+ txtScoreNum,
        x: canvas.width - canvas.width + 80,
    	y: 45
    });
	// This represents your time during the game
	CT.drawText({
    	text:txtTime+ txtTimeNum,
        x: canvas.width - canvas.width + 340,
    	y: 45
    });		
}

// This represents the main game Title
TextDrawer.prototype.drawMenu =function (){
CT.textAlign = 'center';
    CT.drawText({
        text:txtMenuTitle,
        x: canvas.width / 2,
        y: 90,
        boxWidth:800
    });

    CT.drawText({
      text:txtPlayBtn,
        x: canvas.width / 2,
        y: 530
    }); 
}


TextDrawer.prototype.drawEnd =function (){
    CT.textAlign = 'center';
    var markupTextHScr = highScore.toString(); 
    var markupTextSCR = score.toString();
    txtHighscoreNum = '<class="white3">' + markupTextHScr + '</class>';
    txtScoreNum = '<class="white3">' + markupTextSCR + '</class>';
    CT.drawText({
		text:txtEndTitle,
		x: canvas.width / 2,
		y: 100
	});
    CT.drawText({
		text:txtEndScore,
		x: canvas.width / 2,
		y: 230
	});
	CT.drawText({
		text:txtScoreNum,
		x: canvas.width / 2,
		y: 280
	});
    CT.drawText({
		text:txtHighscore,
		x: canvas.width / 2,
		y: 330
    });
	CT.drawText({
		text:txtHighscoreNum,
		x: canvas.width / 2,
		y: 380
    }); 
	CT.drawText({
      text:txtPlayAgain,
        x: canvas.width / 2,
        y: 530
    }); 
}
