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
var titleMusic = null;
var silence = null;
var buttonSnd = null;
var imgSelectX = new Image();
var imgLoginBtn = new Image();
var imgCustBtn = new Image();
var imgShopBtn = new Image();

var imgTPlayBtn = new Image();
var imgTMultBtn = new Image();
var imgTStashBtn = new Image();
var imgTExitBtn = new Image();
var imgTInfo = new Image();
var imgTSnd = new Image();
var imgTSndOff = new Image();
var imgLeftArrow = new Image();
var imgRightArrow = new Image();

var imgChar1 = new Image();
var imgChar2 = new Image();
var imgChar3 = new Image();

var shop;

function Menu (){
	this.returnVals = ["null","null"]; //[state,scene]
	this.btnPos = [[1015,83],[1015,205],[1015,325],[1015,445],[1015,560]];
	this.gunBtn = [[830,270],[830,389]];
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
    this.currLvl = 0;
    this.currChar = 0;
    this.char1X = 218;
    this.char1XTarg = 218;
    this.doOnce = true;
    this.titleSelected = false;
    //custom upgrades
}

Menu.prototype.reset = function() {
	this.returnVals = ["null","null"]; //[state,scene]
	this.scene;
	this.currLvl = 0;
	this.scrollX = 0;
	this.lvl1X = 1152;
	this.lvlTutX=0;
    this.drawExit = false;
    if(!window.mobileAndTabletcheck()&&allowSound){
		soundManager.playSoundLoop(titleMusic,"menuBack");
	}
	this.setBtn();
    //soundManager.playSoundLoop(titleMusic,"menuBack");
    //this.playBackgroundLoop();
}
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

Menu.prototype.setBtn = function(){
	this.titleBtnPos = [[970,240,"levelSelect",imgTPlayBtn,220,160],[970,375,"multiplayer",imgTMultBtn,300,90],
						[970,475,"stash",imgTStashBtn,300,90],[975,575,"Exit",imgTExitBtn,300,66]];
	this.titleBtnPos2 = [[250,164,"login",imgLoginBtn,250,80],[85,560,"info",imgTInfo,100,100],[235,560,"sound",imgTSnd,100,100]];
	this.charArrowPos = [[270,560,imgLeftArrow],[500,560,imgRightArrow]];
}

Menu.prototype.update = function() {
	if(this.doOnce){
		this.setBtn();
		this.doOnce = false;
	}


	if(this.char1X< this.char1XTarg){
		this.char1X+=5;
	}
	else if(this.char1X> this.char1XTarg){
		this.char1X-=5;
	}
	this.timer++;
	if(this.returnVals[0] === "null"){
		return ["menu","titleScreen"];
	}
	if(this.returnVals[1] === "levelSelect"){
		this.updateScroll();
	}
	if(this.returnVals[1] === "multiplayer"&&this.allow1){
		//client = new Client();
		this.allow1=false;
	}
	if(this.scene ==="multiplayer"){
		if(multiplayer && _name ==="player1"){
			this.returnVals =["menu","levelSelect"];
			//return ["menu","levelSelect"];
		}
	}
	var temp = this.returnVals;
	if(this.returnVals[0] ==="gameplay"){
		if(!window.mobileAndTabletcheck()&&allowSound){
			soundManager.stopSound("menuBack");
		}
	}
	if(this.returnVals[1] ==="titleScreen" && this.scene !=="titleScreen"){
		this.setBtn();
		this.titleSelected = false;
	}
	//this.returnVals = ["null","null"];
	if(this.titleSelected === true){
		for(var i =0; i< this.titleBtnPos.length; ++i){
			this.titleBtnPos[i][0]+=3*i+1;
		}
		for(var i =0; i< 3; ++i){
			this.titleBtnPos2[i][0]-=3*i+1;
		}
		
	}
	if(this.titleBtnPos[0][0] >= 1600){
		this.titleSelected = false;
	}
	return temp;
}




