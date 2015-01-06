
 var message = {
    pid: "",
    type: "",
    data:"",
    array: "",
    array2: ""
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
 
          this.ws.onopen = function(evt) { console.log('open connection'); this.join("testname");};
}

Client.prototype.join = function(name){
  message.pid = name;
  message.type = "test";
  message.data = "this_is_a_test"
  var mess = JSON.stringify(message);
  this.ws.send(mess);
}

Client.prototype.handleMessage = function(evt){

var mess = JSON.parse(evt.data);
var messA = mess.array;
var messB = mess.array2;

if (mess.type ==="state"){
    if(mess.data === WAITING_FOR_PLAYERS){
      
    console.log("waiting for players");
  }
  else if(mess.data === STARTING_GAME){
        console.log("Starting Game");
  }
  }

else if(mess.type ==="mouseClick")
{ 
    if(mess.data === 1){
      game.p2Fill();
      game.setTurn(1);
    }
    else if (mess.data ===2){
  if(game.getArrayIsSet() === false){
 game.setColourArray(messA);
 game.setColourArray2(messB);
}
      game.p1Fill();
       game.setTurn(2);
    }
}
else if(mess.type ==="win")
{
    game.setWin(mess.data);
}

}