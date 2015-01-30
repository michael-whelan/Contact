
//imgBack.src = "images/Back.png"
imgPauseMenu = new Image();
imgWinMenu = new Image();
imgLoseMenu = new Image();
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
var pickUp;

var pause= false;
var debugDrawer = false;
var timer =0;
var pauseTimer;

function Game (){
	//assetManager = new AssetManager();
	player = new Player(200,100,"player1");
	player2 = new Player(100,100,"player2");
	sticks = [new Stick(inputSize), new Stick(inputSize)];
	fsm = new FSM();
	pickUp = new Pickup();
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

	//this.reset();
}


Game.prototype.reset = function(lvl){
	player.reset();
	player2.reset();
	this.shakeNum1=0;
	this.shakeNum2 =0;
	this.sendTimer =0;
	this.worldSendTimer=0;
	lvlManager.setLevel(lvl);
	pause = false;
	enemyManager.reset(lvl);
	this.currentLvl = lvl;
	textManager.tutorialMsgNum =0;
	//player.init();
	this.goMenu = false;
	levelWin = false;
	textManager.reset();
	lvlManager.mapSetup();
	this.playBackgroundLoop();
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
	//console.log(e.clientX, e.clientY);
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
				//console.log("grid pos: ",lvlManager.getGridPos(player.x,player.y));
				this.updateGUI(touch.pageX, touch.pageY);
			}
			//console.log(e.touches[0].pageX,e.touches[0].pageY);
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

Game.prototype.playBackgroundLoop = function(){
	//an alternative method 
	backTrack.addEventListener('canplaythrough', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	backTrack.play();
};

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
      //console.log("s,",s);
    }
    return s;
}

Game.prototype.updateOverlay = function(e){
	if(this.overlayType=== "pause"){
		if(e.clientX> 475 && e.clientX < 540 && e.clientY >260&&e.clientY <320){
			this.reset(this.currentLvl);
		}
		else if(e.clientX> 600 && e.clientX < 670 && e.clientY >260&&e.clientY <320){
			this.goMenu = true;
			//console.log("go to menu");
		}
		else if(e.clientX> 725 && e.clientX < 800 && e.clientY >260&&e.clientY <320){
			pause = false;
			console.log("hit");
		}
	}
	else if(this.overlayType === "win"){
		if(e.clientX> 475 && e.clientX < 540 && e.clientY >260&&e.clientY <320){
			this.reset(this.currentLvl);
			if(multiplayer && _name === "player1"){
				client.setLevel(this.currentLvl);
			}
		}
		else if(e.clientX> 600 && e.clientX < 670 && e.clientY >260&&e.clientY <320){
			this.goMenu = true;
		}
		else if(e.clientX> 725 && e.clientX < 800 && e.clientY >260&&e.clientY <320){
			//lvlManager.setLevel();
			this.reset(lvlManager.getNextLevel());
			if(multiplayer && _name === "player1"){
				client.setLevel(lvlManager.getNextLevel());
			}
			
		}	
	}
	else if(this.overlayType === "lose"){
		if(e.clientX> 540 && e.clientX < 600 && e.clientY >260&&e.clientY <325){
			this.reset(this.currentLvl);
			if(multiplayer && _name === "player1"){
				client.setLevel(this.currentLvl);
			}
		}
		else if(e.clientX> 680 && e.clientX < 744 && e.clientY >260&&e.clientY <320){
			this.goMenu = true;
		}
	}
}

Game.prototype.updateGUI = function(tX,tY){
	if(tX< this.pauseX+this.btnScale && tX > this.pauseX &&
		tY> this.pauseY && tY < this.pauseY+this.btnScale){
		pause = true;
		this.overlayType = "pause";
	}
	else if(tX> 1100&& tX < 1100 + this.btnScale &&
		tY > 250 && tY < 250 + this.btnScale){
		player.startReload = true;
		if(this.currentLvl === "tutorial"){
			textManager.upTutorial(2);
		}
	}
	//1106.699951171875 252.48899841308594 
}

Game.prototype.controlMultiplayer = function(stick,stick2){
	this.sendTimer++;
	this.worldSendTimer++;
	if(multiplayer && this.sendTimer>5){//multiplayer check
		var tmpint = 0;
		if(stick2.active){
			tmpint = 1;
		}
		client.update(player.x,player.y,player.angle,tmpint);
		this.sendTimer =0;
	}
	if(_name === "player1" && this.worldSendTimer > 15){//player 1 will be put in control as the authoritive player. His is the correct game world.
		var tempArr = new Array();
		for(var i = 0; i < enemyManager.enemy.length; ++i){
			var temp2 = new Array();
			temp2.push(enemyManager.enemy[i].x);
			temp2.push(enemyManager.enemy[i].y);
			temp2.push(enemyManager.enemy[i].angle);
			temp2.push(enemyManager.enemy[i].state);
			temp2.push(enemyManager.enemy[i].targetPosX);
			temp2.push(enemyManager.enemy[i].targetPosY);
			tempArr.push(temp2);
		}
		this.worldSendTimer =0;
		client.worldUpdate(tempArr);
	}
}

