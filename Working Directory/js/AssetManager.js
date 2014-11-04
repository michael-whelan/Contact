var AssetManager=function ()
{
	this.loadQueueImg = [];
    this.loadQueueSnd = [];
    this.loadQueueEssen = [];
    this.cache = {};
    this.successCount = 0;
    this.errorCount = 0;
};

/*var context;
window.addEventListener('load', init , false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}*/

AssetManager.prototype.queueLoadImg = function(path) {
    this.loadQueueImg.push(path);
}

AssetManager.prototype.queueLoadSnd = function(path) {
    this.loadQueueSnd.push(path);
}
AssetManager.prototype.queueLoadEssen = function(path) {
    this.loadQueueEssen.push(path);
}

AssetManager.prototype.loadEssential = function(loadCallback) {
    if (this.loadQueueEssen.length === 0) {
      loadCallback();
    }
    for (var i = 0; i < this.loadQueueEssen.length; i++) {
        var path = this.loadQueueEssen[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone(that.loadQueueEssen)) {
                that.successCount =0;
                that.errorCount=0;
                while(that.loadQueueEssen.length > 0) {
                    that.loadQueueEssen.pop();
                }
                loadCallback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            console.log("Error file: "+path);
            if (that.isDone(that.loadQueueEssen)) {
                loadCallback();
            }
    }, false);
        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.loadTitleImages = function(loadCallback) {
    if (this.loadQueueImg.length === 0) {
      loadCallback();
    }
    for (var i = 0; i < this.loadQueueImg.length; i++) {
        var path = this.loadQueueImg[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            //console.log(that.isDone(that.loadQueueImg));
            if (that.isDone(that.loadQueueImg)) {
                that.successCount = 0;
                that.errorCount=0;
                while(that.loadQueueImg.length > 0) {
                    that.loadQueueImg.pop();
                }
                loadCallback();

            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            console.log("Error file: "+path);
            if (that.isDone(that.loadQueueImg)) {
                loadCallback();
            }
    }, false);

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.loadLvl1Images = function(loadCallback) {
    if (this.loadQueueImg.length === 0) {
      loadCallback();
    }
    for (var i = 0; i < this.loadQueueImg.length; i++) {
        var path = this.loadQueueImg[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone(that.loadQueueImg)) {
                that.successCount = 0;
                that.errorCount=0;
                while(that.loadQueueImg.length > 0) {
                    that.loadQueueImg.pop();
                }
                loadCallback();

            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            console.log("Error file: "+path);
            if (that.isDone(that.loadQueueImg)) {
                loadCallback();
            }
    }, false);

        img.src = path;
        this.cache[path] = img;
    }
}
/*
AssetManager.prototype.loadSoundObj = function(obj) {
  var request = new XMLHttpRequest();
  request.open('GET', obj.src + format, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    // request.response is encoded... so decode it now
    context.decodeAudioData(request.response, function(buffer) {
      obj.buffer = buffer;
    }, function(err) {
      throw new Error(err);
    });
  }
  request.send();
}


AssetManager.prototype.loadSounds = function(obj) {
  var len = obj.length, i;

  // iterate over sounds obj
  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      // load sound
      loadSoundObj(obj[i]);
    }
  }
}
*/
AssetManager.prototype.loadSounds = function(loadCallback) {
    if (this.loadQueueSnd.length === 0) {
        loadCallback();
    }
    var audioPath = "sounds/";
    var manifest = [
        {id:"spawnSnd", src:"sfx/player_spawn.mp3"},
        {id:"backTrack", src:"music/gameplay_theme_idea.mp3"},
        {id:"reloadSnd", src:"sfx/gun_crecharge.mp3"},
        {id:"gunshot", src:"sfx/gun_pew.mp3"}
    ];
    createjs.Sound.alternateExtensions = ["ogg"];
    createjs.Sound.addEventListener("fileload", loadCallback);
    createjs.Sound.registerManifest(manifest, audioPath);

}
AssetManager.prototype.loadLvl1Sounds = function(loadCallback) {
    if (this.loadQueueSnd.length === 0) {
        loadCallback();
    }
    for (var i = 0; i < this.loadQueueSnd.length; i++) {
        var path = this.loadQueueSnd[i];
        var snd = new Audio();
        var that = this;
        snd.addEventListener("loadeddata", function() {
            that.successCount += 1;
            if (that.isDone(that.loadQueueSnd)) {
                that.successCount = 0;
                that.errorCount=0;
                 while(that.loadQueueSnd.length > 0) {
                    that.loadQueueSnd.pop();
                }
                loadCallback();
              //console.log("hit");
            }
        },false);
        snd.addEventListener("error", function() {
            that.errorCount += 1;

            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
            }
    }, false);
       // console.log(snd);
        snd.src = path;
        this.cache[path] = snd;
    }
}

AssetManager.prototype.isDone = function(queue) {
  //  console.log("queue len "+queue.length, this.successCount,this.errorCount);

    return (queue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}