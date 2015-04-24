
//imgBack.src = "images/Back.png"
imgPauseMenu = new Image();
imgWinMenu = new Image();
imgLoseMenu = new Image();
imgHealthBar = new Image();
//backTrack.src = "sounds/music/Gameplay_Theme_Idea.mp3";

var fsm;
var innerX1,innerY1,innerX2,innerY2;
var intersect = false,interX = 0,interY =0;
var player,player2;
var enemy;
var collisionManager;
var lvlManager;
var levelWin;

var enemyManager;
var mapWidth;
var mapHeight;
var overlayType = "pause";
//stick stuff
var sticks;
var limitSize = 36;
var inputSize = 20;
var threshold=4;
var WIDTH =1152;
var HEIGHT =648;
var point = {
	radius: 20,
	speed: 10,
	x: (1152 / 2),
	y: (648 / 2)
};
var _name="junk";
var pickUps=[];

var pause= false;
var debugDrawer = false;
var timer =0;
var pauseTimer;
var tempCoins=0;

function Game (){
	player = new Player("player1");
	player2 = new Player("player2");
	sticks = [new Stick(inputSize), new Stick(inputSize)];
	fsm = new FSM();
	lvlManager = new LevelManager();
	enemyManager = new EnemyManager();
	collisionManager = new CollisionManager();
	mapWidth = 2000;
	mapHeight = 1300;
	this.currentLvl;
	this.goMenu = false;
	this.overlayed = false;
	this.activeOverlay = "null";
	this.btnScale = 50;
	this.pauseX = 1050;
	this.pauseY = 50;
	this.shake = false;
	this.clicker =0;
}


Game.prototype.reset = function(lvl){
	tempCoins=0;
	player.reset();
	player2.reset();
	pickUps = [];
	player.setAttributes(shop.HealthLvl,shop.ammoLvl,shop.other1Lvl);
	player.setEquipment(equipment[0],menu.getEquipLvl(equipment[0]),equipment[1],menu.getEquipLvl(equipment[1]),menu.selectedGun,menu.currChar);
	this.shakeNum1=0;
	this.shakeNum2 =0;
	this.shakeTimer=0;
	this.sendTimer =0;
	this.worldSendTimer=0;
	lvlManager.setLevel(lvl);
	pause = false;
	enemyManager.reset(lvl);
	this.currentLvl = lvl;
	if(this.currentLvl === "tutorial"&& !window.mobileAndTabletcheck()){
		textManager.setDevice();
	}
	textManager.tutorialMsgNum =0;
	//player.init();
	this.goMenu = false;
	levelWin = false;
	textManager.reset();
	lvlManager.mapSetup();
	if(allowSound){
		soundManager.playSoundLoop(backTrack,"gameBack");
	}
	for (var i = 0; i < sticks.length; ++i) {
		sticks[i].active = false;
	}
}

Game.prototype.touchMove= function(e){
	//e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
		var touch = e.touches[i];
		if(touch.pageX<canvas.width/2){
			sticks[0].setInputXY(touch.pageX, touch.pageY);
		}
		else{
			sticks[1].setInputXY(touch.pageX, touch.pageY);
		}
	}
}

Game.prototype.mouseDown= function(e){

	if(pause){
		this.updateOverlay(e);
	}
}


Game.prototype.touchStart = function(e){ 
	//e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
			var touch = e.touches[i];
			if(pause){
				this.updateOverlay(overlayType,touch.pageX, touch.pageY);
			}
			else if(touch.pageY>canvas.height/2){
				if(touch.pageX<canvas.width/2){
					if(sticks[0].active != true)
					{
						sticks[0].setLimitXY(touch.pageX, touch.pageY);
						sticks[0].setInputXY(touch.pageX, touch.pageY);
						sticks[0].active = true;
					}
				}
				else{
					if(sticks[1].active != true)
					{
						sticks[1].setLimitXY(touch.pageX, touch.pageY);
						sticks[1].setInputXY(touch.pageX, touch.pageY);
						sticks[1].active = true;	
					}
				}		
			}
			else {
				
				this.updateGUI(touch.pageX, touch.pageY);
			}
		}
}

Game.prototype.touchEnd = function(e){ 
	if(this.currentLvl === "tutorial"){
		if(sticks[1].active){
			textManager.upTutorial(0);
		}
		if(sticks[0].active){
			textManager.upTutorial(1);
		}
	}

	var touches = e.changedTouches;
	for(var i = 0; i < touches.length; ++i) {
		var touch = touches[i];
		if(touch.pageX<canvas.width/2){
			sticks[0].active = false;
		}
		else{
			sticks[1].active = false;	
		}		
	}
}




