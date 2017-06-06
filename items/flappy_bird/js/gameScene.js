(function(w){
    function Scene(ctx,img){
        this.ctx = ctx;
        this.img = img;
        // 设置听众
        this.listener = [];
        // 定义容器 装游戏所需要的元素
        this.roles = [];
        this._init();
    }
    Scene.prototype = {
        constructor : Scene,
        _init : function(){
            // 设置画布大小
            ctx.canvas.width = this.img.sky.width;
            ctx.canvas.height = this.img.sky.height;
            
            // 背景天空(2)
            for (var i = 0; i < 2; i++) {
                this.roles.push(getSky(ctx,this.img.sky,3));
            }

            // 小鸟(1)
            this.roles.push(getBird(ctx,this.img.bird,3,1));

            // 管道(6)
            for (var i = 0; i < 6; i++) {
                this.roles.push(getPipe(ctx,this.img.pipeDown,this.img.pipeUp,150,this.img.land.height));
            }
            
            // 背景地面(4)
            for (var i = 0; i < 4; i++) {
                this.roles.push(getLand(ctx,this.img.land,3))
            }
        },
        // 监听事件
        addListener : function(fn){
            this.listener.push(fn);
        },
        // 小鸟死亡 告知 监听者
        tiggerOverBird : function(){
            this.listener.forEach(function(listen){
                listen();
            })
        },
        draw : function(){
            // 判断小鸟是否在路径上
            var bird = getBird();
            var bridCurX = bird.x + bird.width/4*3;
            var bridCurY = bird.y + bird.height/2;

            if (this.ctx.isPointInPath(bridCurX,bridCurY) ||
                bridCurY<0 ||
                bridCurY>=(this.ctx.canvas.height - this.img.land.height)) {
                this.tiggerOverBird();
            }else{
                this.ctx.beginPath();
                this.roles.forEach(function(i){
                    i.draw();
                    i.update();
                })
            }
        }
    }
    w.getScene = function(ctx,img){
        return new Scene(ctx,img);
    }
})(window)