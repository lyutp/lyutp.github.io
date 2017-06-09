
angular.module('Controllers', [])

// tab栏控制器
.controller('NavController', ['$scope', function ($scope) {

    // tab栏的数据
    $scope.tabs = [
        {url: '#/home', icon: 'icon-home', content: 'Home'},
        {url: '#/items', icon: 'icon-quill', content: 'Items'},
        {url: '#/tag', icon: 'icon-bookmarks', content: 'Tag'},
        {url: '#/hobby', icon: 'icon-music', content: 'Hobby'},
        {url: '#/about', icon: 'icon-user-tie', content: 'About'}
    ];
}])
.controller('HomeController', ['$scope', function ($scope) {
    $scope.word = 'I am in Chongqing!';
}])
.controller('ItemsController', ['$scope', function ($scope) {
    $scope.items = [
        {category:'仿京东首页',path:'./items/jd/index.html'},
        {category:'仿京东手机首页',path:'./items/jd_m/index.html'},
        {category:'响应式布局-wjs',path:'./items/wjs/index.html'},
        {category:'Flappy bird',path:'./items/flappy_bird/index.html'},
        {category:'仿豆瓣一刻',path:'./items/Yike/index.html'},
        {category:'node',path:'javascript:;'}
    ]
}])
.controller('TagController', ['$scope', function ($scope) {
    $scope.tags = [
        '执着','安静','宅','小自卑'
    ]
}])
.controller('HobbyController', ['$scope', function ($scope) {
    $scope.hobbys = [
        '在空闲的时间里到处走一走','在属于自己的时间里提升自己','在属于自己的时间里做自己想做的一些事，比如：弹弹琴','身体最重要锻炼身体'
    ]
}])
.controller('AboutController', ['$scope', function ($scope) {
    $scope.aboutMe = {
        name: 'name: lvtianpeng',
        yearOfBirth: 'yearOfBirth: 1993',
        qq: 'qq: 358824425',
        email: 'email: 358824425@qq.com'
    }
}])