/*//FSM Dictionary
STATES:
wander = idle state
attack = if the player is sighted then attack
moveToPos = when moving to a targeted location ->Extra time(approximated pos)


EVENTS:
seeTarget = when the player is within view
complete = whenever a task/ action is complete the complete event is triggered

Extra/Secondary to the other events->hearShot = when a player fires a shot the enemies alive on the map will be alerted to the location ofthe sound
*/
var FSM=function (){

};


FSM.prototype.stateControl = function(currState, evt){
	//console.log(currState,evt);
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
		return "moveToPos";
	}

	if(currState ==="attack"){
		if(evt === "seeTarget"){//if the player is sighted
			return "attack";
		}
		else if(evt === "getScared"){//if the player is sighted
			return "scared";//attack the player
		}
			return "moveToPos";
	}
	if(currState==="scared"){
		return "scared";
	}

	return "wander";
}
