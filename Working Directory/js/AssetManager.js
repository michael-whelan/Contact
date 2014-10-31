var AssetManager=function ()
{
	this.loadQueueImg = [];
    this.loadQueueSnd = [];
    this.loadQueueEssen = [];
    this.cache = {};
    this.successCount = 0;
    this.errorCount = 0;
};

var context;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

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
            if (that.isDone(that.loadQueueImg)) {
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


AssetManager.prototype.loadLvl1Sounds = function(loadCallback) {
    if (this.loadQueueSnd.length === 0) {
        loadCallback();
    }
    for (var i = 0; i < this.loadQueueSnd.length; i++) {
        var path = this.loadQueueSnd[i];
        var snd = new Audio();
        var that = this;
        snd.addEventListener("load", function() {
            that.successCount += 1;
                console.log("hit");
            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
              console.log("hit");
            }
        }, false);
        snd.addEventListener("error", function() {
            that.errorCount += 1;
  
            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
            }
    }, false);
        console.log(snd);
        snd.src = path;
        this.cache[path] = snd;
    }
}

AssetManager.prototype.isDone = function(queue) {
    return (queue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}