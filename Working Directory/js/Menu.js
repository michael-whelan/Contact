var imgTitleScreen = new Image();


function Menu (){
	
}

Menu.prototype.update = function() {

	return "menu";
}

Menu.prototype.draw = function(){
	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(imgTitleScreen, 0,0,512,384);
}