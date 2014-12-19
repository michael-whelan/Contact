var imgHighlight = new Image();

var TextManager=function(){
	//put each piece of text here. rename all you want it will need to be mentioned in the index too.
	var strAmmo;
    var ammoInt;

    var strHealth;
    var iAmmo;
    this.lowestFps = 100;
    this.level;
    this.tutorialMsgNum = 0;
    this.check1 = false;
    this.check2 = false;
};

TextManager.prototype.init = function(){
	strAmmo = document.getElementById("txtAmmo").innerHTML;
    strHealth = document.getElementById("txtHealth").innerHTML;
};

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
        this.gameText();
    }
    else{
        ctx.strokeStyle = "#003300";
        ctx.font = '40px san-serif';
        ctx.textBaseline = 'bottom';
        //txtAmmo = txtAmmo + numBullets.toString();
        ctx.strokeText("R to Reload", 300, 100);
    }
     ctx.font = '40px san-serif';
    ctx.strokeText(strHealth+ player.health.toString()+"%", 30, 50);
        ctx.strokeStyle = "#003300";
        ctx.font = '40px san-serif';
        ctx.textBaseline = 'bottom';
        //txtAmmo = txtAmmo + numBullets.toString();
       // ctx.strokeText("fps: "+fps.toFixed(), 680, 150);
        if(fps<60){
           this.lowestFps = fps;
        }
        ctx.strokeText("fps: "+this.lowestFps.toFixed(), 680, 50);

}

TextManager.prototype.gameText=function(){
    ctx.strokeStyle = "#003300";
    ctx.font = '40px san-serif';
    ctx.textBaseline = 'bottom';
    //txtAmmo = txtAmmo + numBullets.toString();
    ctx.strokeText(strAmmo+ player.numBullets.toString(), 300, 100);

    if(this.level === "tutorial"){
        //this.controlTutorial();
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
