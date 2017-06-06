// 加载完毕事件
window.onload = function(){
    // 顶部通栏透明度滚动变化效果
    headerScroll();

    // 秒杀倒计时效果
    cutDownTime();

    // banner轮播图效果
    banner();
}

// 顶部通栏透明度滚动变化方法
function headerScroll() {
    // 获取顶部通栏，获取nav
    var header = document.querySelector('.jd_header');
    var nav = document.querySelector('.jd_nav');
    //计算nav距离顶部高度及自生高度；高度和 用于屏幕滚动透明度渐变效果
    var distance = nav.offsetHeight + nav.offsetTop;
    // 设置初始透明度
    header.style.backgroundColor = 'rgba(201,21,35,0)';
    // 绑定屏幕滚动事件
    window.onscroll = function(){
        var scrollDistance = document.body.scrollTop;
        var value = scrollDistance/distance;
        if (value>1) {
            value=1;
        }
        // 设置顶部通栏rgba
        header.style.backgroundColor = 'rgba(201,21,35,'+value+')';
    }
}

// 秒杀倒计时方法
function cutDownTime() {
    // 获取需要改变的li数组
    var timeLiArr = document.querySelectorAll('.main_content .content_top li');
    // 设置总时间
    var totalHours = 3;
    var totalSeconds = totalHours*3600;

    // 设置到目标li
    // 设置定时器
    var timer = setInterval(function(){
        // 计算小时、分钟、秒
        totalSeconds--;
        var hour = Math.floor(totalSeconds/3600);
        var minute = Math.floor(totalSeconds%3600/60);
        var second = totalSeconds%60;
        if (totalSeconds<=0) {
            totalSeconds=0;
            clearInterval(timer);
            console.log('抱歉,活动已经结束了o(╯□╰)o');
            // return;
        }

        timeLiArr[0].innerHTML = Math.floor(hour/10);
        timeLiArr[1].innerHTML = Math.floor(hour%10);
        timeLiArr[3].innerHTML = Math.floor(minute/10);
        timeLiArr[4].innerHTML = Math.floor(minute%10);
        timeLiArr[6].innerHTML = Math.floor(second/10);
        timeLiArr[7].innerHTML = Math.floor(second%10);
    },1000);
}

// banner轮播方法
function banner() {
    // 自动轮播 获取相关元素
    var moveUl = document.querySelector('.jd_banner ul:nth-child(1)');
    var indexLiArr = document.querySelectorAll('.jd_banner ul:nth-child(2) li');
    var width = document.body.offsetWidth;
    // 定义索引值 控制移动
    var index = 1;
    // 设置定时器
    var timer = setInterval(autoPlay,1200);
    function autoPlay(){
        index++;
        moveUl.style.transform = 'translateX('+(-index*width)+'px)';
        moveUl.style.transition = 'all .35s';
    }
    // 利用 过渡结束事件控制moveUl
    moveUl.addEventListener('webkitTransitionEnd',function(){
        if (index>8) {
            index = 1;
            // 当ul出界了时候过渡完成之后，把ul拉回第一张图片
            moveUl.style.transition = '';
            moveUl.style.transform = 'translateX('+(-index*width)+'px)';
        }else if (index<1) {
            index = 8;
            moveUl.style.transition = '';
            moveUl.style.transform = 'translateX('+(-index*width)+'px)';
        }
        for (var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].classList.remove('current');
        }
        indexLiArr[index-1].classList.add('current');
    });
    // 利用touch事件 实现触摸滑动效果
        // 定义相关元素
    var startX = 0;
    var moveX = 0;
    // 触摸开始事件 获取startX的值
    moveUl.addEventListener('touchstart',function(event){
        startX = event.touches[0].clientX;
        // 触摸开始，清除定时器,关闭过渡
        clearInterval(timer);
        this.style.transition = '';
    })
    // 触摸移动事件 
    moveUl.addEventListener('touchmove',function(event){
        moveX = event.touches[0].clientX - startX;
        this.style.transform = 'translateX('+(-index*width+moveX)+'px)';
    })
    // 触摸结束事件
    // 设置最大滑动值，超过就跳转到下一页或上一页
    var maxWidth = width/3*2;
    moveUl.addEventListener('touchend',function(event){
        if (Math.abs(moveX)>maxWidth) {
            if (moveX>0) {
                index--;
            }else {
                index++;
            }
        }
        this.style.transition = 'all .35s';
        this.style.transform = 'translateX('+(-index*width)+'px)';
        // 最后重新设置自动轮播定时器
        timer = setInterval(autoPlay,1200);
    })
}
