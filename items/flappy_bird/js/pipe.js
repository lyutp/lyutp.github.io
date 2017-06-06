(function(w){
    /**
     * [Pipe  管道  构造函数]
     * @param {[context]} ctx        [绘图环境]
     * @param {[Image]} imgDown    [位于上方的管道]
     * @param {[Image]} imgUp      [位于下方的管道]
     * @param {[number]} space      [每对管道的间隙]
     * @param {[number]} landHeight [land遮住管道的高度]
     * @param {[number]} speed      [管道的速度]
     */
    function Pipe(ctx,imgDown,imgUp,space,landHeight,speed){
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed || 2;

        this.width = this.imgDown.width;
        this.height = this.imgDown.height;
        Pipe.len++;
        this.initX = 300;
        this.x = this.initX + this.width*3*(Pipe.len-1);
        this._init();
    }
    Pipe.len = 0;
    Pipe.prototype = {
        constructor : Pipe,
        _init : function(){
            // 管道最大高度 = 画布高度 - 陆地高度 - 管道间隙 - 最小管道高度
            var minHeight = 100;
            var maxHeight = this.ctx.canvas.height - this.landHeight - this.space - minHeight;
            var random = Math.random()*maxHeight;
            // 随机生成 上管道的高度
            var upHeight = random<minHeight?minHeight:random;
            // 上管道的y坐标 = 生成的随机高度 - 自身的高度
            this.upY = upHeight - this.height; 
            // 下管道的y坐标 = 生成的随机高度 + 间隙
            this.downY = upHeight + this.space;
        },
        // 绘制管道
        draw : function () {

            // 上管道
            this.ctx.drawImage(this.imgDown,
                this.x,this.upY);
            // 下管道
            this.ctx.drawImage(this.imgUp,
                this.x,this.downY);
            // 在绘制的时候并绘制 管道的路径
            this.ctx.rect(this.x,this.upY,this.width,this.height);
            this.ctx.rect(this.x,this.downY,this.width,this.height);
            this.update();
        },
        update : function(){
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x += Pipe.len*3*this.width;
                this._init();
            }
            
        }
    }
    w.getPipe = function (ctx,imgDown,imgUp,space,landHeight,speed){
        return new Pipe(ctx,imgDown,imgUp,space,landHeight,speed);
    }
    w.Pipe = Pipe;
})(window)