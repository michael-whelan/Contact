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
	if(e.clientX >  770  && e.clientX <955&&e.clientY>190&&e.clientY<375){//770,190,955,375
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
		if(touch.pageX >  770  && touchXScaled <955&&touch.pageY>190&&touchYScaled<375){//770,190,955,375
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
	ctx.drawImage(imgTitleScreen, 0,0,1024,768);
}