function getDistance(x1,y1,x2,y2){
	var xs = 0;
  	var ys = 0;
 
  	xs = x2 - x1;
  	xs = xs * xs;
 
  	ys = y2 - y1;
 	 ys = ys * ys;
 
  	return sqrt( xs + ys );
}

function sqrt(x) {
    var i;
    var s;
    s=((x/2)+x/(x/2)) / 2; /*first guess*/
    for(i=1;i<=4;i++) { /*average of guesses*/
        s=(s+x/s)/2;
    }
    return s;
}

Game.prototype.updateOverlay = function(e){
	var touchX = e.clientX;//*scaleRatio;
	var touchY = e.clientY;//*scaleRatio;
	if(this.overlayType=== "pause"){
		if(touchX> 475 && touchX < 540 && touchY >260&&touchY <320&& (!multiplayer || _name === "player1")){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.reset(this.currentLvl);
		}
		else if(touchX> 600 && touchX < 670 && touchY >260&&touchY <320){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.goMenu = true;
		}
		else if(touchX> 725 && touchX < 800 && touchY >260&&touchY <320){
			pause = false;
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
		}
	}
	else if(this.overlayType === "win"){
		if(touchX> 475 && touchX < 540 && touchY >260&&touchY <320 && (!multiplayer || _name === "player1")){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			if(allowSound){
				soundManager.stopSound("gameBack");
			}
			this.reset(this.currentLvl);
			if(multiplayer && _name === "player1"){
				client.setLevel(this.currentLvl);
			}
		}
		else if(touchX> 600 && touchX < 670 && touchY >260&&touchY <320){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.goMenu = true;
		}
		else if(touchX> 725 && touchX < 800 && touchY >260&&touchY <320){
			//lvlManager.setLevel();
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.reset(lvlManager.getNextLevel());
			if(multiplayer && _name === "player1"){
				client.setLevel(lvlManager.getNextLevel());
			}
		}	
	}
	else if(this.overlayType === "lose"){
		if(touchX> 540 && touchX < 600 && touchY >260&&touchY <325&& (!multiplayer || _name === "player1")){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.reset(this.currentLvl);
			if(allowSound){
				soundManager.stopSound("gameBack");
			}
			if(multiplayer && _name === "player1"){
				client.setLevel(this.currentLvl);
			}
		}
		else if(touchX> 680 && touchX < 744 && touchY >260&&touchY <320){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.goMenu = true;
		}
	}
}

Game.prototype.updateGUI = function(tX_,tY_){
	var tX = tX_*scaleRatio;
	var tY = tY_*scaleRatio;
	if(tX< this.pauseX+this.btnScale && tX > this.pauseX &&
		tY> this.pauseY && tY < this.pauseY+this.btnScale){
		pause = true;
		this.overlayType = "pause";
	}
	else if(tX> 1100&& tX < 1100 + this.btnScale &&
		tY > 250 && tY < 250 + this.btnScale){
		player.startReload = true;
		if(!player.playOnce&&allowSound){
			player.playOnce = true;
			soundManager.playSound(reloadSnd);
		}
		if(this.currentLvl === "tutorial"){
			textManager.upTutorial(2);
		}
	}
	//1106.699951171875 252.48899841308594 
}

Game.prototype.checkDif=function(n1,n2,dif){
	if(n1 - n2 >=dif ||n2 - n1 >=dif){
		return true;
	}
	return false;
}


