/*//FSM Dictionary
STATES:
wander = idle state
attack = if the player is sighted then attack
moveToPos = when moving to a targeted location ->Extra time(approximated pos)


EVENTS:
seeTarget = when the player is within view
complete = whenever a task/ action is complete the complete event is triggered
getScared = this only applies to the grunts and not the squad leaders.
obstacle = this is when they collide with a wall
Extra/Secondary to the other events->hearShot = when a player fires a shot the enemies alive on the map will be alerted to the location ofthe sound
*/
var FSM=function (){

};


FSM.prototype.stateControl = function(currState, evt){
	if(currState === "wander"){//the idle function
		if(evt === "hearShot" || evt === "positionOrder"){//interrupted by shot taken 
			return "moveToPos";//tells the entity to change states to the appropriate
		}
		else if(evt === "seeTarget"){//if the player is sighted
			return "attack";//attack the player
		}
		else if(evt === "getScared"){//if the player is sighted
			return "scared";//attack the player
		}
		else if(evt === "obstacle"){//if the player is sighted
			return "followPath";//attack the player
		}
		else{
			return "wander";//without the interrupt just continue idle
		}
	}

	if(currState === "moveToPos"){//if on the way to a destination
		if(evt === "complete"){//the event that is triggered whenever the current aim of a state is complete
			return "wander";//return to idle
		}
		else if(evt === "hearShot"){//interrupted by shot taken 
			return "moveToPos";//tells the entity to change states to the appropriate
		}
		else if(evt === "seeTarget"){//if the player is sighted
			return "attack";//attack the player
		}
		else if(evt === "getScared"){//if the player is sighted
			return "scared";//attack the player
		}
		else if(evt === "obstacle"){//if the player is sighted
			return "followPath";//attack the player
		}
		return "moveToPos";
	}

	if(currState ==="attack"){
		if(evt === "seeTarget"){//if the player is sighted
			return "attack";
		}
		else if(evt === "obstacle"){//if the player is sighted
			return "followPath";//attack the player
		}
		else if(evt === "getScared"){//if the player is sighted
			return "scared";//attack the player
		}
			return "moveToPos";
	}
	if(currState==="scared"){
		return "scared";
	}
	if(currState==="followPath"){
		if(evt === "seeTarget"){//if the player is sighted
		//	return "attack";
		}
		else if(evt === "hearShot"){//interrupted by shot taken 
			return "moveToPos";//tells the entity to change states to the appropriate
		}
		else if(evt === "getScared"){//if the player is sighted
			return "scared";//attack the player
		}
		else if(evt === "done"){//if the player is sighted
			return "wander";//attack the player
		}
		return "followPath";
	}
	return "wander";
}


FSM.prototype.boss1 = function(currState,evt){
	if((multiplayer&&_name === "player1")||!multiplayer){
	if(currState === "dig"){//the idle function
		if(evt === "hearTarget"){//interrupted by shot taken 
			return "comeUp";//tells the entity to change states to the appropriate
		}
		if(evt === "stage2"){//interrupted by shot taken 
			return "flurry";//tells the entity to change states to the appropriate
		}
		return "dig";
	}
	if(currState ==="flurry"){
		if(evt==="stage1"){
			return "dig";
		}
		return "flurry"
	}
	if (currState === "comeUp") {
		if(evt ==="rise"){
			return "attack";
		}
		return "comeUp";
	}
	if(currState === "attack"){
		if(evt === "hurt"){
			return "dig";
		}
		return "attack";
	}
	}
	return currState;
}