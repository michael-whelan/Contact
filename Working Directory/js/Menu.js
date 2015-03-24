var imgTitleScreen = new Image();
var imgLvlSelBack = new Image();
var imgLvlSel1 = new Image();
var imgLvlSel2 = new Image();
var imgLvlSelTut = new Image();
var imgBackArrow = new Image();
var imgMultiplayerBack = new Image();
var imgStashBack = new Image();
var imgArmoryBack = new Image();
var imgCustomBack = new Image();
var imgExitPrompt = new Image();
var titleMusic = new Audio();
var imgSelectX = new Image();
var imgCustBtn = new Image();
var imgShopBtn = new Image();
var shop;

function Menu (){
	this.returnVals = ["null","null"]; //[state,scene]
	this.btnPos = [[1015,105],[1015,215],[1015,345],[1015,445],[1015,560]];
	this.gunBtn = [[830,270],[830,400]];
	this.custBtnPos = [200,50];
	this.shopBtnPos = [300,50];
	this.selectedGunI = -1;
	this.scene;
	this.scrollX = 0;
	this.lvl1X = 1152;
	this.lvlTutX=0;
	this.backX= 80;
    this.backY=15;
    this.backW = 50;
    this.backH=50;
    this.drawExit = false;
    this.allow1=true;
    shop = new Shop();
    this.timer=0;
    this.selectedGun = "assault";
    //custom upgrades

}

Menu.prototype.reset = function() {
	this.returnVals = ["null","null"]; //[state,scene]
	this.scene;
	this.scrollX = 0;
	this.lvl1X = 1152;
	this.lvlTutX=0;
    this.drawExit = false;
    this.playBackgroundLoop();
}

Menu.prototype.update = function() {
	this.timer++;
	if(this.returnVals[0] === "null"){
		return ["menu","titleScreen"];
	}
	if(this.returnVals[1] === "levelSelect"){
		this.updateScroll();
	}
	if(this.returnVals[1] === "multiplayer"&&this.allow1){
		client = new Client();
		this.allow1=false;
	}
	var temp = this.returnVals;
	//this.returnVals = ["null","null"];
	return temp;
}

Menu.prototype.playBackgroundLoop = function(){
	//an alternative method 
	titleMusic.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	titleMusic.play();
};