Game.prototype.controlMultiplayer = function(stick,stick2){
	this.sendTimer++;
	this.worldSendTimer++;
	if(multiplayer && this.sendTimer>5){//multiplayer check
		var tmpint = 0;
		if(stick2.active){
			tmpint = 1;
		}
		if(this.checkDif(player.x,client.lastX,15)||this.checkDif(player.y,client.lastY,15)||this.checkDif(player.angle,client.lastAng,0.4)){
			client.update(player.x,player.y,player.angle,tmpint);
			client.lastX = player.x;
			client.lastY = player.y;
			client.lastAng = player.angle;
			this.sendTimer =0;
		}
	}
	if(_name === "player1" && this.worldSendTimer > 15 && !enemyManager.boss1.alive){//player 1 will be put in control as the authoritive player. His is the correct game world.
		var tempArr = new Array();
		for(var i = 0; i < enemyManager.enemy.length; ++i){
			//if(this.checkDif(enemyManager.enemy[i].x,enemyManager.enemy[i].lastX,15)||this.checkDif(enemyManager.enemy[i].y,enemyManager.enemy[i].lastY,15)||
			//	this.checkDif(enemyManager.enemy[i].angle,enemyManager.enemy[i].lastAng,0.4)){
				var temp2 = new Array();
				temp2.push(enemyManager.enemy[i].x);
				temp2.push(enemyManager.enemy[i].y);
				temp2.push(enemyManager.enemy[i].rank);
				temp2.push(enemyManager.enemy[i].angle);
				temp2.push(enemyManager.enemy[i].state);
				temp2.push(enemyManager.enemy[i].targetPosX);
				temp2.push(enemyManager.enemy[i].targetPosY);
				tempArr.push(temp2);
				this.worldSendTimer =0;
				
			//}
		}
		client.worldUpdate(tempArr);
	}
	else if(_name === "player1" && this.worldSendTimer > 30 && enemyManager.boss1.alive){
		this.worldSendTimer =0;
		client.bossPos(enemyManager.boss1.x,enemyManager.boss1.y,enemyManager.boss1.state);
	}
}


Game.prototype.pcTutorial = function(){
	if(textManager.tutorialMsgNum ===0){
		if(KeyController.isKeyDown(Key.RIGHT)||KeyController.isKeyDown(Key.LEFT)||KeyController.isKeyDown(Key.SPACE)){
			textManager.upTutorial(0);
		}
	}
	else if(textManager.tutorialMsgNum ===1){
		if(KeyController.isKeyDown(Key.UP)||KeyController.isKeyDown(Key.DOWN)){
			textManager.upTutorial(1);
		}
	}

	else if(textManager.tutorialMsgNum ===2){
		if(KeyController.isKeyDown(Key.R)){
			textManager.upTutorial(2);
		}
	}
}

Game.prototype.update = function(lvl){
	if(!pause){
		if(this.currentLvl === "tutorial"){
			this.pcTutorial();
		}

		this.overlayed = false;
		collisionManager.collisionCall(enemyManager,player,lvlManager);
		for (var i = 0; i < sticks.length; ++i) {
			sticks[i].update();
		}
		var stick = sticks[0];
		var stick2 = sticks[1];
		//if(!enemyManager.bossComing){
			player.update(stick.normal.x,stick.normal.y,stick2.normal.x,stick2.normal.y,stick.active,stick2.active);
		//}
		if(multiplayer){
			player2.update(0,0,0,0,false,player2.shootBool);
			this.controlMultiplayer(stick,stick2);
		}
		for (var j = 0; j < enemyManager.enemy.length; ++j) {
			player.pointToEnemy(enemyManager.enemy[j].x,enemyManager.enemy[j].y);
		}

		for(var i = 0; i< pickUps.length;++i){
			pickUps[i].update();
	    	if (!pickUps[i].alive) {
	    		var index =pickUps.indexOf(i);
	    		pickUps.splice(i, 1);
	    		i--;
	   		}
		}

		enemyManager.update();
		player.allowAimAssist = false;
		
		if(player.lives<=0){
			pause = true;
			if(multiplayer){
				client.deathAlert();
				//view opponent screen
			}
			//else{
				this.overlayType = "lose";
			//}
		}
		if(levelWin){
			pause = true;
			playerCash +=tempCoins;
			this.overlayType = "win";
			var temp = account.getVals();
			client.updateProfile(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7],temp[8]);
		}

		calculateFps(Date.now());
		//this.updateAnalogSticks();
		if (stick.active && (stick.length > threshold)) {
			point.x += (
				(stick.length * stick.normal.x)
				* point.speed
				
			);
			point.y += (
				(stick.length * stick.normal.y)
				* point.speed
				
			);

			if (point.x < point.radius) {
					point.x = point.radius;
			} else if (point.x > (WIDTH - point.radius)) {
					point.x = (WIDTH - point.radius);
			}
			if (point.y < point.radius) {
					point.y = point.radius;
			} else if (point.y > (HEIGHT - point.radius)) {
					point.y = (HEIGHT - point.radius);
			}	
		}
	}//pause

	if(KeyController.isKeyDown(Key.ESC)){
		//backTrack.pause();
		//backTrack.currentTime=0;
		if(timer>20){
			if(!pause){
				pause = true;
				timer=0;
				this.overlayType = "pause";
			}
			else {pause=false;timer =0;this.overlayType = "null";}
			//return "menu";
		}
	}
	if(enemyManager.bossComing){
		this.panCam();
	}
	if(enemyManager.boss1.counter>=7 && multiplayer){
		client.bossHole(enemyManager.boss1.hitAreas);
	}

	if(enemyManager.boss1.state ==="comeUp"||enemyManager.boss1.state ==="flurry"){
		this.shake = true;
	}
	else{
		this.shake = false;
		enemyManager.boss1.doOnce = true;
		if(enemyManager.boss1.state !=="flurry"){
			soundManager.stopSound("flurrySnd");
		}
	}
	if((player.moveStep&&enemyManager.boss1.state ==="dig"&&enemyManager.boss1.canRise)||enemyManager.boss1.state ==="attack"){
		enemyManager.boss1.canRise = false;
		enemyManager.boss1.digTimer =0;
		
		if(multiplayer){
			if(getDistance(player.x,player.y,enemyManager.boss1.x,enemyManager.boss1.y)<
			getDistance(player2.x,player2.y,enemyManager.boss1.x,enemyManager.boss1.y)){
				client.bossState("bossTarget");
			enemyManager.boss1.hearTarget(player.x,player.y);
			}
			else{
				enemyManager.boss1.hearTarget(player2.x,player2.y);
			}
		}
		else{
			enemyManager.boss1.hearTarget(player.x,player.y);
		}
		//this.shake = false;
	}

	if(this.shake){
		this.shakeCam();
	}
	else{
		this.clicker = 0;
	}
	if(this.goMenu){
		//backTrack.pause();
		//backTrack.currentTime=0;
		if(allowSound && !window.mobileAndTabletcheck()){
			soundManager.stopSound("gameBack");
		}
		multiplayer = false;
		return "menu";
	}
	timer++;
	if(KeyController.isKeyDown(Key.ENTER)){
		if(timer>20){	
			if(debugDrawer){
				debugDrawer = false;
				timer =0;
			}
			else{
				debugDrawer = true;
				timer =0;
			}
		}
	}
	return "gameplay";
}



