var imgHighlight = new Image();

var TextManager=function(){
	//put each piece of text here. rename all you want it will need to be mentioned in the index too.
	var strLoading;
    var strAmmo;
    var ammoInt;
    var strHealth;
    var iAmmo;
    var strBoss1;
    var strBoss2;

    this.flashTimer =0;
    this.clicker=0;
    this.lowestFps = 100;
    this.level;
    this.tutorialMsgNum = 0;
    this.check1 = false;
    this.check2 = false;

    var strPlayerDiedMessage;
    this.playerDied = false;//if a teammate has died this will allow a message to be drawn on screen
    this.deathMessageTimer = 0;
};

TextManager.prototype.init = function(){
    CT.config({
        canvas: canvas,
        context: ctx,
        fontFamily: "osr",
        fontSize: "32px",
        fontWeight: "normal",
        fontColor: "#000",
        lineHeight: "80"
    });

    //define style class
    CT.defineClass("whiteBig",{
        fontSize: "80px",
        fontColor: "#ffffff",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "normal",
        textShadow: "0px 2px 0px #660000"
    });
    CT.defineClass("whiteGame",{
        fontSize: "30px",
        fontColor: "#ffffff",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "normal",
        textShadow: "0px 2px 0px #660000"
    });
     CT.defineClass("warning",{
        fontSize: "40px",
        fontColor: "#f01717",
        fontFamily: "osr",
        fontWeight: "normal",
        fontStyle: "bold",
        //textShadow: "0px 2px 0px #ffffff"
    });
    
    var temp = document.getElementById("txtLoading").innerHTML;
	var temp2 = document.getElementById("txtAmmo").innerHTML;
    var temp3 = document.getElementById("txtHealth").innerHTML;
    var temp4 = document.getElementById("playerDeathMsg").innerHTML;
    var temp5 = document.getElementById("txtBoss1").innerHTML;
    var temp6 = document.getElementById("txtBoss2").innerHTML;



    strLoading = '<class="whiteBig">' + temp + '</class>';
    strAmmo = '<class="whiteGame">' + temp2 + '</class>';
    strHealth= '<class="whiteGame">' + temp3 + '</class>';
    strPlayerDiedMessage= '<class="whiteBig">' + temp4 + '</class>';
    strBoss1 =  '<class="warning">' + temp5 + '</class>';
    strBoss2 =  '<class="warning">' + temp6 + '</class>';
};

TextManager.prototype.reset = function(){
    this.playerDied = false;
    this.deathMessageTimer = 0;
}
TextManager.prototype.loading = function(){
    CT.textAlign = 'center';
    CT.drawText({
        text:strLoading,
        x: canvas.width / 2,
        y: canvas.height/2,
        boxWidth:800
    }); 
}
// This represents the Instructions Title
TextManager.prototype.drawInstruc =function (){

}
TextManager.prototype.end = function(txt){
    ctx.strokeStyle = "#003300";
    ctx.font = '40px san-serif';
    ctx.textBaseline = 'bottom';
    //txtAmmo = txtAmmo + numBullets.toString();
    ctx.strokeText("Swarms Survived: "+txt+". "+"Continue  Y/N", 300, 100);
}

TextManager.prototype.controller = function(level){
    this.level = level;
    if(player.numBullets>0){
        //this.gameText();
        var count=0;
        for(var j =0; j<3; j++){
        for(var i = 0; i < 10;i++){
            count++;
            if(count <= player.numBullets){
            ctx.drawImage(imgSquare,(8*i)+50,(j*15)+50,5,10);}
        }
    }
    }
    else{
        ctx.strokeStyle = "#003300";
        ctx.font = '40px san-serif';
        ctx.textBaseline = 'bottom';
        //txtAmmo = txtAmmo + numBullets.toString();
        ctx.strokeText("R to Reload", 300, 100);
    }
    var tempH = player.health.toString();
    tempH = '<class="whiteGame">' + tempH + '</class>';
    CT.textAlign = 'left';
    CT.drawText({
        text:strHealth+ tempH,
        x: 50,
        y: 20
    });
      if(enemyManager.boss1.alive){
            ctx.drawImage(imgHealthBar,550,50,enemyManager.boss1.health*1.5,20);
        }
 
    //txtAmmo = txtAmmo + numBullets.toString();
    //ctx.strokeText("fps: "+fps.toFixed(), 680, 150);
    /*if(fps<60){
        this.lowestFps = fps;
    }
    ctx.strokeText("fps: "+this.lowestFps.toFixed(), 680, 50);*/
}