//temp
Menu.prototype.mouseDown= function(e){
	//console.log(e.clientX ,e.clientY);
	
	if(this.scene=== "titleScreen"){
		if(this.drawExit){
			if(e.clientX >  350  && e.clientX <585&&e.clientY>330&&e.clientY<400){//770,190,955,375
				console.log("Exit");
				window.close();
			}
			else if(e.clientX >  600  && e.clientX <825&&e.clientY>330&&e.clientY<400){//770,190,955,375
				this.drawExit = false;
			}
		}
		else {
			if(e.clientX >  860  && e.clientX <1075&&e.clientY>160&&e.clientY<315){//770,190,955,375
				this.returnVals = ["menu","levelSelect"];
				transitionTimer=0;
			}
			else if(e.clientX >  820  && e.clientX <1100&&e.clientY>350&&e.clientY<410){//770,190,955,375
				this.returnVals = ["menu","multiplayer"];
				transitionTimer=0;
			}
			else if(e.clientX >  820  && e.clientX <1100&&e.clientY>450&&e.clientY<510){//770,190,955,375
				this.returnVals = ["menu","stash"];
				transitionTimer=0;
			}
			else if(e.clientX >  820  && e.clientX <1100&&e.clientY>550&&e.clientY<610){//770,190,955,375
				//Exit
				console.log("Exit");
				this.drawExit = true;
			}
		}
	}
	else if(this.scene=== "levelSelect" && (_name==="player1"|| !multiplayer)){
		console.log(e.clientX ,e.clientY);
		var mX = e.clientX;
		var mY = e.clientY;
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
			transitionTimer=0;
		}
		else if(sqrt((this.custBtnPos[0] -mX)*(this.custBtnPos[0] -mX) +(this.custBtnPos[1] -mY)*(this.custBtnPos[1] -mY)) <50){
			this.returnVals = ["menu","custom"];
			transitionTimer=0;
		}
		else if(sqrt((this.shopBtnPos[0] -mX)*(this.shopBtnPos[0] -mX) +(this.shopBtnPos[1] -mY)*(this.shopBtnPos[1] -mY)) <50){
			this.returnVals = ["menu","armory"];
			transitionTimer=0;
		}
		else if(e.clientX >  this.lvl1X+300  && e.clientX <this.lvl1X+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.returnVals = ["gameplay","level1"];
			if(multiplayer){
				client.setLevel("level1");
			}
		}
		else if(e.clientX >  (this.lvl1X+1152)+300  && e.clientX <(this.lvl1X+1152)+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.returnVals = ["gameplay","level2"];
			if(multiplayer){
				client.setLevel("level2");
			}
		}
		else if(e.clientX >  this.lvlTutX+300  && e.clientX <this.lvlTutX+700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			this.returnVals = ["gameplay","tutorial"];
			client.setLevel("tutorial");
		}
		else if(e.clientX < 300){
			//scroll left
			console.log("scrollX");
			this.scrollX += 1152;
		}	
		else if(e.clientX > 700){
			//scroll right
			this.scrollX -=1152;
		}
	}
	else if(this.scene ==="multiplayer"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
			transitionTimer=0;
		}
		else if(e.clientX>490 && e.clientX < 635&& e.clientY >200 && e.clientY < 280){
			client.host();
		}
		else if(e.clientX>490 && e.clientX < 635&& e.clientY >300 && e.clientY < 380){
			client.join();
		}
		if(multiplayer){
			this.returnVals = ["menu","levelSelect"];
			transitionTimer=0;
			console.log("multiplayer");
		}
	}
	else if(this.scene ==="stash"){
		console.log(e.clientX ,e.clientY);
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
			transitionTimer=0;
		}
		else if(e.clientX > 70  && e.clientX <580&&e.clientY>75&&e.clientY<630){
			console.log("custom");
			this.returnVals = ["menu","custom"];	
			transitionTimer=0;
		}
		else if(e.clientX > 630  && e.clientX <1120&&e.clientY>75&&e.clientY<630){
			console.log("upgrade");
			this.returnVals = ["menu","armory"];
			transitionTimer=0;
		}
	}
	else if(this.scene === "armory"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","stash"];
			transitionTimer=0;
		}
		shop.update(e.clientX,e.clientY);
	}
	else if(this.scene === "custom"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","stash"];
			transitionTimer=0;
		}
		this.updateCustom(e.clientX,e.clientY);
	}
}
//end temp

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

Menu.prototype.updateCustom = function(mX,mY){
	//0 = radar, 1 = bomb, 2 = shield
	for(var j =0; j<5;++j){
		if(sqrt((this.btnPos[j][0] -mX)*(this.btnPos[j][0] -mX) +(this.btnPos[j][1] -mY)*(this.btnPos[j][1] -mY)) <40){
			for(var i = 0; i < 2;++i){
				var q=0;
				if(i ===0){
					q = 1;
				}else{
					q = 0;
				}
				if(equipment[i]===j){
					equipment[i]=-1;
				}
				else if(equipment[i]===-1 && q!==j){
					if(shop.checkLvl(this.getEquipType(j))>0){
						equipment[i]=j;
					}
					break;
				}
			}
		}
	}
	for(var i =0;i<2;i++){
		if(sqrt((this.gunBtn[i][0] -mX)*(this.gunBtn[i][0] -mX) +(this.gunBtn[i][1] -mY)*(this.gunBtn[i][1] -mY)) <40){
			var q;
			this.selectedGunI = i;
			if(i ===0){
				q = 1;
			}else{
				q = 0;
			}
			this.selectedGun = this.selectGun(i);
		}
	}
}

