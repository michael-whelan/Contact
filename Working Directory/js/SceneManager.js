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
var loadedScenes;
function SceneManager(){
	game = new Game();
	menu = new Menu();
	assetManager = new AssetManager();
	this.initCanvas();
	this.gameState="0";
	this.gameScene = "0";
	sc = this;
	loadedScenes = [];
	loadedImages = false;
	loadedSounds = false;
	//loading = true;
	this.onceTitle = false;
	this.onceLvl1 = false;
	this.onceLvlSel = false;
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
	
}

function mouseDown(e){
	if(sc.gameState ==="menu"){
		menu.mouseDown(e);
	}
	else{
		game.mouseDown(e);
	}
	//console.log(e.clientX,e.clientY);
}

function touchStart(e){
	//e.preventDefault(); 
	if(sc.gameState ==="menu"){
		//menu.touchStart(e);
	}
	else if(sc.gameState === "gameplay"){
		game.touchStart(e);
	}	
	//
}
function touchMove(e){
	e.preventDefault(); 
	if(sc.gameState ==="menu"){
		menu.touchMove(e);
	}
	else if(sc.gameState === "gameplay"){
		game.touchMove(e);
	}	
}
function touchEnd(e){
	if(this.gameState ==="menu"){
		menu.touchEnd(e);
	}
	else if(sc.gameState === "gameplay"){
		game.touchEnd(e);
	}	
}


SceneManager.prototype.queueGameAssets = function(){
	assetManager.queueLoadImg("images/Back.png");
	assetManager.queueLoadImg("images/Back_Tutorial.png");
	assetManager.queueLoadImg("images/ViewRange.png");
	assetManager.queueLoadImg("images/Enemy.png");
	assetManager.queueLoadImg("images/Enemy_Commander.png");
	assetManager.queueLoadImg("images/character_05.png");
	assetManager.queueLoadImg("images/Bullet.png");
	assetManager.queueLoadImg("images/GoTo.png");
	assetManager.queueLoadImg("images/pause_menu.png");
	assetManager.queueLoadImg("images/pause_button.png");
	assetManager.queueLoadImg("images/reload_button.png");
	assetManager.queueLoadImg("images/highlight.png");
	assetManager.queueLoadImg("images/win_menu.png");
	assetManager.queueLoadImg("images/lose_menu.png");
	assetManager.queueLoadSnd("sounds/music/gameplay_theme_idea.mp3");
	assetManager.queueLoadSnd("sounds/sfx/player_spawn.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_crecharge.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_pew.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_empty.mp3");
	assetManager.queueLoadSnd("sounds/sfx/health_lost.mp3");
}


SceneManager.prototype.queueTitleAssets = function(){
	assetManager.queueLoadImg("images/menuLayout_01.png");
	assetManager.queueLoadImg("images/back_arrow.png");
	assetManager.queueLoadImg("images/multiplayer_temp.png");
	assetManager.queueLoadImg("images/stash_temp.png");
	assetManager.queueLoadImg("images/choose_temp.png");
	assetManager.queueLoadImg("images/armory_temp.png");
	assetManager.queueLoadImg("images/exit_temp.png");
}

SceneManager.prototype.queueLvlSelectAssets = function(){
	assetManager.queueLoadImg("images/worldSelectFloat_01.png");
	assetManager.queueLoadImg("images/world1.png");
	assetManager.queueLoadImg("images/worldTutorial.png");
}


SceneManager.prototype.setTitleImages = function(){
	imgTitleScreen = assetManager.getAsset("images/menuLayout_01.png");
	imgBackArrow = assetManager.getAsset("images/back_arrow.png");
	imgMultiplayerBack = assetManager.getAsset("images/multiplayer_temp.png");
	imgStashBack = assetManager.getAsset("images/stash_temp.png");
	imgCustomBack = assetManager.getAsset("images/choose_temp.png");
	imgArmoryBack = assetManager.getAsset("images/armory_temp.png");
	imgExitPrompt = assetManager.getAsset("images/exit_temp.png");
	loadedImages=true;
}

