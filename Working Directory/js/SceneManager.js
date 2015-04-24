var game,menu,soundManager;
var canvas, ctx,CT;
var assetManager;
var timeSpent;
var loading;
var imgLoader;

var loadedImages;
var loadedSounds;
var sc;
var scaleRatio;
var loadedScenes;
var textManager;
var client;
var transitionTimer=200;
var playerCash = 0;
var input ;
var account;
var allowSound = true;

function SceneManager(){
	
	menu = new Menu();
	soundManager = new SoundManager();
	assetManager = new AssetManager();
	textManager = new TextManager();
	game = new Game();
	account = new Account();
	client = new Client();
	this.initCanvas();
	textManager.init();
	this.gameState="0";
	this.gameScene = "0";
	sc = this;
	loadedScenes = [];
	loadedImages = false;
	loadedSounds = false;
	//loading = true;
	this.fadeNum = 0;
	this.onceTitle = false;
	this.onceLvl1 = false;
	this.onceLvlSel = false;
	scaleRatio = 1;
};



var context;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

SceneManager.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	canvas.id = "canvasId";
	ctx = canvas.getContext('2d');
	CT = new CanvasText(); 
	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = 1152;//1152
	canvas.height = 648;//648 
	//resizeGame();
	/*canvas.msg = new MSGesture();
    canvas.msg.target = canvas;*/
	canvas.addEventListener("touchstart",touchStart,false);
	canvas.addEventListener("touchmove",touchMove,false);
	canvas.addEventListener("touchend",touchEnd,false);
	canvas.addEventListener("mousedown",mouseDown,false);
}

function resizeGame(){
	if(window.innerWidth < 1300){
		canvas.style.height = window.innerHeight;
	  	canvas.style.width = window.innerWidth;
		scaleRatio = canvas.width/ parseInt(canvas.style.width, 10);
		canvas.style.height = canvas.height/scaleRatio;
	}
}

function mouseDown(e){
	if(sc.gameState ==="menu"){
		menu.mouseDown(e);
	}
	else{
		game.mouseDown(e);
	}
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
	assetManager.queueLoadImg("images/level1.png");
	assetManager.queueLoadImg("images/Back.png");
	assetManager.queueLoadImg("images/Enemy.png");
	assetManager.queueLoadImg("images/Enemy_Commander.png");
	assetManager.queueLoadImg("images/character_05.png");
	assetManager.queueLoadImg("images/character_02.png");
	assetManager.queueLoadImg("images/character_03.png");
	assetManager.queueLoadImg("images/character_dead.png");
	assetManager.queueLoadImg("images/Bullet.png");
	assetManager.queueLoadImg("images/pause_menu.png");
	assetManager.queueLoadImg("images/pause_button.png");
	assetManager.queueLoadImg("images/reload_button.png");
	assetManager.queueLoadImg("images/highlight.png");
	assetManager.queueLoadImg("images/win_menu.png");
	assetManager.queueLoadImg("images/lose_menu.png");
	assetManager.queueLoadImg("images/boss1.png");
	assetManager.queueLoadImg("images/hole.png");
	assetManager.queueLoadImg("images/tree1.png");
	assetManager.queueLoadImg("images/rock.png");
	//temp images
	assetManager.queueLoadImg("images/ViewRange.png");
	assetManager.queueLoadImg("images/GoTo.png");
	assetManager.queueLoadImg("images/shield.png");
	assetManager.queueLoadImg("images/circle.png");
	assetManager.queueLoadImg("images/bomb.png");
	assetManager.queueLoadImg("images/coin.png");
	//sounds
	assetManager.queueLoadSnd("sounds/music/gameplay_theme_idea.mp3");
	assetManager.queueLoadSnd("sounds/sfx/player_spawn.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_crecharge.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_pew.mp3");
	assetManager.queueLoadSnd("sounds/sfx/gun_empty.mp3");
	assetManager.queueLoadSnd("sounds/sfx/health_lost.mp3");
	assetManager.queueLoadSnd("sounds/sfx/shakeEasy.mp3");
	assetManager.queueLoadSnd("sounds/sfx/shake.mp3");
	assetManager.queueLoadSnd("sounds/sfx/pickup1.mp3");
	assetManager.queueLoadSnd("sounds/sfx/pickup2.mp3");
	assetManager.queueLoadSnd("sounds/sfx/pickup3.mp3");
	assetManager.queueLoadSnd("sounds/sfx/pickup4.mp3");
	assetManager.queueLoadSnd("sounds/sfx/pickupLast.mp3");
	assetManager.queueLoadSnd("sounds/sfx/Shield_Spawn.mp3");
	assetManager.queueLoadSnd("sounds/sfx/Shield_Damage.mp3");
}


