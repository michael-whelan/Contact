var game,menu;
var canvas, ctx;
var assetManager;
var timeSpent;
var loading;
var imgLoader;

var loadedImages;
var loadedSounds;
var sc;
var scaleRatio;
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
	this.onceMenu = false;
	this.onceLvl1 = false;
	scaleRatio = canvas.height/ parseInt(canvas.style.height, 10);
	canvas.style.width = canvas.width/scaleRatio;
};

SceneManager.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 
	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = 1152;//1152
	canvas.height = 648;//648 
	resizeGame();
	canvas.addEventListener("touchstart",touchStart,false);
	canvas.addEventListener("touchmove",touchMove,false);
	canvas.addEventListener("touchend",touchEnd,false);
	canvas.addEventListener("mousedown",mouseDown,false);
	/*canvas.addEventListener("mousedown",mouseDown,false);
	canvas.addEventListener("mousemove",mouseMove,false);
	canvas.addEventListener("mouseup",mouseUp,false);*/
	//document.addEventListener("mousemove", function (e) {
	//e.preventDefault();
	//stick.setInputXY(e.pageX, e.pageY);
//});
	//this.queueAssets();
}
function resizeGame(){
	canvas.style.height = window.parent.document.getElementById("getHeight").style.height;
  	canvas.style.width = window.parent.document.getElementById("getWidth").style.width;
	scaleRatio = canvas.height/ parseInt(canvas.style.height, 10);
	canvas.style.width = canvas.width/scaleRatio;
	console.log(canvas.style.height);
	
}

function mouseDown(e){
	menu.mouseDown(e);
	//console.log(e.clientX,e.clientY);
}

function touchStart(e){
	if(this.gameState ==="menu"){
		menu.touchStart(e);
	}
	else if(this.gameScene === "gameplay"){
		game.touchStart(e);
	}	
}
function touchMove(e){
	if(this.gameState ==="menu"){
		menu.touchMove(e);
	}
	else if(this.gameScene === "gameplay"){
		game.touchMove(e);
	}	
}
function touchEnd(e){
	if(this.gameState ==="menu"){
		menu.touchEnd(e);
	}
	else if(this.gameScene === "gameplay"){
		game.touchEnd(e);
	}	
}


SceneManager.prototype.queueLvl1Assets = function(){
	assetManager.queueLoadImg("images/Back.png");
	assetManager.queueLoadImg("images/ViewRange.png");
	assetManager.queueLoadImg("images/Enemy.png");
	assetManager.queueLoadImg("images/character_05.png");
	assetManager.queueLoadImg("images/Bullet.png");
	assetManager.queueLoadImg("images/GoTo.png");
	assetManager.queueLoadSnd("sounds/music/gameplay_theme_idea.mp3");
	assetManager.queueLoadSnd("sounds/sfx/player_spawn.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_crecharge.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_pew.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_empty.mp3");
	assetManager.queueLoadSnd("sounds/sfx/health_lost.mp3");
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
	imgRadarPUp = assetManager.getAsset("images/GoTo.png");
	loadedImages = true;
}

SceneManager.prototype.setLvl1Sounds = function(){
	spawnSnd = assetManager.getAsset("sounds/sfx/player_spawn.mp3");
	backTrack = assetManager.getAsset("sounds/music/gameplay_theme_idea.mp3");
	reloadSnd = assetManager.getAsset("sounds/sfx/gun_crecharge.mp3");
	gunshot = assetManager.getAsset("sounds/sfx/gun_pew.mp3");
	emptySnd = assetManager.getAsset("sounds/sfx/gun_empty.mp3");
	loseHealthSnd = assetManager.getAsset("sounds/sfx/health_lost.mp3");
	loadedSounds = true;
}

SceneManager.prototype.loadScreen = function(){
	ctx.drawImage(imgLoader, 0,0,canvas.width ,canvas.height);
}

SceneManager.prototype.gameLoop = function (){
   	var GAME_RUNNING=0;
   	//this.update();
	if(loadedSounds &&loadedImages){
   			loading = false;
   			loadedImages = false;
   			loadedSounds =false;
   			game.reset();
   	}
   	//no updateing or drawing allowed until loading is complete
   	if(loading){
   		sc.loadScreen();
   		
   	}
   	else if(sc.gameState === "gameplay"){
 		sc.gameState = game.update();
 		if(sc.gameState !== "gameplay"){
 			sc.gameScene = "titleScreen";
 			if(!sc.onceMenu){
 				sc.loadScene(sc.gameState,sc.gameScene);
 			}
 		}
		game.draw();
		sc.onceLvl1 = true;
		//check for change and call load scene.
	}
	else if(sc.gameState === "menu"){
		sc.gameState = menu.update();
		if(sc.gameState !=="menu"){
			sc.gameScene = "level1";
			game.reset();
			if(!sc.onceLvl1){
				sc.loadScene(sc.gameState,sc.gameScene);
			}
		}
		menu.draw();
		sc.onceMenu = true;
	}
	window.requestAnimFrame(sc.gameLoop);
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