Game.prototype.update = function(lvl){
	if(!pause){
		this.overlayed = false;
		collisionManager.collisionCall(enemyManager,player,lvlManager);
		for (var i = 0; i < sticks.length; ++i) {
			sticks[i].update();
		}
		var stick = sticks[0];
		var stick2 = sticks[1];
		player.update(stick.normal.x,stick.normal.y,stick2.normal.x,stick2.normal.y,stick.active,stick2.active);
		if(multiplayer){
			player2.update(0,0,0,0,false,player2.shootBool);
			this.controlMultiplayer(stick,stick2);
		}
		for (var j = 0; j < enemyManager.enemy.length; ++j) {
			player.pointToEnemy(enemyManager.enemy[j].x,enemyManager.enemy[j].y);
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
			this.overlayType = "win";	
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
	if(this.goMenu){
		backTrack.pause();
		backTrack.currentTime=0;
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
	var fps = 0,
    lastFpsUpdateTime = 0,
    lastAnimationFrameTime = 0;

function calculateFps(now) {
   fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;
  // console.log(now - lastAnimationFrameTime);

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
      //fpsElement.innerHTML = fps.toFixed(0) + ' fps';
   }
   //console.log(fps);
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

	textManager.flashText();
	enemyManager.debugDraw();
	player.debugDraw();
	for (var i = 0; i < enemyManager.enemy.length; ++i) {
		ctx.beginPath();
		ctx.moveTo(player.x,player.y);
		ctx.lineTo(enemyManager.enemy[i].x,enemyManager.enemy[i].y);
		//var x = enemyManager.enemy[i].x;
		//var y = enemyManager.enemy[i].y;
		ctx.stroke();
		
	/*	var check1 = this.getAngle(x,player.x,y,player.y);
		var check2 = 0;
		var check3=0;
		var angCon =0;
		for(var j =0; j<lvlManager.objects.length;++j){
			var temp1,temp2,num1,num2;
			angCon = this.getAngle(x,lvlManager.objects[j].x3,y,lvlManager.objects[j].y3);
			var ang = new Array();
			temp1 = temp2 = angCon;
			ang[0] = this.getAngle(x,lvlManager.objects[j].x1,y,lvlManager.objects[j].y1);
			ang[1] = this.getAngle(x,lvlManager.objects[j].x2,y,lvlManager.objects[j].y1);
			ang[2] = this.getAngle(x,lvlManager.objects[j].x2,y,lvlManager.objects[j].y2);
			ang[3] = this.getAngle(x,lvlManager.objects[j].x1,y,lvlManager.objects[j].y2);

			for(var i =0;i<4;++i){
				if(Math.abs(temp1 - angCon) < Math.abs(ang[i]-angCon)){
					temp2 = temp1;
					num2 = num1;
					temp1 = ang[i];
					num1 = i;
				}
			}
			check2 = temp1;
			check3 = temp2;
		}
		if(Math.abs(check1-angCon)<Math.abs(check2-angCon)&&Math.abs(check1-angCon)<Math.abs(check3-angCon)){
			console.log("hidden");
		}

		if(num1 ===0|| num2 ===0){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(lvlManager.objects[0].x1,lvlManager.objects[0].y1);
			ctx.stroke();
		}
		if(num1 ===1||num2 ===1){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(lvlManager.objects[0].x2,lvlManager.objects[0].y1);
			ctx.stroke();
		}
		if(num1 ===2||num2 ===2){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(lvlManager.objects[0].x2,lvlManager.objects[0].y2);
			ctx.stroke();
		}
		if(num1 ===3||num2 ===3){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(lvlManager.objects[0].x1,lvlManager.objects[0].y2);
			ctx.stroke();
		}	*/

		//if(this.enemyToPlayerLine(i)){
    		//ctx.drawImage(imgViewRad,enemyManager.enemy[i].interX , enemyManager.enemy[i].interY, 50, 50);
    	//}
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
	//console.log("overlay type: ",this.overlayType);
	if(this.overlayType === "pause"){
		ctx.drawImage(imgPauseMenu, -(300 + (mapWidth-2350)),-(200+mapHeight-1445),1152, 648);
	}
	else if(this.overlayType=== "win"){
		ctx.drawImage(imgWinMenu, -(300 + (mapWidth-2350)),-(200+mapHeight-1445),1152, 648);
	}
	else if(this.overlayType === "lose"){
		ctx.drawImage(imgLoseMenu,  -(300 + (mapWidth-2350)),-(200+mapHeight-1445),1152, 648);
	}
	this.overlayed = true;
}

Game.prototype.drawBtns = function(){
	ctx.drawImage(imgPauseBtn,this.pauseX, this.pauseY, this.btnScale, this.btnScale);
	ctx.drawImage(imgReloadBtn,1100, 250, this.btnScale, this.btnScale);
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
	pickUp.draw();
	player.draw();
	if(multiplayer){
		player2.draw();
	}
	for (var i = 0; i < enemyManager.enemy.length; ++i) {
		enemyManager.enemy[i].draw();
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
			/*if(textManager.clicker>8){
				if(this.shakeNum1<10){
					this.shakeNum1++;
					this.shakeNum2--;
				}
				else if(this.shakeNum1<20){
					this.shakeNum1++;
					this.shakeNum2++;
				}
				else{
					this.shakeNum1 = -10;
					this.shakeNum2 = 0;
				}
			}*/
		}
		else{
			textManager.clicker = 0;
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
