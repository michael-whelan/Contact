var game;
var canvas, ctx;
var assetManager;

function SceneManager(){
	game = new Game();
	assetManager = new AssetManager();
	this.initCanvas();
};

SceneManager.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = 800;//window.innerWidth -200;
	canvas.height = 600;//window.innerHeight - 200;
	canvas.addEventListener("mousedown",mouseDown,false);
	//this.queueAssets();
}


SceneManager.prototype.queueLvl1Assets = function(){
	assetManager.queueLoadImg("images/Back.png");
	assetManager.queueLoadImg("images/ViewRange.png");
	assetManager.queueLoadImg("images/Enemy.png");
	assetManager.queueLoadImg("images/character_05.png");
	assetManager.queueLoadImg("images/Bullet.png");
	assetManager.queueLoadSnd("sounds/music/Gameplay_Theme_Idea.mp3");
	assetManager.queueLoadSnd("sounds/sfx/Player_Spawn.mp3");
	assetManager.queueLoadSnd("sounds/sfx/Gun_Recharge.mp3");
	assetManager.queueLoadSnd("sounds/sfx/Gun_Pew.mp3");
}

SceneManager.prototype.setImages = function(){
	imgBack = assetManager.getAsset("images/Back.png");
	imgPlayer = assetManager.getAsset("images/character_05.png");
	imgEnemy = assetManager.getAsset("images/Enemy.png");
	imgViewRad = assetManager.getAsset("images/ViewRange.png");
	imgBullet = assetManager.getAsset("images/Bullet.png");
}



SceneManager.prototype.setSounds = function(){
	backTrack = assetManager.getAsset("sounds/music/Gameplay_Theme_Idea.mp3");
	spawnSnd = assetManager.getAsset("sounds/sfx/Player_Spawn.mp3");
	reloadSnd = assetManager.getAsset("sounds/sfx/Gun_Recharge.mp3");
	gunshot = assetManager.getAsset("sounds/sfx/Gun_Pew.mp3");
}

SceneManager.prototype.loadScene = function(state,scene){
	if(state === "menu"){
		if(scene === "titleScreen"){

		}
		else if(scene ==="LevelSelect"){}

	}
	else if(state === "gameplay"){
		if(scene === "level1"){
			this.queueLvl1Assets();
			assetManager.loadLvl1Images(function() {
    			assetManager.loadLvl1Images
			});
			assetManager.loadLvl1Sounds(function() {
    			assetManager.loadLvl1Sounds
			});
			this.setImages();
			this.setSounds();
			game.initWorld();
			game.gameLoop();
		}
		else if(scene === "level2"){

		}
	}
	else if(state === "credits"){

	}
}