window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
	var fps = 0,
    lastFpsUpdateTime = 0,
    lastAnimationFrameTime = 0;

function calculateFps(now) {
   fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
   }
   return fps;
}


Game.prototype.enemyToPlayerLine = function(j){
	if((lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
		innerX1,innerY1,innerX2,innerY1,j,true))||
		(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
		innerX2,innerY1,innerX2,innerY2,j,true))||
		(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
		innerX2,innerY2,innerX1,innerY2,j,true))||
		(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
		innerX1,innerY2,innerX1,innerY1,j,true))){
		return true;
	}
	return false;
}
Game.prototype.getAngle = function(x,x2,y,y2){
	return Math.atan2(y2-y,x2-x);//*180/Math.PI;
}

Game.prototype.debugDraw = function(){
	ctx.beginPath();
	ctx.moveTo(innerX1,innerY1);
	ctx.lineTo(innerX2,innerY1);
	ctx.lineTo(innerX2,innerY2);
	ctx.lineTo(innerX1,innerY2);
	ctx.lineTo(innerX1,innerY1);
	ctx.stroke();

	//textManager.flashText();
	enemyManager.debugDraw();
	player.debugDraw();
	for (var i = 0; i < enemyManager.enemy.length; ++i) {
		ctx.beginPath();
		ctx.moveTo(player.x,player.y);
		ctx.lineTo(enemyManager.enemy[i].x,enemyManager.enemy[i].y);
		ctx.stroke();
    }
      	lvlManager.debugDraw();
}

Game.prototype.radarDraw = function(){
	for (var i = 0; i < enemyManager.enemy.length; ++i) {
		if(this.enemyToPlayerLine(i)){
    		ctx.drawImage(imgViewRad,enemyManager.enemy[i].interX , enemyManager.enemy[i].interY, 50, 50);
    	}
    }
}

Game.prototype.drawOverlay = function(){
	if(this.overlayType === "pause"){
		ctx.drawImage(imgPauseMenu, -(300 + (mapWidth-2350)),-(200+mapHeight-1445),WIDTH, HEIGHT);
	}
	else if(this.overlayType=== "win"){
		ctx.drawImage(imgWinMenu, -(300 + (mapWidth-2350)),-(200+mapHeight-1445),WIDTH, HEIGHT);
	}
	else if(this.overlayType === "lose"){
		ctx.drawImage(imgLoseMenu,  -(300 + (mapWidth-2350)),-(200+mapHeight-1445),WIDTH, HEIGHT);
	}
	this.overlayed = true;
}

