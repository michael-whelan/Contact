var imgTitleScreen = new Image();


function Menu (){
	this.play=false;
}

Menu.prototype.update = function() {
	if (this.play){
		this.play=false;
		return "gameplay"
	}
	return "menu";
}


//temp
Menu.prototype.mouseDown= function(e){
	if(e.clientX >  860  && e.clientX <1075&&e.clientY>160&&e.clientY<315){//770,190,955,375
			this.play = true;
		}
}
//end temp

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
			this.play = true;
		}
	}
}

Menu.prototype.touchEnd = function(e){ 
	var touches = e.changedTouches;
	for (var i = 0; i < touches.length; ++i) {

	}
}
Menu.prototype.draw = function(){
	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(imgTitleScreen, 0,0,1152,648);
}