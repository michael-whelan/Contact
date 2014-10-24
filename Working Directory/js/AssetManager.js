var AssetManager=function ()
{
	this.loadQueueImg = [];
    this.loadQueueSnd = [];
    this.cache = {};
    this.successCount = 0;
    this.errorCount = 0;
};



AssetManager.prototype.queueLoadImg = function(path) {
    this.loadQueueImg.push(path);
}

AssetManager.prototype.queueLoadSnd = function(path) {
    this.loadQueueSnd.push(path);
}



AssetManager.prototype.loadLvl1Images = function(loadCallback) {
    timeSpent = Date.now();
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
            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
            }
        }, false);
        snd.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
            }
    }, false);
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