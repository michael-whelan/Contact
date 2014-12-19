var imgTitleScreen = new Image();
var imgLvlSelBack = new Image();
var imgLvlSel1 = new Image();
var imgLvlSelTut = new Image();
var imgBackArrow = new Image();
var imgMultiplayerBack = new Image();
var imgStashBack = new Image();
var imgArmoryBack = new Image();
var imgCustomBack = new Image();
var imgExitPrompt = new Image();


function Menu (){
	this.returnVals = ["null","null"]; //[state,scene]
	this.scene;
	this.scrollX = 0;
	this.lvl1X = 1152;
	this.lvlTutX=0;
	this.backX= 80;
    this.backY=15;
    this.backW = 50;
    this.backH=50;
    this.drawExit = false;
}

Menu.prototype.reset = function() {
	this.returnVals = ["null","null"]; //[state,scene]
	this.scene;
	this.scrollX = 0;
	this.lvl1X = 1152;
	this.lvlTutX=0;
    this.drawExit = false;
}

Menu.prototype.update = function() {
	if(this.returnVals[0] === "null"){
		return ["menu","titleScreen"];
	}
	if(this.returnVals[1] === "levelSelect"){
		this.updateScroll();
	}
	var temp = this.returnVals;
	//this.returnVals = ["null","null"];
	return temp;
}

//temp
Menu.prototype.mouseDown= function(e){
	if(this.scene=== "titleScreen"){
		console.log(e.clientX ,e.clientY);
		if(this.drawExit){
			if(e.clientX >  350  && e.clientX <585&&e.clientY>330&&e.clientY<400){//770,190,955,375
				console.log("Exit");
				window.close();
			}
			else if(e.clientX >  600  && e.clientX <825&&e.clientY>330&&e.clientY<400){//770,190,955,375
				this.drawExit = false;
			}
		}
		else {
			if(e.clientX >  860  && e.clientX <1075&&e.clientY>160&&e.clientY<315){//770,190,955,375
				this.returnVals = ["menu","levelSelect"];
			}
			else if(e.clientX >  820  && e.clientX <1100&&e.clientY>350&&e.clientY<410){//770,190,955,375
				this.returnVals = ["menu","multiplayer"];
			}
			else if(e.clientX >  820  && e.clientX <1100&&e.clientY>450&&e.clientY<510){//770,190,955,375
				this.returnVals = ["menu","stash"];
			}
			else if(e.clientX >  820  && e.clientX <1100&&e.clientY>550&&e.clientY<610){//770,190,955,375
				//Exit
				console.log("Exit");
				this.drawExit = true;
			}
		}
	}
	else if(this.scene=== "levelSelect"){
		console.log(e.clientX ,e.clientY);
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
		}
		else if(e.clientX >  this.lvl1X+300  && e.clientX <this.lvl1X+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.returnVals = ["gameplay","level1"];
		}
		else if(e.clientX >  this.lvlTutX+300  && e.clientX <this.lvlTutX+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.returnVals = ["gameplay","tutorial"];
		}
		else if(e.clientX < 300){
			//scroll left
			console.log("scrollX");
			this.scrollX += 1152;
		}	
		else if(e.clientX > 700){
			//scroll right
			this.scrollX -=1152;
		}
	}
	else if(this.scene ==="multiplayer"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
		}
	}
	else if(this.scene ==="stash"){
		console.log(e.clientX ,e.clientY);
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
		}
		else if(e.clientX > 70  && e.clientX <580&&e.clientY>75&&e.clientY<630){
			console.log("custom");
			this.returnVals = ["menu","custom"];	

		}
		else if(e.clientX > 630  && e.clientX <1120&&e.clientY>75&&e.clientY<630){
			console.log("upgrade");
			this.returnVals = ["menu","armory"];
		}
	}
	else if(this.scene === "armory"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","stash"];
		}
	}
	else if(this.scene === "custom"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","stash"];
		}
	}
}
//end temp

Menu.prototype.updateScroll = function(){
	if(this.lvlTutX < this.scrollX){
		this.lvlTutX+=10;
		this.lvl1X+=10;
	}else if(this.lvlTutX > this.scrollX){
		this.lvlTutX-=10;
		this.lvl1X-=10;
	}
	if(this.lvlTutX<this.scrollX+8 &&this.lvlTutX>this.scrollX-8){
		this.lvlTutX=this.scrollX;
		//this.lvl1X-=10;
	}
}

Menu.prototype.touchMove= function(e){
	e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
		var touch = e.touches[i];
	}
}

Menu.prototype.touchStart = function(e){ 
	e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
		var touch = e.touches[i];
		if(touch.pageX >  860  && touchXScaled <1075&&touch.pageY>160&&touchYScaled<315){//860,160,1075,315
			this.lvlSel = true;
		}
	}
}

Menu.prototype.touchEnd = function(e){ 
	var touches = e.changedTouches;
	for (var i = 0; i < touches.length; ++i) {

	}
}

Menu.prototype.draw = function(scene){
	this.scene = scene;
	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	
	if(scene ==="titleScreen"){
		ctx.drawImage(imgTitleScreen, 0,0,1152,648);
		if(this.drawExit){
			ctx.drawImage(imgExitPrompt, 0,0,1152,648);
		}
	}
	else if(scene === "levelSelect"){
		ctx.drawImage(imgLvlSelBack, 0,0,1152,648);
		ctx.drawImage(imgLvlSel1, this.lvl1X,0,1152,648);
		ctx.drawImage(imgLvlSelTut,this.lvlTutX,0,1152,648);
	}
	else if(scene ==="multiplayer"){
		ctx.drawImage(imgMultiplayerBack, 0,0,1152,648);
	}
	else if(scene ==="stash"){
		ctx.drawImage(imgStashBack, 0,0,1152,648);
	}
	else if(scene ==="armory"){
		ctx.drawImage(imgArmoryBack, 0,0,1152,648);
	}
	else if(scene ==="custom"){
		ctx.drawImage(imgCustomBack, 0,0,1152,648);
	}
	if(scene !=="titleScreen"){
		ctx.drawImage(imgBackArrow, this.backX,this.backY,this.backW,this.backH);
	}
}