SceneManager.prototype.queueTitleAssets = function(){
	assetManager.queueLoadImg("images/menuLayout_01.png");
	assetManager.queueLoadImg("images/back_arrow.png");
	assetManager.queueLoadImg("images/multiplayer_temp.png");
	assetManager.queueLoadImg("images/joinMultiplayerBtn.png");
	assetManager.queueLoadImg("images/stash_temp.png");
	assetManager.queueLoadImg("images/choose_temp.png");
	assetManager.queueLoadImg("images/armoryScreen.png");
	assetManager.queueLoadImg("images/exit_temp.png");
	assetManager.queueLoadImg("images/LoginBtn.png");
	assetManager.queueLoadImg("images/play_button.png");
	assetManager.queueLoadImg("images/multiplayer_button.png");
	assetManager.queueLoadImg("images/stash_button.png");
	assetManager.queueLoadImg("images/exit_button.png");
	assetManager.queueLoadImg("images/info_button.png");
	assetManager.queueLoadImg("images/soundOn_button.png");
	assetManager.queueLoadImg("images/soundOff_button.png");
	assetManager.queueLoadImg("images/LeftArrow.png");
	assetManager.queueLoadImg("images/RightArrow.png");
	assetManager.queueLoadImg("images/blnkSquare.png");
	
	assetManager.queueLoadImg("images/char1.png");
	assetManager.queueLoadImg("images/char2.png");
	assetManager.queueLoadImg("images/char3.png");

	assetManager.queueLoadSnd("sounds/music/Main_Menu.mp3");
	assetManager.queueLoadSnd("sounds/sfx/silence.mp3");
	assetManager.queueLoadSnd("sounds/sfx/button.mp3");

	//temp
	assetManager.queueLoadImg("images/selected.png");
	assetManager.queueLoadImg("images/shopBtn.png");
	assetManager.queueLoadImg("images/health.png");
	assetManager.queueLoadImg("images/playerHealth.png");
	assetManager.queueLoadImg("images/square.png");
	assetManager.queueLoadImg("images/custBtn.png");
}

SceneManager.prototype.queueLvlSelectAssets = function(){
	assetManager.queueLoadImg("images/worldSelectFloat_01.png");
	assetManager.queueLoadImg("images/world1.png");
	assetManager.queueLoadImg("images/world2.png");
	assetManager.queueLoadImg("images/worldTutorial.png");
}


