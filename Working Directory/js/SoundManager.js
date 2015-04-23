
var SoundManager = function()
{

}


SoundManager.prototype.playSound= function(buffer) {
	var source = context.createBufferSource(); // creates a sound source
	source.buffer = buffer;                    // tell the source which sound to play
	source.connect(context.destination);       // connect the source to the context's destination (the speakers)
	source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}

SoundManager.prototype.playSoundLoop = function(buffer,soundName) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.loop = true;
	source.connect(context.destination);
	source.start(0);
	if(soundName ==="gameBack"){
		this.backT = source;
	}
	else if(soundName === "menuBack"){
		this.menuBack = source;
	}
	else if(soundName === "flurrySnd"){
		this.flurry = source;
	}
}

SoundManager.prototype.stopSound = function(soundName) {
	if(soundName === "gameBack"&& this.backT!==undefined){
		this.backT.stop();
	}
	else if(soundName === "menuBack"&& this.menuBack!==undefined){
		this.menuBack.stop();
	}

	else if(soundName === "flurrySnd"&& this.flurry!==undefined){
		this.flurry.stop();
	}
}