//temp
Menu.prototype.mouseDown= function(e){
	soundManager.playSound(silence);
	var mX = e.clientX;
	var mY = e.clientY;

	if(this.scene=== "titleScreen"){
		if(this.drawExit){
			if(e.clientX >  350  && e.clientX <585&&e.clientY>330&&e.clientY<400){//770,190,955,375
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}				window.close();
			//	window.location = "/register.html";

			}
			else if(e.clientX >  600  && e.clientX <825&&e.clientY>330&&e.clientY<400){//770,190,955,375
				if(allowSound){
					soundManager.playSound(buttonSnd);
				}
				this.drawExit = false;
			}
		}
		else {
			for(var i =0; i< this.titleBtnPos.length; ++i){
				if((mX > this.titleBtnPos[i][0]-(this.titleBtnPos[i][4]/2)) &&((this.titleBtnPos[i][4]/2)+this.titleBtnPos[i][0] >mX) &&
					(mY>this.titleBtnPos[i][1]-(this.titleBtnPos[i][5]/2))&&((this.titleBtnPos[i][5]/2)+this.titleBtnPos[i][1] >mY)){
					if(allowSound){
						soundManager.playSound(buttonSnd);
					}
					if(i === 3){
						this.drawExit = true;
					}
					else{	
						this.returnVals = ["menu",this.titleBtnPos[i][2]];
						transitionTimer=0;
						this.titleSelected = true;
					}
				}
			}
			for(var i =0; i< this.titleBtnPos2.length; ++i){
				if((mX > this.titleBtnPos2[i][0]-(this.titleBtnPos2[i][4]/2)) &&((this.titleBtnPos2[i][4]/2)+this.titleBtnPos2[i][0] >mX) &&
					(mY>this.titleBtnPos2[i][1]-(this.titleBtnPos2[i][5]/2))&&((this.titleBtnPos2[i][5]/2)+this.titleBtnPos2[i][1] >mY)){
					if(this.titleBtnPos2[i][2]==="login" && !window.mobileAndTabletcheck()){
						if(allowSound){
							soundManager.playSound(buttonSnd);
						}
						var iframe = document.createElement('iframe');
						iframe.style.visibility="visible";
						iframe.style.position = "absolute";
						iframe.style.left="30px";
						iframe.style.top="30px";
						iframe.src = "login.html";
						document.body.appendChild(iframe);
						var can = document.getElementById('canvasId');
						can.style.visibility = "hidden";
					}
					else if(this.titleBtnPos2[i][2]==="sound"){
						if(allowSound){
							if(!window.mobileAndTabletcheck()){
								soundManager.stopSound("menuBack");
							}
							allowSound = false;
							this.titleBtnPos2[2][3] = imgTSndOff;
						}
						else if(!allowSound){
							allowSound = true;
							soundManager.playSound(buttonSnd);
							this.titleBtnPos2[2][3] = imgTSnd;
							if(!window.mobileAndTabletcheck()){
								soundManager.playSoundLoop(titleMusic,"menuBack");
							}
						}
					}
				}//if a button selected
			}//for buttons
		}//draw exit
	}
	else if(this.scene=== "levelSelect" && (_name==="player1"|| !multiplayer)){
		var mX = e.clientX;
		var mY = e.clientY;
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
			transitionTimer=0;
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
		}
		else if(sqrt((this.custBtnPos[0] -mX)*(this.custBtnPos[0] -mX) +(this.custBtnPos[1] -mY)*(this.custBtnPos[1] -mY)) <50){
			this.returnVals = ["menu","custom"];
			transitionTimer=0;
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
		}
		else if(sqrt((this.shopBtnPos[0] -mX)*(this.shopBtnPos[0] -mX) +(this.shopBtnPos[1] -mY)*(this.shopBtnPos[1] -mY)) <50){
			this.returnVals = ["menu","armory"];
			transitionTimer=0;
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
		}
		else if(e.clientX >  300  && e.clientX <700&&e.clientY>300&&e.clientY<500){//770,190,955,375
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			if(this.currLvl ===0){
				this.returnVals = ["gameplay","tutorial"];
				if(multiplayer){
					client.setLevel("tutorial");
					client.setPlayer("blue",this.selectedGun);
				}
			}
			else if(this.currLvl ===1){
				this.returnVals = ["gameplay","level1"];
				if(multiplayer){
					client.setLevel("level1");
					client.setPlayer("blue",this.selectedGun);
				}
			}
			else if(this.currLvl ===2){
				this.returnVals = ["gameplay","level2"];
				if(multiplayer){
					client.setLevel("level2");
					client.setPlayer("blue",this.selectedGun);
				}
			}
		}
		else if(e.clientX < 300 && this.currLvl >0){
			//scroll left
			this.currLvl--;
			this.scrollX += 1152;
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
		}	
		else if(e.clientX > 700 && this.currLvl <2){
			//scroll right
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.currLvl++;
			this.scrollX -=1152;
		}
	}
	else if(this.scene ==="multiplayer"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
			transitionTimer=0;
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
		}
		/*else if(e.clientX>490 && e.clientX < 635&& e.clientY >200 && e.clientY < 280){
			client.host();
			client.connecting = true;
		}*/
		else if(e.clientX>490 && e.clientX < 635&& e.clientY >300 && e.clientY < 380){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			client.join();
		}

	}
	else if(this.scene ==="stash"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","titleScreen"];
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			transitionTimer=0;
		}
		else if(e.clientX > 70  && e.clientX <580&&e.clientY>75&&e.clientY<630){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.returnVals = ["menu","custom"];	
			transitionTimer=0;
		}
		else if(e.clientX > 630  && e.clientX <1120&&e.clientY>75&&e.clientY<630){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			this.returnVals = ["menu","armory"];
			transitionTimer=0;
		}
	}
	else if(this.scene === "armory"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","stash"];
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			transitionTimer=0;
			var temp = account.getVals();
			client.updateProfile(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7],temp[8]);
		}
		shop.update(e.clientX,e.clientY);
	}
	else if(this.scene === "custom"){
		if(e.clientX>this.backX && e.clientX < this.backX+this.backW&& e.clientY >this.backY && e.clientY < this.backY + this.backH){
			this.returnVals = ["menu","stash"];
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
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
    }
    return s;
}

