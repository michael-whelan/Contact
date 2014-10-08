var TextManager=function(){
	//put each piece of text here. rename all you want it will need to be mentioned in the index too.
	var txtAmmo;
    var ammoInt;
    this.lowestFps = 100;
};



TextManager.prototype.init = function(){
	txtAmmo = document.getElementById("txtAmmo").innerHTML;
};

// This represents the Instructions Title
TextManager.prototype.drawInstruc =function (){

}


TextManager.prototype.controller = function(){
    if(numBullets>0){
        this.gameText();
    }
    else{
        ctx.strokeStyle = "#003300";
        ctx.font = '40px san-serif';
        ctx.textBaseline = 'bottom';
        //txtAmmo = txtAmmo + numBullets.toString();
        ctx.strokeText("R to Reload", 300, 100);
    }
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
ctx.strokeText(txtAmmo+ numBullets.toString(), 300, 100);
}

// This represents the main game Title
TextManager.prototype.drawMenu =function (){
}


TextManager.prototype.drawEnd =function (){
}