SceneManager.prototype.setTitleImages = function(){
	imgTitleScreen = assetManager.getAsset("images/menuLayout_01.png");
	imgBackArrow = assetManager.getAsset("images/back_arrow.png");
	imgMultiplayerBack = assetManager.getAsset("images/multiplayer_temp.png");
	imgJoinServer = assetManager.getAsset("images/joinMultiplayerBtn.png");
	imgStashBack = assetManager.getAsset("images/stash_temp.png");
	imgCustomBack = assetManager.getAsset("images/choose_temp.png");
	imgArmoryBack = assetManager.getAsset("images/armoryScreen.png");
	imgExitPrompt = assetManager.getAsset("images/exit_temp.png");
	imgLoginBtn = assetManager.getAsset("images/LoginBtn.png");
	imgTPlayBtn =  assetManager.getAsset("images/play_button.png");
	imgTMultBtn =  assetManager.getAsset("images/multiplayer_button.png");
	imgTStashBtn =  assetManager.getAsset("images/stash_button.png");
	imgTExitBtn = assetManager.getAsset("images/exit_button.png");
	imgTInfo =  assetManager.getAsset("images/info_button.png");
	imgTSnd = assetManager.getAsset("images/soundOn_button.png");
	imgTSndOff = assetManager.getAsset("images/soundOff_button.png");
	imgLeftArrow =  assetManager.getAsset("images/LeftArrow.png");
	imgRightArrow = assetManager.getAsset("images/RightArrow.png");
	imgBlankSquare = assetManager.getAsset("images/blnkSquare.png");
	

	imgChar1 = assetManager.getAsset("images/char1.png");
	imgChar2 = assetManager.getAsset("images/char2.png");
	imgChar3 = assetManager.getAsset("images/char3.png");

	//temp
	imgSelectX =  assetManager.getAsset("images/selected.png");
	imgCustBtn = assetManager.getAsset("images/custBtn.png");
	imgHealthBar = assetManager.getAsset("images/health.png");
	imgShopBtn = assetManager.getAsset("images/shopBtn.png");
	imgSquare = assetManager.getAsset("images/square.png");

	loadedImages=true;
}
SceneManager.prototype.setTitleSounds = function(){
	titleMusic = assetManager.getAsset("sounds/music/Main_Menu.mp3");
	silence = assetManager.getAsset("sounds/sfx/silence.mp3");
	buttonSnd = assetManager.getAsset("sounds/sfx/button.mp3");
	loadedSounds=true;
}

SceneManager.prototype.setLvlSelectImages = function(){
	imgLvlSelBack = assetManager.getAsset("images/worldSelectFloat_01.png");
	imgLvlSel1 = assetManager.getAsset("images/world1.png");
	imgLvlSel2 = assetManager.getAsset("images/world2.png");
	imgLvlSelTut = assetManager.getAsset("images/worldTutorial.png");
	loadedImages=true;
}

SceneManager.prototype.setGameImages = function(){
	imgBack = assetManager.getAsset("images/level1.png");
	imgTutorialBack = assetManager.getAsset("images/Back.png");
	imgPlayer1 = assetManager.getAsset("images/character_05.png");
	imgPlayer2 = assetManager.getAsset("images/character_02.png");
	imgPlayer3 = assetManager.getAsset("images/character_03.png");
	imgPlayerDead = assetManager.getAsset("images/character_dead.png");
	imgGrunt = assetManager.getAsset("images/Enemy.png");
	imgComdr = assetManager.getAsset("images/Enemy_Commander.png");
	
	imgBullet = assetManager.getAsset("images/Bullet.png");
	imgHighlight = assetManager.getAsset("images/highlight.png");
	
	imgPauseMenu = assetManager.getAsset("images/pause_menu.png");
	imgWinMenu = assetManager.getAsset("images/win_menu.png");
	imgLoseMenu = assetManager.getAsset("images/lose_menu.png");
	imgPauseBtn = assetManager.getAsset("images/pause_button.png");
	imgReloadBtn = assetManager.getAsset("images/reload_button.png");
	imgBoss1 = assetManager.getAsset("images/boss1.png");
	imgHole =  assetManager.getAsset("images/hole.png");
	imgTree1 =  assetManager.getAsset("images/tree1.png");
	imgRock =  assetManager.getAsset("images/rock.png");
	imgPlayerHealth =  assetManager.getAsset("images/playerHealth.png");
	//temp images
	imgRadarPUp = assetManager.getAsset("images/GoTo.png");
	imgViewRad = assetManager.getAsset("images/ViewRange.png");
	imgCircle = assetManager.getAsset("images/circle.png");
	imgShield = assetManager.getAsset("images/shield.png");
	imgBombP = assetManager.getAsset("images/bomb.png");
	imgCoin = assetManager.getAsset("images/coin.png");
	loadedImages = true;
}