SceneManager.prototype.setLvlSelectImages = function(){
	imgLvlSelBack = assetManager.getAsset("images/worldSelectFloat_01.png");
	imgLvlSel1 = assetManager.getAsset("images/world1.png");
	imgLvlSelTut = assetManager.getAsset("images/worldTutorial.png");
	loadedImages=true;
}

SceneManager.prototype.setGameImages = function(){
	imgBack = assetManager.getAsset("images/Back.png");
	imgTutorialBack = assetManager.getAsset("images/Back_Tutorial.png");
	imgPlayer = assetManager.getAsset("images/character_05.png");
	imgGrunt = assetManager.getAsset("images/Enemy.png");
	imgComdr = assetManager.getAsset("images/Enemy_Commander.png");
	imgViewRad = assetManager.getAsset("images/ViewRange.png");
	imgBullet = assetManager.getAsset("images/Bullet.png");
	imgHighlight = assetManager.getAsset("images/highlight.png");
	imgRadarPUp = assetManager.getAsset("images/GoTo.png");
	imgPauseMenu = assetManager.getAsset("images/pause_menu.png");
	imgWinMenu= assetManager.getAsset("images/win_menu.png");
	imgLoseMenu= assetManager.getAsset("images/lose_menu.png");
	imgPauseBtn = assetManager.getAsset("images/pause_button.png");
	imgReloadBtn = assetManager.getAsset("images/reload_button.png");
	loadedImages = true;
}

SceneManager.prototype.setGameSounds = function(){
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
			console.log("Load Time ",Date.now()-timeSpent);
   			loading = false;
   			loadedImages = false;
   			loadedSounds =false;
   			game.reset(sc.gameScene);
   	}
   	//no updateing or drawing allowed until loading is complete
   	if(loading){
   		sc.loadScreen();
   	}
   	else if(sc.gameState === "gameplay"){
 		sc.gameState = game.update(sc.gameScene);
 		if(sc.gameState === "menu"){
 			sc.gameScene = "titleScreen";
 			menu.reset();
 			if(!contains(loadedScenes,"titleScreen")){
 				sc.loadScene(sc.gameState,sc.gameScene);
 			}
 		}
		game.draw();
		//sc.onceLvl1 = true;
		loadedScenes.push(sc.gameScene);
		//check for change and call load scene.
	}
	else if(sc.gameState === "menu"){
		var temp = menu.update();
		sc.gameState = temp[0];
		sc.gameScene = temp[1];
		if(sc.gameState ==="gameplay"){
			game.reset(sc.gameScene);
			if(!contains(loadedScenes,"level1")&&!contains(loadedScenes,"tutorial")){
				//sc.loadScene(sc.gameState,sc.gameScene);
				sc.loadScene(sc.gameState,sc.gameScene);
			}
			//if(!contains(loadedScenes,"tutorial")){
				
			//}
		}
		if(sc.gameScene==="levelSelect"){
			//game.reset();
			if(!contains(loadedScenes,"levelSelect")){
				sc.loadScene(sc.gameState,sc.gameScene);
				loadedScenes.push(sc.gameScene);
			}
		}
		menu.draw(sc.gameScene);
	//	console.log("current scene: "+ sc.gameScene);
		loadedScenes.push(sc.gameScene);
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
		else if(scene ==="levelSelect"){
			
			this.queueLvlSelectAssets();
			assetManager.loadLvlSelectImages(function() {
    			sc.setLvlSelectImages()
			});
			loadedSounds=true;
		}

	}
	else if(state === "gameplay"){
		/*if(scene === "tutorial"){
			this.queueTutAssets();
			assetManager.loadTutImages(function() {
    			sc.setTutImages()
			});
			assetManager.loadTutSounds(function() {
    			sc.setTutSounds()
			});
		}
		else if(scene === "level1"){*/
			this.queueGameAssets();
			assetManager.loadLvl1Images(function() {
    			sc.setGameImages()
			});
			assetManager.loadLvl1Sounds(function() {
    			sc.setGameSounds()
			});

		//}
	}
	else if(state === "credits"){

	}
	sc.gameState = state;
	sc.gameScene = scene;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}