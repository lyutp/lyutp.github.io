window.onload = function(){
    // 左侧滑动效果
    leftScroll();

    // 左侧点击高亮效果
    listLight();

    // 右侧滑动效果
    // rightScroll();
}

function leftScroll(){
    // 获取左侧列表栏
    var leftList = document.querySelector('.main_nav ul');
    // 获取盒子自身高度,整体高度和通栏高度
    var allHeight = document.body.offsetHeight;
    var headerHeight = document.querySelector('.list_header').offsetHeight;
    var leftHeight = leftList.offsetHeight;
    var height = leftHeight-(allHeight - headerHeight);
    console.log(height);

    // 定义可以吸附的距离
    var distance = 50;
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    leftList.addEventListener('touchstart',function(event){
        startY = event.touches[0].clientY;
    });
    leftList.addEventListener('touchmove',function(event){
        moveY = event.touches[0].clientY - startY;
        if ((distanceY+moveY)>distance) {
            moveY = 0;
            distanceY = distance;
        }else if ((distanceY+moveY)<(-height-distance)) {
            moveY = 0;
            distanceY = -height-distance;
        }
        this.style.transform = 'translateY('+(moveY+distanceY)+'px)';
    });
    leftList.addEventListener('touchend',function(event){
        distanceY += moveY;
        if (distanceY>0) {
            distanceY = 0;
        }else if (distanceY<(-height)) {
            distanceY = (-height);
        }
        this.style.transition = 'all .35s';
        this.style.transform = 'translateY('+distanceY+'px)';
    });

}

function listLight(){
    // 获取左边li
    var liArr = document.querySelectorAll('.main_nav li');
    for (var i = 0; i < liArr.length; i++) {
        liArr[i].onclick=function(){
            for (var j = 0; j < liArr.length; j++) {
                liArr[j].classList.remove('current');
            }
            this.classList.add('current');
        }
    }
}