SceneManager.prototype.setGameSounds = function(){
	spawnSnd = assetManager.getAsset("sounds/sfx/player_spawn.mp3");
	backTrack = assetManager.getAsset("sounds/music/gameplay_theme_idea.mp3");
	reloadSnd = assetManager.getAsset("sounds/sfx/gun_crecharge.mp3");
	gunshot = assetManager.getAsset("sounds/sfx/gun_pew.mp3");
	emptySnd = assetManager.getAsset("sounds/sfx/gun_empty.mp3");
	loseHealthSnd = assetManager.getAsset("sounds/sfx/health_lost.mp3");
	shakeSnd = assetManager.getAsset("sounds/sfx/shakeEasy.mp3");
	flurrySnd = assetManager.getAsset("sounds/sfx/shake.mp3");
	pickUpSnd1 = assetManager.getAsset("sounds/sfx/pickup1.mp3");
	pickUpSnd2 = assetManager.getAsset("sounds/sfx/pickup2.mp3");
	pickUpSnd3 = assetManager.getAsset("sounds/sfx/pickup3.mp3");
	pickUpSnd4 = assetManager.getAsset("sounds/sfx/pickup4.mp3");
	pickUpSndLast = assetManager.getAsset("sounds/sfx/pickupLast.mp3");
	sndShieldSpwn = assetManager.getAsset("sounds/sfx/Shield_Spawn.mp3");
	sndShieldDmg = assetManager.getAsset("sounds/sfx/Shield_Damage.mp3");
	loadedSounds = true;
}

SceneManager.prototype.loadScreen = function(){
	ctx.drawImage(imgLoader, 0,0,canvas.width ,canvas.height);
}

SceneManager.prototype.drawFade = function(){

	if(transitionTimer<100&&transitionTimer%7 ===0){
		sc.fadeNum+=0.1;
	}
	else if(transitionTimer%7 ===0){
		sc.fadeNum-=0.1;
	}
	ctx.save();
	ctx.globalAlpha = sc.fadeNum;
	sc.loadScreen();
	ctx.restore();
}


SceneManager.prototype.gameLoop = function (){
   	var GAME_RUNNING=0;
   	//this.update();
   	window.onerror = function (errorMsg, url, lineNumber) {
    	//console.log('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    	client.writeError('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
	}
	if(loadedSounds &&loadedImages){
			console.log("Load Time ",Date.now()-timeSpent);
   			loading = false;
   			loadedImages = false;
   			loadedSounds =false;
   			//game.reset(sc.gameScene);
   		if(sc.gameState ==="gameplay"){
   			game.reset(sc.gameScene);
   		}
   		else if(sc.gameState ==="menu" &&sc.gameScene ==="titleScreen"){
   			menu.reset();
   		}
   	}
   	//no updateing or drawing allowed until loading is complete
   	if(loading){
   		sc.loadScreen();
   		textManager.loading();
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
		if(transitionTimer>100){
			sc.gameState = temp[0];
			sc.gameScene = temp[1];
		}
		if(transitionTimer<200){
			transitionTimer++;
		}

		if(sc.gameState ==="gameplay"){
			
			if(!contains(loadedScenes,sc.gameScene)){
				//sc.loadScene(sc.gameState,sc.gameScene);
				sc.loadScene(sc.gameState,sc.gameScene);
			}
			else{
				game.reset(sc.gameScene);
			}
		}
		if(sc.gameScene==="levelSelect"){
			//game.reset();
			if(!contains(loadedScenes,"levelSelect")){
				sc.loadScene(sc.gameState,sc.gameScene);
				loadedScenes.push(sc.gameScene);
			}
		}
		menu.draw(sc.gameScene);
		if(transitionTimer<190){
			sc.drawFade();
		}
		else{
			sc.fadeNum=0;
		}
		loadedScenes.push(sc.gameScene);
	}

	window.requestAnimFrame(sc.gameLoop);
}


SceneManager.prototype.loadScene = function(state,scene){
	loadedImages = false;
   			loadedSounds =false;
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
			//loadedSounds =true;
			assetManager.loadSnd(function() {
    			sc.setTitleSounds()
			},0);
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
			//loadedSounds = true;
			assetManager.loadSnd(function() {
    			sc.setGameSounds()
			},0);
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