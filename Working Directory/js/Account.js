function Account(){
	this.coins=0;
}

Account.prototype.registerPlayer= function(name,pass){
	this.gamerId = name;
	this.gamerPass = pass;
}


Account.prototype.setVals = function(name,pass,money,shield,dmg,bomb,health,reload,radar){
	this.gamerId = name;
	this.gamerPass = pass;
	playerCash = money;
	shop.shieldLvl=shield;
	shop.AmmoLvl=dmg;
	shop.BombLvl=bomb;
	shop.HealthLvl=health;
	shop.other1Lvl=reload;
	shop.other2Lvl=radar;
}

Account.prototype.getVals = function()
{
	return [this.gamerId,
	this.gamerPass,
	playerCash,
	shop.shieldLvl,
	shop.AmmoLvl,
	shop.BombLvl,
	shop.HealthLvl,
	shop.other1Lvl,
	shop.other2Lvl];
}