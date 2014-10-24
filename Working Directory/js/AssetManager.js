var AssetManager=function ()
{
	this.loadQueue = [];
    this.cache = {};
    this.successCount = 0;
    this.errorCount = 0;
};



AssetManager.prototype.queueLoad = function(path) {
    this.loadQueue.push(path);
}



AssetManager.prototype.loadAllImages = function(loadCallback) {
      if (this.loadQueue.length === 0) {
      loadCallback();
  }
    for (var i = 0; i < this.loadQueue.length; i++) {
        var path = this.loadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone()) {
                loadCallback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                loadCallback();
            }
    }, false);
        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.isDone = function() {
    return (this.loadQueue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}