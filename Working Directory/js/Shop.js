


function Shop (){
	this.shieldLvl=0;
	this.AmmoLvl=0;
	this.BombLvl=0;
	this.HealthLvl=0;
	this.other1Lvl=0;
	this.other2Lvl=0;
}

Shop.prototype.reset = function() {

}


Shop.prototype.checkLvl =function(type){
	if(type ==="radar"){
		return this.other2Lvl;
	}
	else if(type === "shield"){
		return this.shieldLvl;
	}
	else if(type === "bomb"){
		return this.BombLvl;
	}
}

Shop.prototype.update = function(mX,mY){
	if(mX >92 && mX<336 && mY >98 && mY < 345&&this.shieldLvl<5 && playerCash>= 100*(this.shieldLvl+1)){
		this.shieldLvl++;
		playerCash-= 100*this.shieldLvl;
	}
	else if(mX >450 && mX<700 && mY >98 && mY < 345&&this.AmmoLvl<5&& playerCash>= 100*(this.AmmoLvl+1)){
		this.AmmoLvl++;
		playerCash-= 100*this.AmmoLvl;
	}
	else if(mX >810 && mX<1060 && mY >98 && mY < 345&&this.BombLvl<5&& playerCash>= 100*(this.BombLvl+1)){
		this.BombLvl++;
		playerCash-= 100*this.BombLvl;
	}
	else if(mX >92 && mX<336 && mY >375 && mY < 615&&this.HealthLvl<5&& playerCash>= 100*(this.HealthLvl+1)){
		this.HealthLvl++;
		playerCash-= 100*this.HealthLvl;
	}
	else if(mX >450 && mX<700 && mY >375 && mY < 615&&this.other1Lvl<5&& playerCash>= 100*(this.other1Lvl+1)){
		this.other1Lvl++;
		playerCash-= 100*this.other1Lvl;
	}
	else if(mX >810 && mX<1060 && mY >375 && mY < 615&&this.other2Lvl<5&& playerCash>= 100*(this.other2Lvl+1)){
		this.other2Lvl++;
		playerCash-= 100*this.other2Lvl;
	}
}

Shop.prototype.draw = function(){
	ctx.drawImage(imgArmoryBack, 0,0,1152,648);
	textManager.drawShop(this.shieldLvl,
						this.AmmoLvl,
						this.BombLvl,
						this.HealthLvl,
						this.other1Lvl,
						this.other2Lvl);
}