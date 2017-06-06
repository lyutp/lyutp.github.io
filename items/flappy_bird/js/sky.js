(function(w){
    /**
     * Sky (背景天空) 构造函数
     * @param {[context]} ctx    [绘图环境]
     * @param {[Image]} img    [图片路径对象]
     * @param {[number]} speed  [背景移动速度]
     * @param {[number]} x      [绘制背景x坐标](默认根据实例个数计算)
     * @param {[number]} y      [绘制背景y坐标](默认0)
     * @param {[number]} width  [背景宽](默认图片宽)
     * @param {[number]} height [背景高](默认图片高)
     */
    function Sky(ctx,img,speed,x,y,width,height){
            // 每实例化一个 len++;
            Sky.len++;
            this.ctx = ctx;
            this.img = img;
            this.speed = speed || 3;
            this.width = width || this.img.width;
            this.height = height || this.img.height;
            this.x = x || this.width*(Sky.len-1);
            this.y = y || 0;
        };
    // 设置 构造函数 静态属性(所有new 出来的实例将共享该数据)
    Sky.len = 0;
    Sky.prototype = {
        constructor : Sky,
        _init : function(){
            this.draw();
            this.update();
        },
        draw : function(){
            // 三参数情况下，就是默认图片自生宽高
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        update : function(){
            this.x -= this.speed;
            this.x = this.x<(-this.width)?(this.x+this.width*2):this.x;
        }
    }
    w.getSky = function(ctx,img,speed,x,y,width,height){
        return new Sky(ctx,img,speed,x,y,width,height);
    }
    w.Sky = Sky;

})(window)