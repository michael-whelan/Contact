var imgBack = new Image();
var imgTutorialBack = new Image();
var backTrack = null;


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
	/*
		1 = square object
		2 = circle object
		3 = rock
		9 = enemy spawn
		*/
	this.level1 = 
		[[9,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

	this.level2 = 
		[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,2,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,9,0,0,0,0,0,9,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,9,0,0,0,0,0,9,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,2,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
}

LevelManager.prototype.update = function() {
	
}

LevelManager.prototype.setLevel = function(lvl){
	this.currentLevel = lvl;
	this.numCells = (2000/this.cellWidth) * (1300/this.cellHeight);
	for(var i = 0; i < this.numCells; ++i){
		this.cellArray[i] = new Array();
	}
}

LevelManager.prototype.mapSetup = function(){
	this.objects = [];
	enemyManager.spawnPos = [];

	if(this.currentLevel === "level1"){

		for(var i = 0; i < 13; ++i){
			for(var j = 0; j < 20; ++j){
				if(this.level1[i][j] === 1){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,100,100,"square");
					this.objects.push(object);
				}
				if(this.level1[i][j] === 2){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,150,150,"circle");
					this.objects.push(object);
				}
				if(this.level1[i][j] === 3){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,80,80,"rock");
					this.objects.push(object);
				}
				if(this.level1[i][j] === 9){
					var object = [];
					object.push(((100*j)-845)-200);
					object.push(((100*i)-652)-200);
					enemyManager.spawnPos.push(object);
				}
			}
		}
	}
	else if(this.currentLevel ==="level2"){
		for(var i = 0; i < 13; ++i){
			for(var j = 0; j < 20; ++j){
				if(this.level2[i][j] === 1){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,100,100,"square");
				//	object.gridPos=this.getGridPos((100*j)-845,(100*i)-652,100,100);
					this.objects.push(object);
				}
				if(this.level2[i][j] === 2){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,100,100,"circle");
				//	object.gridPos=this.getGridPos((100*j)-845,(100*i)-652,100,100);
					this.objects.push(object);
				}
				if(this.level2[i][j] === 3){
					var object = new Obstacle();
					object.set((100*j)-845,(100*i)-652,80,80,"rock");
				//	object.gridPos=this.getGridPos((100*j)-845,(100*i)-652,100,100);
					this.objects.push(object);
				}
				if(this.level2[i][j] === 9){
					var object = [];
					object.push((100*j)-845);
					object.push((100*i)-652);
					enemyManager.spawnPos.push(object);
				}
			}
		}
	}
}


LevelManager.prototype.tutorialController = function(){
}

LevelManager.prototype.getNextLevel = function(){
	if(this.currentLevel === "tutorial"){
		return "level1";
	}
	else if(this.currentLevel=== "level1"){
		return "level2";	
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
	else if(this.currentLevel === "level2"){
		ctx.drawImage(imgBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);

		for(var i =0; i < this.objects.length; ++i){
			this.objects[i].draw();
		}
	}
}

