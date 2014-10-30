var game;
var canvas, ctx;
var assetManager;
var timeSpent;
var loading;
var imgLoader;

var sc;
function SceneManager(){
	game = new Game();
	assetManager = new AssetManager();
	this.initCanvas();
	this.gameState="0";
	sc = this;
	//loading = true;
};

SceneManager.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = 800;//window.innerWidth -200;
	canvas.height = 600;//window.innerHeight - 200;
	canvas.addEventListener("touchstart",touchStart,false);
	canvas.addEventListener("touchmove",touchMove,false);
	canvas.addEventListener("touchend",touchEnd,false);

	/*canvas.addEventListener("mousedown",mouseDown,false);
	canvas.addEventListener("mousemove",mouseMove,false);
	canvas.addEventListener("mouseup",mouseUp,false);*/
	//document.addEventListener("mousemove", function (e) {
	//e.preventDefault();
	//stick.setInputXY(e.pageX, e.pageY);
//});
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

SceneManager.prototype.loadScreen = function(){
	
	console.log("draw");
	ctx.drawImage(imgLoader, 0,0,800,600);
}

SceneManager.prototype.gameLoop = function (){
   	var GAME_RUNNING=0;
   	//this.update();
   	if(loading){
   		sc.loadScreen();
   	}
   	else if(sc.gameState === "gameplay"){
 		sc.gameState = game.update();
		game.draw();
		//check for change and call load scene.
	}
	else if(sc.gameState === "menu"){
	}
	window.requestAnimFrame(sc.gameLoop);
}



SceneManager.prototype.loadScene = function(state,scene){
	loading = true;
	assetManager.queueLoadEssen("images/loadScreen.png");
	    assetManager.loadEssential(function() {
        assetManager.loadEssential
    });
	imgLoader = assetManager.getAsset("images/loadScreen.png");
	sc.gameLoop();
	timeSpent = Date.now();
	
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
			//setTimeout(function(){		
			sc.gameState = state;
			game.initWorld();
			loading =false;
			//}, 3000);


		}
		else if(scene === "level2"){

		}
	}
	else if(state === "credits"){

	}
	console.log(Date.now()-timeSpent);
	
}