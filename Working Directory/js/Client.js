var multiplayer = false;
var message = {
	pid: "",
	type: "",
	data:""
};


var WAITING_FOR_PLAYERS="0";
var STARTING_GAME="1";

function Client(){
var that=this;

var host='192.168.15.7';
//var host = '149.153.102.45';
//var host = '23.97.140.22';
var port=8080;

this.ws = new WebSocket("ws://" + host + ":" + port +'/wstest');

this.ws.onmessage = function(evt) {that.handleMessage(evt); };

this.ws.onclose = function(evt) { console.log("Connection close"); game.goMenu = true;};

this.ws.onopen = function(evt) { console.log('open connection'); };    

    this.connecting = false;     
}

Client.prototype.generateId = function () {
	var rand= Math.random()*(50-1) +1; 
	return rand;
}
Client.prototype.host = function(){
	console.log("host button");
	message.pid = this.generateId();
	message.type = "host";
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.join = function(){
	message.pid =this.generateId();
	message.type = "join";
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.register = function(name,pass){
	console.log("register");
	message.pid =this.generateId();
	message.type = "register";
	message.data = [name,pass];
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}


Client.prototype.setLevel = function(level){
	//message.pid = _name;
	message.type = "setLevel";
	message.data = level;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.update = function(x,y,o,shootBool){
//console.log("updating multiplayer");
	//message.pid = _name;
	message.type = "updatePos";
	message.data = [x,y,o,shootBool];
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}
Client.prototype.killEnemy = function(j){
//console.log("updating multiplayer");
	//message.pid = _name;
	message.type = "killEnemy";
	message.data = j;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}
Client.prototype.worldUpdate = function(arr){
//console.log("updating multiplayer");
	//message.pid = _name;
	message.type = "worldUp";
	message.data = arr;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}


Client.prototype.bossState = function(effect){
//console.log("updating multiplayer");
	//message.pid = _name;
	message.type = effect;
	message.data = "junk";
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.bossHole = function(arr){
//console.log("updating multiplayer");
	//message.pid = _name;
	message.type = "bossHole";
	message.data = arr;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}
Client.prototype.bossPos = function(x,y,state){
	//message.pid = _name;
	message.type = "bossPos";
	message.data = [x,y,state];
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.deathAlert = function(){
//console.log("updating multiplayer");
	//message.pid = _name;
	message.type = "playerDeath";
	message.data = 0;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.handleMessage = function(evt){

	var mess = JSON.parse(evt.data);
	//console.log(mess);
	//console.log(mess.data);
	if (mess.type ==="state"){
		p2Ip = mess.dest;
		if(mess.data === WAITING_FOR_PLAYERS){
			this.connecting = true;
		console.log("waiting for players");
		_name = "player1";
		}
		else if(mess.data === STARTING_GAME){
			this.connecting = true;
			console.log("Starting Game");
			if(_name ==="junk"){
				_name = "player2";
			}
			multiplayer = true;
		}
	}
	else if(mess.type === "setLevel"){
	//lvlManager.setLevel(mess.data);
		menu.returnVals = ["gameplay",mess.data];
		game.reset(mess.data);
	}
	else if(mess.type === "updatePos"){
		var messA = mess.data;
		player2.setPos(messA[0],messA[1],messA[2],messA[3]);
	}
	else if(mess.type === "alreadyTaken"){
		console.log("alreadyTaken");
		
	}
	else if(mess.type === "reg"){
		createAccount();
		
	}
	else if(mess.type === "bossHit"){
		enemyManager.boss1.health--;
	}
	else if(mess.type === "bossPos"){
		var messA = mess.data;
		enemyManager.boss1.x = messA[0];
		enemyManager.boss1.y = messA[1];
		enemyManager.boss1.state = messA[2];
	}
	else if(mess.type === "bossHole"){
		var messA = mess.data;
		enemyManager.boss1.hitAreas=messA;
	}
	else if(mess.type === "bossTarget"){
		var messA = mess.data;
		enemyManager.boss1.hearTarget(player2.x,player2.y);
	}
	else if(mess.type === "worldUp"){
		var messA = mess.data;
		enemyManager.setEnemyPos(messA);
	}
	else if(mess.type === "killEnemy"){
		enemyManager.kill(mess.data);
	}
	else if(mess.type === "playerDeath"){
		textManager.playerDied = true;
		player2.dead = true;
	}
	else if(mess.type ==="lose")
	{
		console.log(mess.data);
	}
}