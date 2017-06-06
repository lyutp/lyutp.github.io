(function(w){
    /**
     * Land (背景地面) 构造函数
     * @param {[context]} ctx    [绘图环境]
     * @param {[Image]} img    [图片路径对象]
     * @param {[number]} speed  [背景移动速度]
     * @param {[number]} x      [绘制背景x坐标](默认根据实例个数计算)
     * @param {[number]} y      [绘制背景y坐标](默认0)
     * @param {[number]} width  [背景宽](默认图片宽)
     * @param {[number]} height [背景高](默认图片高)
     */
    function Land(ctx,img,speed,x,y,width,height){
            // 每实例化一个 len++;
            Land.len++;
            this.ctx = ctx;
            this.img = img;
            this.speed = speed || 3;
            this.width = width || this.img.width;
            this.height = height || this.img.height;
            this.x = x || this.width*(Land.len-1);
            this.y = y || this.ctx.canvas.height-this.height;
        };
    // 设置 构造函数 静态属性(所有new 出来的实例将共享该数据)
    Land.len = 0;
    Land.prototype = {
        constructor : Land,
        _init : function(){
            this.draw();
            this.move();
        },
        draw : function(){
            // 三参数情况下，就是默认图片自生宽高
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        update : function(){
            this.x -= this.speed;
            this.x += this.x<(-this.width)?(this.width*Land.len):0;
        }
    }
    w.getLand = function(ctx,img,speed,x,y,width,height){
        return new Land(ctx,img,speed,x,y,width,height);
    }
    w.Land = Land;
})(window)