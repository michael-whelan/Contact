var allowPlay = false;
var message = {
  pid: "",
  type: "",
  data:""
};


var WAITING_FOR_PLAYERS="0";
var STARTING_GAME="1";

function Client(){
  var that=this;

  var host='192.168.15.13';
  var port=8080;



  this.ws = new WebSocket("ws://" + host + ":" + port +'/wstest');

  this.ws.onmessage = function(evt) {that.handleMessage(evt); };

  this.ws.onclose = function(evt) { console.log("Connection close"); };

  this.ws.onopen = function(evt) { console.log('open connection'); };         
}

Client.prototype.join = function(){
  message.pid = "junk";
  message.type = "join";
  var mess = JSON.stringify(message);
  this.ws.send(mess);
}

Client.prototype.setLevel = function(level){
  message.pid = _name;
  message.type = "setLevel";
  message.data = level;
  var mess = JSON.stringify(message);
  this.ws.send(mess);
}

Client.prototype.update = function(x,y,o,shootBool){
  //console.log("updating multiplayer");
  message.pid = _name;
  message.type = "updatePos";
  message.data = [x,y,o,shootBool];
  var mess = JSON.stringify(message);
  this.ws.send(mess);
}
Client.prototype.killEnemy = function(j){
  //console.log("updating multiplayer");
  message.pid = _name;
  message.type = "killEnemy";
  message.data = j;
  var mess = JSON.stringify(message);
  this.ws.send(mess);
}
Client.prototype.worldUpdate = function(arr){
  //console.log("updating multiplayer");
  message.pid = _name;
  message.type = "worldUp";
  message.data = arr;
  var mess = JSON.stringify(message);
  this.ws.send(mess);
}

Client.prototype.handleMessage = function(evt){

  var mess = JSON.parse(evt.data);
  //console.log(mess);

  if (mess.type ==="state"){
    if(mess.data === WAITING_FOR_PLAYERS){
      console.log("waiting for players");
      _name = "player1";
    }
    else if(mess.data === STARTING_GAME){
      console.log("Starting Game");
      if(_name ==="junk"){
        _name = "player2";
      }
      allowPlay = true;
    }
  }
  else if(mess.type === "setLevel"){
    //lvlManager.setLevel(mess.data);
    menu.returnVals = ["gameplay",mess.data];
  }
  else if(mess.type === "updatePos"){
    var messA = mess.data;
    player2.setPos(messA[0],messA[1],messA[2],messA[3]);
  }
  else if(mess.type === "worldUp"){
    var messA = mess.data;
    enemyManager.setEnemyPos(messA);
  }
  else if(mess.type === "killEnemy"){
    enemyManager.kill(mess.data);
  }
  else if(mess.type ==="win")
  {
    game.setWin(mess.data);
  }
}