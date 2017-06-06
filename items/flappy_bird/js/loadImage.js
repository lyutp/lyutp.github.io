function loadImage(imgPath,callback){
    var tempImg,
        loaded = 0,
        length = 0;
    var imgObj = {};
    for(var k in imgPath){
        // 记录传入图片个数
        length++;
        // 每有一张图就创建一张
        tempImg = new Image();
        tempImg.onload = function(){
            // 每加载一张 记录
            loaded++;
            if (loaded == length) {
                // 当所有图片加载完毕，再执行回调函数
                callback(imgObj);
            }
        }
        tempImg.src = imgPath[k];
        imgObj[k] = tempImg;
    }

}