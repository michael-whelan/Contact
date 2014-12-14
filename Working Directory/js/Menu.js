var imgTitleScreen = new Image();
var imgLvlSelBack = new Image();
var imgLvlSel1 = new Image();
var imgLvlSelTut = new Image();
var imgBackArrow = new Image();

function Menu (){
	this.play=false;
	this.lvlSel = false;
	this.tut = false;
	this.scene;
	this.scrollX = 0;
	this.lvl1X = 1152;
	this.lvlTutX=0;
	this.allowScroll = false;
	this.goBack = false;

	this.backX= 80;
    this.backY=15;
    this.backW = 50;
    this.backH=50;
}

Menu.prototype.update = function() {
	if (this.play){
		this.play=false;
		this.lvlSel = false;
		return ["gameplay","level1"];
	}
	else if (this.tut){
		this.tut=false;
		this.lvlSel = false;
		return ["gameplay","tutorial"];
	}
	else if(this.lvlSel){
		this.updateScroll();
		if(this.goBack){
			return ["menu","titleScreen"];
		}
		return ["menu","levelSelect"];
	}
	return ["menu","titleScreen"];
}




//temp
Menu.prototype.mouseDown= function(e){
	if(this.scene=== "titleScreen"){
		if(e.clientX >  860  && e.clientX <1075&&e.clientY>160&&e.clientY<315){//770,190,955,375
			this.lvlSel = true;
		}
	}
	else if(this.scene=== "levelSelect"){
		console.log(e.clientX ,e.clientY);
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.goBack = true;
		}
		else if(e.clientX >  this.lvl1X+300  && e.clientX <this.lvl1X+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.play = true;
		}
		else if(e.clientX >  this.lvlTutX+300  && e.clientX <this.lvlTutX+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.tut = true;
		}
		else if(e.clientX < 300){
			//scroll left
			this.scrollX += 1152;
		}	
		else if(e.clientX > 700){
			//scroll right
			this.scrollX -=1152;
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
	}
	else if(scene === "levelSelect"){
		ctx.drawImage(imgLvlSelBack, 0,0,1152,648);
		ctx.drawImage(imgLvlSel1, this.lvl1X,0,1152,648);
		ctx.drawImage(imgLvlSelTut,this.lvlTutX,0,1152,648);
	}
	if(scene !=="titleScreen"){
		ctx.drawImage(imgBackArrow, this.backX,this.backY,this.backW,this.backH);
	}
}