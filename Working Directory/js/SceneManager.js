var game,menu;
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
	menu = new Menu();
	assetManager = new AssetManager();
	this.initCanvas();
	this.gameState="0";
	this.gameScene = "0";
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
	canvas.width = 512;//1024
	canvas.height = 384;//768 
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
	assetManager.queueLoadSnd("sounds/sfx/gun_crecharge.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_pew.ogg");
}


SceneManager.prototype.queueTitleAssets = function(){
	assetManager.queueLoadImg("images/menuLayout_01.png");
}

SceneManager.prototype.setTitleImages = function(){
	imgTitleScreen = assetManager.getAsset("images/menuLayout_01.png");
	loadedImages=true;
}


SceneManager.prototype.setLvl1Images = function(){
	imgBack = assetManager.getAsset("images/Back.png");
	imgPlayer = assetManager.getAsset("images/character_05.png");
	imgEnemy = assetManager.getAsset("images/Enemy.png");
	imgViewRad = assetManager.getAsset("images/ViewRange.png");
	imgBullet = assetManager.getAsset("images/Bullet.png");
	loadedImages = true;
}

SceneManager.prototype.setLvl1Sounds = function(){
	spawnSnd = assetManager.getAsset("sounds/sfx/player_spawn.mp3");
	backTrack = assetManager.getAsset("sounds/music/gameplay_theme_idea.mp3");
	reloadSnd = assetManager.getAsset("sounds/sfx/gun_crecharge.mp3");
	gunshot = assetManager.getAsset("sounds/sfx/gun_pew.ogg");
	loadedSounds = true;

}

SceneManager.prototype.loadScreen = function(){
	ctx.drawImage(imgLoader, 0,0,512 ,384);
}

SceneManager.prototype.gameLoop = function (){
   	var GAME_RUNNING=0;
   	//this.update();
	if(loadedSounds &&loadedImages){
   			loading = false;
   			loadedImages = false;
   			loadedSounds =false;
   			sc.runLoaded(sc.gameState,sc.gameScene);
   	}
   	//no updateing or drawing allowed until loading is complete
   	if(loading){
   		sc.loadScreen();
   		
   	}
   	else if(sc.gameState === "gameplay"){
 		sc.gameState = game.update();
		game.draw();
		//check for change and call load scene.
	}
	else if(sc.gameState === "menu"){
		sc.gameState = menu.update();
		menu.draw();
	}
	window.requestAnimFrame(sc.gameLoop);
}


SceneManager.prototype.runLoaded = function(state,scene){
	if(state ==="gameplay" && scene === "level1"){
		game.initWorld();
	}
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
			this.queueTitleAssets();
			assetManager.loadTitleImages(function() {
    			sc.setTitleImages()
			});
			loadedSounds=true;
		}
		else if(scene ==="LevelSelect"){}
	}
	else if(state === "gameplay"){
		if(scene === "level1"){
			this.queueLvl1Assets();
			assetManager.loadLvl1Images(function() {
    			sc.setLvl1Images()
			});
			assetManager.loadLvl1Sounds(function() {
    			sc.setLvl1Sounds()
			});

			sc.setLvl1Sounds();
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
	sc.gameScene = scene;
	console.log(Date.now()-timeSpent);
	
}