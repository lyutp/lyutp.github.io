(function(w){
    /**
     * [Bird  小鸟 构造函数]
     * @param {[context]} ctx    [绘图环境]
     * @param {[Image]} img    [图片路径对象]
     * @param {[number]} frameX [横向帧数]
     * @param {[number]} frameY [纵向帧数]
     * @param {[number]} speed [小鸟移动速度]
     */
    function Bird(ctx,img,frameX,frameY,speed){
        this.ctx = ctx;
        this.img = img;
        this.frameX = frameX;
        this.frameY = frameY;
        this.width = this.img.width/frameX;
        this.height = this.img.height/frameY;
        this.speed = speed || 2;
        this.x = 20;
        this.y = 20;
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        // 加速度
        this.as = 0.15;
        // 点击后的速度
        this.clickSpeed = -3.5;
        this._bind();
    }
    Bird.prototype = {
        constructor : Bird,
        draw : function(){
            // 在 绘制小鸟的时候，根据小鸟的速度旋转小鸟
            // 先保存状态
            this.ctx.save();
            var initRadian = Math.PI/180*5;
            var maxRadian = Math.PI/180*45;
            var radian = initRadian*this.speed;
            // 移动坐标
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
            // 旋转坐标
            radian = radian>maxRadian?maxRadian:radian;
            this.ctx.rotate(radian);
            this.ctx.drawImage(this.img,
                this.width*this.currentFrameX,this.height*this.currentFrameY,this.width,this.height,
                -this.width/2,-this.height/2,this.width,this.height);
            // 回滚状态
            this.ctx.restore();
        },
        update : function(){
            if (++this.currentFrameX>=this.frameX) {
                this.currentFrameX = 0;
            };
            this.y += this.speed;
            this.speed += this.as;
        },
        _bind : function(){
            var that = this;
            this.ctx.canvas.addEventListener('click',function(){
                that.speed = that.clickSpeed;
            })
        }
    }
    // 用来存储已经创建好的鸟实例对象
    var bird = null;
    // 整个游戏只要一个bird就够了
    w.getBird = function(ctx,img,frameX,frameY,speed){
        if (!bird) {
            bird = new Bird(ctx,img,frameX,frameY,speed);
        }
        return bird;
    }

})(window)