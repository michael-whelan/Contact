var imgBack = new Image();
var imgTutorialBack = new Image();
var backTrack = new Audio();


function LevelManager (){
	this.currentLevel;
	this.cellWidth = 1000;
	this.cellHeight =650;
	this.cellArray = new Array();
	this.numCells=0;

}

LevelManager.prototype.update = function() {
	
}

LevelManager.prototype.setLevel = function(lvl){
	this.currentLevel = lvl;
		this.numCells = (2000/this.cellWidth) * (1300/this.cellHeight);
	//console.log("numcells = ", (2000/this.cellWidth), (1300/this.cellHeight));
	for(var i = 0; i < this.numCells; ++i){
		this.cellArray[i] = new Array();
	}
}

LevelManager.prototype.mapSetup = function(){
	if(this.currentLevel === "level1"){
		var x = -(300 + (mapWidth-1450));var y = -(200+mapHeight-845);
		var n = 0;
		for(var i = 0; i < (2000/this.cellWidth); i++){		
			for(var j = 0; j < (1300/this.cellHeight); j++){
				this.cellArray[n][0] =x+ i*this.cellWidth;
				this.cellArray[n][1] = y+j*this.cellHeight;
				//console.log(this.cellArray[n]);
				n++;
			}
		}
	}
}

LevelManager.prototype.getGridPos = function(x,y){
	var row=0, col=0;
	var n = 0;

	for(var i = 0; i < (2000/this.cellWidth); i++){		
		for(var j = 0; j < (1300/this.cellHeight); j++){
			//console.log(x,y, this.cellArray[n][0],this.cellArray[n][1],i,j);
			if(x > this.cellArray[n][0] && x < this.cellArray[n][0]+this.cellWidth &&
				y> this.cellArray[n][1] && y < this.cellArray[n][1]+this.cellHeight){
				col = i;
				row = j;
				return [col,row];
				break;
			}
			n++;
		}
	}
	return [col,row];
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
		/*for(var i = 0; i < this.numCells; ++i){
			ctx.drawImage(imgHighlight,this.cellArray[i][0],this.cellArray[i][1],this.cellWidth,this.cellHeight);
		}*/
	}
}