Game.prototype.drawBtns = function(){
	ctx.drawImage(imgPauseBtn,this.pauseX, this.pauseY, this.btnScale, this.btnScale);
	ctx.drawImage(imgReloadBtn,1100, 250, this.btnScale, this.btnScale);
}

Game.prototype.panCam = function(){

}

Game.prototype.shakeCam = function(){
	if(this.shake){
			//if(this.clicker<12){
				this.shakeTimer++;
				if(this.shakeTimer<5){
					this.shakeNum1+=2;
					this.shakeNum2-=2;
				}
				else if(this.shakeTimer<10){
					this.shakeNum1+=2;
					this.shakeNum2+=2;
				}
				else if(this.shakeTimer<15){
					this.shakeNum1-=2;
					this.shakeNum2+=2;
				}
				else if(this.shakeTimer<20){
					this.shakeNum1-=2;
					this.shakeNum2-=2;
				}
				else{
					this.shakeNum1 = 0;
					this.shakeNum2 = 0;
					this.shakeTimer=0;
					//this.clicker++;
				//	enemyManager.bossComing = false;
				}
			//}
			//else{
			//	this.shake = false;
			//}
		}
}

var drawNum=0;
Game.prototype.draw =function (){
	drawNum++;
	if(drawNum%3 ===0){
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative 

	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	//this clamp sets the limits to the world size.
	var camX = clamp(-player.x + canvas.width/2+this.shakeNum1, 0, mapWidth - canvas.width);
    var camY = clamp(-player.y + canvas.height/2+this.shakeNum2, 0, mapHeight - canvas.height);

    //temp
    innerX1 = (clamp(player.x, -800+canvas.width/2 -40, mapWidth - (canvas.width)-270)-WIDTH/2)+40;
    innerY1 =(clamp(player.y, -620+290, mapHeight - (canvas.height)-330) - HEIGHT/2)+40;
    innerX2 =(clamp(player.x, -800+canvas.width/2 -40, mapWidth - (canvas.width)-270)+WIDTH/2)-40;
    innerY2= (clamp(player.y, -620+290, mapHeight - (canvas.height)-330)+ HEIGHT/2)-40;
    //end temp

    player.bigX = clamp(player.x, -800+canvas.width/2 -40, mapWidth - (canvas.width)-270);
    player.bigY = clamp(player.y, -620+290, mapHeight - (canvas.height)-330);
    ctx.translate( camX, camY ); 
    //the numbers offset the background so that it centres with the map
  	lvlManager.draw();
  	//ctx.drawImage(imgBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);
	for (var i = 0; i < pickUps.length; ++i) {
		pickUps[i].draw();
	}	

	enemyManager.draw();
	player.draw();
	if(multiplayer){
		player2.draw();
	}
	if(debugDrawer){
		this.debugDraw();
	}
	if(player.radar){
		this.radarDraw();
	}
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
	for (var i = 0; i < sticks.length; ++i) {
		sticks[i].draw();
	}

	if(!pause){
		this.drawBtns();
		
		textManager.controller(this.currentLvl);
		if(enemyManager.bossComing){
			textManager.flashText();
		}
		if(this.currentLvl === "tutorial"){
			textManager.controlTutorial();
		}
	}
	else {
		//textManager.end(enemyManager.swarmsSurvived);	
		//ctx.drawImage(imgPauseMenu, -(300 + (mapWidth-2350)),-(200+mapHeight-1445),1152, 648);
		this.drawOverlay();
	}
	}
}



function clamp(value, min, max){//used to clamp the cam if the player gets near the edge of the world
    if(value < min){
    	return min;
    }
    else if(value > max){
    	return max;
	}
    return value;
}

function lineIntersect(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y,enemy_id,b) {
 
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;
 
    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
 

 	var x=((p0_x*p1_y-p0_y*p1_x)*(p2_x-p3_x)-(p0_x-p1_x)*(p2_x*p3_y-p2_y*p3_x))/((p0_x-p1_x)*(p2_y-p3_y)-(p0_y-p1_y)*(p2_x-p3_x));
    var y=((p0_x*p1_y-p0_y*p1_x)*(p2_y-p3_y)-(p0_y-p1_y)*(p2_x*p3_y-p2_y*p3_x))/((p0_x-p1_x)*(p2_y-p3_y)-(p0_y-p1_y)*(p2_x-p3_x));
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
        // Collision detected
        if(b){
        enemyManager.enemy[enemy_id].interX = x-25;
        enemyManager.enemy[enemy_id].interY = y-25;}
        return true;
    }
    return false; // No collision
}
