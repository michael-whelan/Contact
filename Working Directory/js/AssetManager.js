
var AssetManager=function (){
    this.loadQueueImg = [];
    this.loadQueueSnd = [];
    this.loadQueueEssen = [];
    this.cache = new ParallelArray();
    this.successCount = 0;
    this.errorCount = 0;
    this.successCountSnd = 0;
    this.errorCountSnd = 0;
};

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
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
                that.successCount = 0;
                that.errorCount=0;
                while(that.loadQueueImg.length > 0) {
                    that.loadQueueImg.pop();
                }
                loadCallback();

            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCountImg += 1;
            console.log("Error file: "+path);
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
                loadCallback();
            }
    }, false);

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.soundLoader = function(pos){
    var url = this.loadQueueSnd[pos];
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
  var that = this;
    request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) {
                that.cache[url] = buffer;
                that.successCountSnd += 1;
                if (that.successCountSnd>=that.loadQueueSnd.length) {
                    that.successCountSnd = 0;
                    that.errorCountSnd=0;
                    while(that.loadQueueSnd.length > 0) {
                        that.loadQueueSnd.pop();
                    }
                    that.loadSnd("null",0);
                }
                else{
                    ++pos;
                    that.loadSnd("another",pos);
                }
            }, function(e){"Error with decoding audio data" + e.err});
        }
        request.send();
}

AssetManager.prototype.loadSnd = function(loadCallback,pos) {
    if (this.loadQueueSnd.length === 0) {
        if(loadCallback ==="null"){
            caller();
        }
        else {
            loadCallback();
        }
    }
    else{
    if(loadCallback==="another"){
            this.soundLoader(pos);
        }
        else if(loadCallback!="null"){
            caller = loadCallback;
            this.soundLoader(pos);
        }
        else{
            caller();
        }
    }

}
function errorfunction(){

}
AssetManager.prototype.loadLvlSelectImages = function(loadCallback) {
    if (this.loadQueueImg.length === 0) {
      loadCallback();
    }
    for (var i = 0; i < this.loadQueueImg.length; i++) {
        var path = this.loadQueueImg[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
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
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
                loadCallback();
            }
    }, false);

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.loadCommonImages = function(loadCallback) {
    if (this.loadQueueImg.length === 0) {
      loadCallback();
    }
    for (var i = 0; i < this.loadQueueImg.length; i++) {
        var path = this.loadQueueImg[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            that.successCount += 1;
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
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
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
                loadCallback();
            }
    }, false);

        img.src = path;
        this.cache[path] = img;
    }
}
AssetManager.prototype.loadCommonSounds = function(loadCallback) {
    if (this.loadQueueSnd.length === 0) {
        loadCallback();
    }
    for (var i = 0; i < this.loadQueueSnd.length; i++) {
        var path = this.loadQueueSnd[i];
        var snd = new Audio();
        var that = this;
        snd.addEventListener("loadeddata", function() {
         //   console.log("i= "+i, "len = "+that.loadQueueSnd.length);

            that.successCount += 1;
            if (that.isDone(that.loadQueueSnd)) {
                
                that.successCount = 0;
                that.errorCount=0;
                 while(that.loadQueueSnd.length > 0) {
                    that.loadQueueSnd.pop();
                }
                loadCallback();
            }
        },false);
        snd.addEventListener("error", function() {
            console.log("Error: "+snd.src);
            that.errorCount += 1;
            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
            }
        }, false);
        snd.src = path;
        this.cache[path] = snd;
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
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
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
            if (that.isDone(that.loadQueueImg, that.successCount,that.errorCount)) {
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
        snd.addEventListener("loadeddata", function() {

            that.successCount += 1;
            if (that.isDone(that.loadQueueSnd)) {
                
                that.successCount = 0;
                that.errorCount=0;
                 while(that.loadQueueSnd.length > 0) {
                    that.loadQueueSnd.pop();
                }
                loadCallback();
            }
        },false);
        snd.addEventListener("error", function() {
            console.log("Error: "+snd.src);
            that.errorCount += 1;
            if (that.isDone(that.loadQueueSnd)) {
                loadCallback();
            }
        }, false);
        snd.src = path;
        this.cache[path] = snd;
    }
}

AssetManager.prototype.isDone = function(queue,s,e) {
    return (queue.length == s + e);
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}

