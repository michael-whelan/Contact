var multiplayer = false;
var message = {
	pid: "null",
	type: "",
	data:""
};


var WAITING_FOR_PLAYERS="0";
var STARTING_GAME="1";

function Client(){

this.lastX = 0;
this.lastY = 0;
this.lastAng = 0;
var that=this;

//var host='192.168.15.4';
var host = '149.153.102.45';
//var host = '23.97.140.22';
var port=8080;
var port2=8090;
//var port=28000;
//var port2=28002;


this.ws = new WebSocket("ws://" + host + ":" + port +'/wstest');
this.ws2 = new WebSocket("ws://" + host + ":" + port2 +'/wstest');

this.ws.onmessage = function(evt) {that.handleMessage(evt); };

this.ws.onclose = function(evt) { console.log("Multi Connection close"); game.goMenu = true;};

this.ws.onopen = function(evt) { console.log('Milti open connection');};    

this.ws2.onmessage = function(evt) {that.handleMessage(evt); };

this.ws2.onclose = function(evt) { console.log("Reg Connection close"); };

this.ws2.onopen = function(evt) { console.log('Reg open connection'); //window.location = "/register.html";
};    
    this.connecting = false; 
}



Client.prototype.generateId = function () {
	var rand= Math.random()*(50-1) +1; 
	return rand;
}
Client.prototype.host = function(){
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
	message.pid =this.generateId();
	message.type = "register";
	message.data = [name,pass];
	var mess = JSON.stringify(message);
	this.ws2.send(mess);
}
Client.prototype.checkLogin = function(name,pass){
	message.pid =this.generateId();
	message.type = "checkLogin";
	message.data = [name,pass];
	var mess = JSON.stringify(message);
	this.ws2.send(mess);
}

Client.prototype.writeError = function(error){
	message.type = "error";
	message.data = error;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.updateProfile = function(name,pass,money,shield,dmg,bomb,health,reload,radar){
	//message.pid =this.generateId();
	message.type = "updateProfile";
	message.data = [name,pass,money,shield,dmg,bomb,health,reload,radar];
	var mess = JSON.stringify(message);
	this.ws2.send(mess);
}


Client.prototype.setLevel = function(level){
	//message.pid = _name;
	message.type = "setLevel";
	message.data = level;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.setPlayer = function(playerCol,gun){
	message.type = "setPlayer";
	message.data = [playerCol,gun];
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.update = function(x,y,o,shootBool){

	message.type = "updatePos";
	message.data = [x,y,o,shootBool];
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}
Client.prototype.killEnemy = function(j){

	message.type = "killEnemy";
	message.data = j;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}
Client.prototype.worldUpdate = function(arr){

	message.type = "worldUp";
	message.data = arr;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}


Client.prototype.spawnSlave = function(num){
	message.type = "spawnSlave";
	message.data = num;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.bossState = function(effect){
	message.type = effect;
	message.data = "junk";
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.bossHole = function(arr){
	message.type = "bossHole";
	message.data = arr;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}
Client.prototype.bossPos = function(x,y,state){

	message.type = "bossPos";
	message.data = [x,y,state];
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.deathAlert = function(){
	message.type = "playerDeath";
	message.data = 0;
	var mess = JSON.stringify(message);
	this.ws.send(mess);
}

Client.prototype.handleMessage = function(evt){

	var mess = JSON.parse(evt.data);
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
	else if(mess.type === "setPlayer"){
		var messA = mess.data;
		player2.initP2(messA[0],messA[1]);
	}
	else if(mess.type === "updatePos"){
		var messA = mess.data;
		player2.setPos(messA[0],messA[1],messA[2],messA[3]);
	}
	else if(mess.type === "reg"){
		createAccount(true);//moves to login page	
	}
	else if(mess.type === "alreadyTaken"){
		createAccount(false);
		//document.getElementById("regText") = "Username already taken.";
	}
	else if(mess.type === "loginError"){
		loginWrong();
		//document.getElementById("regText") = "Username already taken.";
	}
	else if(mess.type === "loginApproved"){
		var messA = mess.data;
		allowLogin(messA[0],messA[3],messA[4],messA[5],messA[6],messA[7],messA[8],messA[9]);
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
	else if(mess.type === "spawnSlave"){
		enemyManager.spawnSwarmSlave(mess.data);
		//document.getElementById("regText") = "Username already taken.";
	}
	else if(mess.type === "killEnemy"){
		collisionManager.killEnemy(mess.data,false);
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