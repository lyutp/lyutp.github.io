(function(w){
    /**
     * [overScene description]
     * @param  {[context]} ctx [绘图环境]
     * @return {[new overScene]}     [实例]
     */
    function overScene(ctx){
        this.ctx = ctx;
        this._init();
    }
    overScene.prototype = {
        constructor : overScene,
        _init : function(){
            // 防止影响全局设置
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
            this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.ctx.font = '900 40px microsoft yahei';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('Game Over !!!',this.ctx.canvas.width/2,this.ctx.canvas.height/2);
            this.ctx.restore();
        }
    }
    w.getOverScene = function(ctx){
        return new overScene(ctx);
    }
})(window)