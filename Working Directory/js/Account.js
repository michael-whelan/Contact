function Account(){}

Account.registerPlayer= function(name,pass){
	this.gamerId = name;
	this.gamerPass = pass;
	console.log(name,pass);
}

Account.getVals = function()
{
	return[this.gamerId,this.gamerPass];
}