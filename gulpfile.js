
var gulp = require( 'gulp' ),

    less = require( 'gulp-less' ),

    cssmin = require( 'gulp-cssmin' ),

    autoprefixer = require( 'gulp-autoprefixer' ),

    rev = require( 'gulp-rev' ),

    revCollector = require( 'gulp-rev-collector' ),

    rename = require( 'gulp-rename' ),

    imagemin = require( 'gulp-imagemin' ),

    useref = require( 'gulp-useref' ),

    gulpif = require( 'gulp-if' ),

    uglify = require( 'gulp-uglify' ),

    htmlmin = require( 'gulp-htmlmin' );

// css 编译
gulp.task( 'less', function () {
    return gulp.src( './css/*.less' )
        // 将less编译为css
        .pipe( less() )
        // 压缩css
        .pipe( cssmin() )
        // 并添加css私有化前缀
        .pipe( autoprefixer() )
        // 将css存入指定 文件目录
        .pipe( gulp.dest( './release/css' ) );
});

// images 压缩
gulp.task( 'image', function () {
    return gulp.src( [ './images/*', './release/images/*'], { base : './' } )
        // 压缩图片
        .pipe( imagemin() )
        // 存入指定路径
        .pipe( gulp.dest( './release' ) );

});


// 处理其他不需要特别处理的资源( api,scripts,libs,fonts,icon )
gulp.task( 'other', function () {
    return gulp.src( [ './scripts/*', './fonts/*','./favicon.ico','./audio/*','./libs/*' ],{ base : './' } )
        .pipe( gulp.dest( './release' ) );
});

// html 压缩
gulp.task( 'html', function () {
    return gulp.src( ['./views/*.html', './index.html'] ,{ base : './'} )
        // 去除空白字符， 删除注释, 压缩js
        // htmlmin( {collapseWhitespace: true, removeComments: true, minifyJS: true} )
        .pipe( htmlmin( {collapseWhitespace: true, removeComments: true} ) )
        .pipe( gulp.dest( './release' ) );
});


// 设置默认(一步操作全部处理)
gulp.task( 'default', [ 'less', 'other', 'image', 'html'] );