TextManager.prototype.gameText=function(){
    var tempAmm = player.numBullets.toString();
    ammoInt = '<class="whiteGame">' + tempAmm + '</class>';
    CT.textAlign = 'left';
    CT.drawText({
        text:strAmmo+ ammoInt,
        x: 50,
        y: 50
    });
    if(this.playerDied){
        ctx.strokeText(strPlayerDiedMessage.toString(), 30, 120);
        this.deathMessageTimer++;

        if(this.deathMessageTimer>180){
            this.playerDied= false;
            this.deathMessageTimer =0;
        }
    }
}

TextManager.prototype.flashText = function(){
    this.flashTimer++;

    if(this.flashTimer<50){

    }
    else if(this.flashTimer<100){
        if(this.clicker <2){
            CT.textAlign = 'left';
            CT.drawText({
                text:strBoss1,
                x: 450,
                y: 50
            });
        }
        else if(this.clicker<4){
            CT.textAlign = 'left';
            CT.drawText({
                text:strBoss2,
                x: 450,
                y: 50
            });
        }
    }
    else{
        this.flashTimer =0;
        this.clicker+=1;
    }
}

TextManager.prototype.upTutorial = function(n){
    if(this.tutorialMsgNum ===n){
        this.tutorialMsgNum = n+1;
    }
}

TextManager.prototype.controlTutorial = function(player){
    ctx.strokeStyle = "#0041a0";
    ctx.font = '25px san-serif';
    if(this.tutorialMsgNum === 0){
        ctx.strokeText(document.getElementById("tutorialMsg1").innerHTML, 200, 300);
        ctx.strokeText(document.getElementById("tutorialMsg2").innerHTML, 200, 350);
        ctx.drawImage(imgHighlight, canvas.width/2,canvas.height/2,canvas.width/2,canvas.height/2);
    }
    else if(this.tutorialMsgNum === 1){
        ctx.strokeText(document.getElementById("tutorialMsg3").innerHTML, 200, 300);
        ctx.strokeText(document.getElementById("tutorialMsg4").innerHTML, 200, 350);
        ctx.drawImage(imgHighlight, 0, canvas.height/2, canvas.width/2, canvas.height/2);
    }
    else if(this.tutorialMsgNum === 2){
        ctx.strokeText(document.getElementById("tutorialMsg5").innerHTML, 200, 300);
        ctx.drawImage(imgHighlight,1075, 225, 100, 100);

    }
    if(this.tutorialMsgNum===3){
        levelWin = true;
        this.check1 = false;this.check2 = false;
        this.tutorialMsgNum =0;
    }

   /* if(this.tutorialMsgNum ===0){
        if(KeyController.isKeyDown(Key.RIGHT)){
            this.check1 = true;
        }
        else if(KeyController.isKeyDown(Key.LEFT)){
            this.check2 = true;
        }
    }

    else if(this.tutorialMsgNum ===1){
        if(KeyController.isKeyDown(Key.UP)){
            this.check1 = true;
        }
        else if(KeyController.isKeyDown(Key.DOWN)){
            this.check2 = true;
        }
    }
    else if(this.tutorialMsgNum ===2){
        if(KeyController.isKeyDown(Key.SPACE)){
            this.check1 = true; this.check2 = true;
        }
    }
    else if(this.tutorialMsgNum ===3){
        if(KeyController.isKeyDown(Key.R)){
            this.check1 = true; this.check2 = true;
        }
    }
    if(this.check1&& this.check2){
        this.tutorialMsgNum++;
        this.check1 = false;this.check2 = false;
    }*/
}

// This represents the main game Title
TextManager.prototype.drawMenu =function (){
}


TextManager.prototype.drawEnd =function (){
}
