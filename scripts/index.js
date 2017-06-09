// 通栏 music
$(function () {
    // 鼠标进入，隐藏唱片，显示控制按钮
    $('.music-play').on('mouseover', function () {
            $(this).stop().fadeOut(300, function () {
                $(this).removeClass('music');
                if (!$('audio')[0].paused) {
                    $(this).addClass('icon-pause').fadeIn(200);
                } else {
                    $(this).addClass('icon-play').fadeIn(200);
                }
            })
    });
    // 鼠标移出，隐藏控制按钮，显示唱片
    $('.music-play').on('mouseout',function () {
            $(this).stop().fadeOut(300, function () {
                $(this).removeClass('icon-pause icon-play').addClass('music').fadeIn(200);
            })
    });
    // 鼠标点击(单击)，判断音频是否播放，
    // 正在播放，那么暂停，并且将控制按钮切换
    // 暂停，那么播放，并且将控制按钮切换
    $('.music-play').on('click', function () {
        if (!$('audio')[0].paused) {
            $('audio')[0].pause();
            $(this).removeClass('icon-pause').addClass('icon-play');
        } else {
            $('audio')[0].play();
            $(this).removeClass('icon-play').addClass('icon-pause');
        }
    })
})

// tab切换栏
var App = angular.module('App',['ngRoute', 'Controllers']);

App.run(['$rootScope', function ($rootScope) {
    $rootScope.show = function () {
        if ($('.book').width() >= 600) {
            $('.book .content').stop().fadeOut(200, function() {
                $('.book').css('width', '78px');
                $('.book')[0].addEventListener('webkitTransitionEnd',function() {
                    $('.book').css('width','800px');
                    $('.book .content').delay(800).slideDown(1000);
                });
            });
        } else if ($('.book').width() <= 300) {
            $('.book').css('width', '800px');
            $('.book')[0].addEventListener('webkitTransitionEnd',function() {
                if ($('.book').css('width') == '800px') {
                    $('.book .content').slideDown(1000);
                }
            });
        }
    };
}])

// 配置tab栏路由
App.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: './views/home.html',
        controller: 'HomeController'
    })
    .when('/items', {
        templateUrl: './views/items.html',
        controller: 'ItemsController'
    })
    .when('/tag', {
        templateUrl: './views/tag.html',
        controller: 'TagController'
    })
    .when('/hobby', {
        templateUrl: './views/hobby.html',
        controller: 'HobbyController'
    })
    .when('/about', {
        templateUrl: './views/about.html',
        controller: 'AboutController'
    })
    .otherwise({
        redirectTo : '/'
    });
}]);
