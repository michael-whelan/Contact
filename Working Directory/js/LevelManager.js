var imgBack = new Image();
var imgTutorialBack = new Image();
var backTrack = new Audio();


function LevelManager (){
	this.currentLevel;
}

LevelManager.prototype.update = function() {
	
}

LevelManager.prototype.setLevel = function(lvl){
	this.currentLevel = lvl;
}


LevelManager.prototype.tutorialController = function(){
}

LevelManager.prototype.getNextLevel = function(){
	if(this.currentLevel === "tutorial"){
		return "level1";
	}
	return this.currentLevel;
}

LevelManager.prototype.draw = function() {
	if(this.currentLevel ==="tutorial"){
		ctx.drawImage(imgTutorialBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);
	}
	else if(this.currentLevel === "level1"){
		ctx.drawImage(imgBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);
	}
}

