var imgBack = new Image();
var imgTutorialBack = new Image();
var backTrack = new Audio();


function LevelManager (){
	this.currentLevel;
	this.cellWidth = 500;
	this.cellHeight =325;
	this.cellArray = new Array();
	this.numCells=0;
	this.objects = new Array();
	this.placeLevels();
}

LevelManager.prototype.placeLevels = function(){
	this.level1 = 
		[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
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
	this.object = [];
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
		/*
		1 = square object
		2 = circle object
		*/

		for(var i = 0; i < 13; ++i){
			for(var j = 0; j < 20; ++j){
				if(this.level1[i][j] === 1){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,100,100,"square");
				//	object.gridPos=this.getGridPos((100*j)-845,(100*i)-652,100,100);
					this.objects.push(object);
				}
				if(this.level1[i][j] === 2){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,100,100,"circle");
				//	object.gridPos=this.getGridPos((100*j)-845,(100*i)-652,100,100);
					this.objects.push(object);
				}
			}
		}
		console.log(lvlManager.objects.length);
	}
}
/*
LevelManager.prototype.getGridPos = function(x,y,w,h){
	var tempArr = [];
	for(var i =0; i<this.numcells; ++i){
		if((x < this.cellArray[i][0]+ this.cellWidth) &&
	    (x + w > this.cellArray[i][0]) &&
	    (y + h > this.cellArray[i][1]) &&
	    (y < this.cellArray[i][1] + this.cellWidth)){
			tempArr.push(i);
	    }
    }
    return tempArr;
}*/

/*LevelManager.prototype.getGridPos = function(x,y){
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
}*/

LevelManager.prototype.tutorialController = function(){
}

LevelManager.prototype.getNextLevel = function(){
	if(this.currentLevel === "tutorial"){
		return "level1";
	}
	return this.currentLevel;
}
LevelManager.prototype.debugDraw = function() {
	for(var i =0; i < this.objects.length; ++i){
		this.objects[i].debugDraw();
	}
}
LevelManager.prototype.draw = function() {
	if(this.currentLevel ==="tutorial"){
		ctx.drawImage(imgTutorialBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);
	}
	else if(this.currentLevel === "level1"){
		ctx.drawImage(imgBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);

		for(var i =0; i < this.objects.length; ++i){
			this.objects[i].draw();
		}
		for(var i = 0; i < this.numCells; ++i){
			ctx.drawImage(imgHighlight,this.cellArray[i][0],this.cellArray[i][1],this.cellWidth,this.cellHeight);
		}
	}
}

