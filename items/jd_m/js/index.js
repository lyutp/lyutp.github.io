window.onload = function(){
    // 通栏滚动 透明度渐变
    headerScroll();

    // 倒计时 效果
    cutDownTime();

    // 轮播图 效果
    banner();
}

// 通栏方法
function headerScroll(){
    // 获取元素，并计算滚动到某个距离时,透明度渐变为1
    var jdHeader = document.querySelector('.jd_header');
    // 设置默认透明
    jdHeader.style.backgroundColor = 'rgba(201,21,35,0)';            
    var jdNav = document.querySelector('.jd_nav');
    var navDistance = jdNav.offsetHeight +jdNav.offsetTop;
    //绑定屏幕滚动事件
    window.onscroll = function(){
        // 获取当前屏幕滚动的距离
        var scrollDistance = document.body.scrollTop;
        // console.log(scrollDistance);
        // console.log(document.documentElement.scrollTop);
        
        // 计算raga中alpha的渐变值
        var value = scrollDistance/navDistance;
        if (value>1) {
            value = 1;
        }
        // 更改样式 实现效果
        jdHeader.style.backgroundColor = 'rgba(201,21,35,'+value+')';            
    }
}

// 倒计时方法
function cutDownTime(){
    // 设置 总时长
    var totalHours = 3;
    // 
    var totalSeconds = totalHours*3600;
    // var totalSeconds = 5;
    // 加多1秒 让用户看到以整数开始显示
    // totalSeconds++;

    //获取需要的设置倒计时的li元素
    var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
    // var liArr = document.querySelectorAll('.main_content:nth-of-type(1) .content_top li');

    // 设置定时器
    var timer = setInterval(function(){
        // 判断倒计时是否结束
        if (totalSeconds<=0) {
            clearInterval(timer);
            console.log('抱歉，活动结束了');
            return;
        }

        totalSeconds--;
        // 计算小时、分钟数、秒数
        var hour = Math.floor(totalSeconds/3600);
        var minute = Math.floor(totalSeconds%3600/60);
        var second = Math.floor(totalSeconds%60);
        //设置到li元素中
        liArr[0].innerHTML = Math.floor(hour/10);
        liArr[1].innerHTML = hour%10;

        liArr[3].innerHTML = Math.floor(minute/10);
        liArr[4].innerHTML = minute%10;

        liArr[6].innerHTML = Math.floor(second/10);
        liArr[7].innerHTML = second%10;

    },1000);
}

// 轮播图方法
function banner(){
    // 获取元素
    var moveUl = document.querySelector('.jd_banner ul:first-child');
    console.log(moveUl);
    var indexLiArr = document.querySelectorAll('.jd_banner ul:nth-child(2) li');
    // 获取每次轮播的宽度
    var width = document.body.offsetWidth;
    console.log(width);
    // 定义索引值
    var index = 1;
    // 设置定时器
    var timer = setInterval(autoPlay,1000);
    // function autoPlay(){
    //     index++;
    //     moveUl.style.transition = 'all .35s';
    //     moveUl.style.transform = 'translateX('+index*width*-1+'px)';
    //     // 判断是否越界
    //     if (index>8) {
    //         index = 1;
    //         // 事件监听器绑定过渡结束事件，过渡完毕，清空过渡，调整ul位置
    //         moveUl.addEventListener('webkitTransitionEnd',function(){
    //             moveUl.style.transition ='';
    //             moveUl.style.transform = 'translateX('+index*width*-1+'px)';
    //         })
    //     }
    //     for (var i = 0; i < indexLiArr.length; i++) {
    //         indexLiArr[i].classList.remove('current');
    //     }
    //     indexLiArr[index-1].classList.add('current');
    // }
    function autoPlay(){
        index++;
        moveUl.style.transition = 'all .35s';
        moveUl.style.transform = 'translateX('+index*width*-1+'px)';
    }
    moveUl.addEventListener('webkitTransitionEnd',function(){
        if (index>8) {
            index = 1;
            moveUl.style.transition ='';
            moveUl.style.transform = 'translateX('+index*width*-1+'px)';
        }else if (index<1) {
            index = 8;
            moveUl.style.transition ='';
            moveUl.style.transform = 'translateX('+index*width*-1+'px)';
        }
        for (var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].classList.remove('current');
        }
        indexLiArr[index-1].classList.add('current');
    })
     
    // 利用touch 触摸事件实现滑动轮播
        // 定义计算触摸距离需要的变量
    var startX = 0;
    var moveX = 0;
    var maxWidth = width/3*2;
    moveUl.addEventListener('touchstart',function(event){
        startX = event.touches[0].clientX;
        // 触摸开始清除定时器
        clearInterval(timer);
        // 关闭过渡
        moveUl.style.transition = '';
    });
    moveUl.addEventListener('touchmove',function(event){
        moveX = event.touches[0].clientX - startX;
        
        // 开启过渡，并设置滑动
        moveUl.style.transition = 'all .35s';
        moveUl.style.transform = 'translateX('+(moveX+width*index*-1)+'px)';
    });
    moveUl.addEventListener('touchend',function(event){
        if (Math.abs(moveX)>maxWidth) {
            if (moveX>0) {
                index--;
            }else{
                index++;
            }
        }
        moveUl.style.transform = 'translateX('+(width*index*-1)+'px)';
        timer = setInterval(autoPlay,1000);
    })
}