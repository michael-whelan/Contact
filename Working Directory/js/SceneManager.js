var game;
var canvas, ctx;
var assetManager;
var timeSpent;
var loading;
var imgLoader;

var loadedImages;
var loadedSounds;
var sc;
function SceneManager(){
	game = new Game();
	assetManager = new AssetManager();
	this.initCanvas();
	this.gameState="0";
	sc = this;
	loadedImages = false;
	loadedSounds = false;
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
	assetManager.queueLoadSnd("sounds/music/gameplay_theme_idea.mp3");
	assetManager.queueLoadSnd("sounds/sfx/player_spawn.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_recharge.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_pew.ogg");
}

SceneManager.prototype.setImages = function(){
	imgBack = assetManager.getAsset("images/Back.png");
	imgPlayer = assetManager.getAsset("images/character_05.png");
	imgEnemy = assetManager.getAsset("images/Enemy.png");
	imgViewRad = assetManager.getAsset("images/ViewRange.png");
	imgBullet = assetManager.getAsset("images/Bullet.png");
	loadedImages = true;
}

SceneManager.prototype.setSounds = function(){
	spawnSnd = assetManager.getAsset("sounds/sfx/player_spawn.mp3");
	backTrack = assetManager.getAsset("sounds/music/gameplay_theme_idea.mp3");
	reloadSnd = assetManager.getAsset("sounds/sfx/gun_recharge.mp3");
	gunshot = assetManager.getAsset("sounds/sfx/gun_pew.ogg");
	loadedSounds = true;

}

SceneManager.prototype.loadScreen = function(){
	
//	console.log("draw");
	ctx.drawImage(imgLoader, 0,0,800,600);
}

SceneManager.prototype.gameLoop = function (){
   	var GAME_RUNNING=0;
   	//this.update();
if(loadedSounds &&loadedImages){
   			loading = false;
   			loadedImages = false;
   			loadedSounds =false;
   			sc.runLvl1();
   		}

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


SceneManager.prototype.runLvl1 = function(){
	game.initWorld();
}


SceneManager.prototype.loadScene = function(state,scene){
	loading = true;
	assetManager.queueLoadEssen("images/load_Screen.png");
	    assetManager.loadEssential(function() {
        assetManager.loadEssential
    });
	imgLoader = assetManager.getAsset("images/load_Screen.png");
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
    			sc.setImages()
			});
			assetManager.loadLvl1Sounds(function() {
    			sc.setSounds()
			});

			sc.setSounds();
			//sc.setSounds();
			//setTimeout(function(){		
			
			//}, 3000);


		}
		else if(scene === "level2"){

		}
	}
	else if(state === "credits"){

	}
	sc.gameState = state;
	console.log(Date.now()-timeSpent);
	
}