Menu.prototype.updateCustom = function(mX,mY){

	for(var i =0; i< this.charArrowPos.length; ++i){
		if((mX > this.charArrowPos[i][0]-70/2) &&(70/2+this.charArrowPos[i][0] >mX) &&
			(this.charArrowPos[i][1]-122/2 <mY)&&(122/2+this.charArrowPos[i][1] >mY)){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
			if(i ===0 && this.currChar>0){
				this.currChar--;
				this.char1XTarg +=400;
			}
			else if(i === 1 &&this.currChar <2){
				this.char1XTarg -=400;
				this.currChar++;
			}
		}
	}

	//0 = radar, 1 = bomb, 2 = shield
	for(var j =0; j<5;++j){
		if(sqrt((this.btnPos[j][0] -mX)*(this.btnPos[j][0] -mX) +(this.btnPos[j][1] -mY)*(this.btnPos[j][1] -mY)) <40){
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
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
			if(allowSound){
				soundManager.playSound(buttonSnd);
			}
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
		//ctx.drawImage(imgLoginBtn,100,100,289,109);
		for(var i =0; i< this.titleBtnPos.length; ++i){
			ctx.drawImage(this.titleBtnPos[i][3],(this.titleBtnPos[i][0]-this.titleBtnPos[i][4]/2),
				this.titleBtnPos[i][1] -this.titleBtnPos[i][5]/2 ,this.titleBtnPos[i][4],this.titleBtnPos[i][5]);
		}
		for(var i =0; i< this.titleBtnPos2.length; ++i){
			if(!(window.mobileAndTabletcheck()&&this.titleBtnPos2[i][2]==="login")){
				ctx.drawImage(this.titleBtnPos2[i][3],this.titleBtnPos2[i][0]-this.titleBtnPos2[i][4]/2,
					this.titleBtnPos2[i][1] -this.titleBtnPos2[i][5]/2 ,this.titleBtnPos2[i][4],this.titleBtnPos2[i][5]);
			}
		}
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
		if(KeyController.isKeyDown(Key.P)){
				var temp = Account.getVals();
			}
		ctx.drawImage(imgMultiplayerBack, 0,0,1152,648);
		if(client.connecting){
			ctx.drawImage(imgLoader, 0,0,canvas.width ,canvas.height);
			textManager.connecting();
		}
		else{
		//	ctx.drawImage(imgJoinServer, canvas.width/2-60, canvas.height/2-140,120,80);
			ctx.drawImage(imgJoinServer, canvas.width/2-60, canvas.height/2-40,120,80);
		}
	}
	else if(scene ==="stash"){
		ctx.drawImage(imgStashBack, 0,0,1152,648);
	}
	else if(scene ==="armory"){
		shop.draw();
	}
	else if(scene ==="custom"){
		ctx.drawImage(imgCustomBack,210,0,1852,648);
		ctx.drawImage(imgChar1,this.char1X,50,340,600);
		ctx.drawImage(imgChar2,this.char1X+400,50,340,600);
		ctx.drawImage(imgChar3,this.char1X+800,50,340,600);
		ctx.drawImage(imgCustomBack, 0,0,1152,648);
		for(var i =0; i< this.charArrowPos.length; ++i){
			ctx.drawImage(this.charArrowPos[i][2], this.charArrowPos[i][0]-70/2,this.charArrowPos[i][1]-122/2,70,122);
		}
		if(equipment[0]!==-1){
			ctx.drawImage(imgSelectX,this.btnPos[equipment[0]][0]-55,this.btnPos[equipment[0]][1]-30,115,84);
		}
		if(equipment[1]!==-1){
			ctx.drawImage(imgSelectX,this.btnPos[equipment[1]][0]-50,this.btnPos[equipment[1]][1]-35,115,84);
		}
		if(this.selectedGunI !==-1){
			ctx.drawImage(imgSelectX,this.gunBtn[this.selectedGunI][0]-55,this.gunBtn[this.selectedGunI][1]-30,120,80);
		}
	}
	if(scene !=="titleScreen"){
		ctx.drawImage(imgBackArrow, this.backX,this.backY,this.backW,this.backH);
	}
}