Menu.prototype.selectGun = function(num){
	if(num ===0){
		return "assault";
	}
	else if(num === 1){
		return "shotgun";
	}
}

Menu.prototype.getEquipType = function(num){
	if(num ===0){
		return "radar"
	}
	else if(num ===1){
		return "bomb";
	}
	else if(num ===2){
		return "shield"
	}
}
Menu.prototype.getEquipLvl = function(eType){
	if(eType===0){
		return shop.other2Lvl;
	}
	else if(eType===1){
		return shop.BombLvl;	
	}
	else if(eType===2){
		return shop.shieldLvl;
	}
}

Menu.prototype.updateScroll = function(){
	if(this.lvlTutX < this.scrollX){
		this.lvlTutX+=10;
		this.lvl1X+=10;
	}else if(this.lvlTutX > this.scrollX){
		this.lvlTutX-=10;
		this.lvl1X-=10;
	}
	if(this.lvlTutX<this.scrollX+8 &&this.lvlTutX>this.scrollX-8){
		this.lvlTutX=this.scrollX;
		//this.lvl1X-=10;
	}
}

Menu.prototype.touchMove= function(e){
	e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
		var touch = e.touches[i];
	}
}

Menu.prototype.touchStart = function(e){ 
	e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
		var touch = e.touches[i];
		if(touch.pageX >  860  && touchXScaled <1075&&touch.pageY>160&&touchYScaled<315){//860,160,1075,315
			this.lvlSel = true;
		}
	}
}

Menu.prototype.touchEnd = function(e){ 
	var touches = e.changedTouches;
	for (var i = 0; i < touches.length; ++i) {

	}
}

Menu.prototype.draw = function(scene){
	this.scene = scene;
	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	
	if(scene ==="titleScreen"){

		ctx.drawImage(imgTitleScreen, 0,0,1152,648);

		if(this.drawExit){
			ctx.drawImage(imgExitPrompt, 0,0,1152,648);
		}
	}
	else if(scene === "levelSelect"){
		ctx.drawImage(imgLvlSelBack, 0,0,1152,648);
		ctx.drawImage(imgLvlSel2, this.lvl1X+1152,0,1152,648);
		ctx.drawImage(imgLvlSel1, this.lvl1X,0,1152,648);
		ctx.drawImage(imgLvlSelTut,this.lvlTutX,0,1152,648);
		ctx.drawImage(imgShopBtn,this.shopBtnPos[0]-50,this.shopBtnPos[1]-50,100,100);
		ctx.drawImage(imgCustBtn,this.custBtnPos[0]-50,this.custBtnPos[1]-50,100,100);
	}
	else if(scene ==="multiplayer"){
		ctx.drawImage(imgMultiplayerBack, 0,0,1152,648);
		ctx.drawImage(imgJoinServer, canvas.width/2-60, canvas.height/2-140,120,80);
		ctx.drawImage(imgJoinServer, canvas.width/2-60, canvas.height/2-40,120,80);
	}
	else if(scene ==="stash"){
		ctx.drawImage(imgStashBack, 0,0,1152,648);
	}
	else if(scene ==="armory"){
		shop.draw();
	}
	else if(scene ==="custom"){
		ctx.drawImage(imgCustomBack, 0,0,1152,648);
		if(equipment[0]!==-1){
			ctx.drawImage(imgSelectX,this.btnPos[equipment[0]][0]-50,this.btnPos[equipment[0]][1]-35,100,70);
		}
		if(equipment[1]!==-1){
			ctx.drawImage(imgSelectX,this.btnPos[equipment[1]][0]-50,this.btnPos[equipment[1]][1]-35,100,70);
		}
		if(this.selectedGunI !==-1){
			ctx.drawImage(imgSelectX,this.gunBtn[this.selectedGunI][0]-50,this.gunBtn[this.selectedGunI][1]-35,100,70);
		}
	}
	if(scene !=="titleScreen"){
		ctx.drawImage(imgBackArrow, this.backX,this.backY,this.backW,this.backH);
	}
}