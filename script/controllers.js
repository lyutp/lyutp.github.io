
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
        {category:'node',path:'./items/node/index.html'}
    ]
}])