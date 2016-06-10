var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    del = require('del');

gulp.task('images', function(){
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images/'))
    .pipe(notify({message: 'images reload...'}));
});

gulp.task('html', function(){

  gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())
    .pipe(notify({message: 'html reload...'}));
});

gulp.task('css', function(){
  console.log('css....');
  return gulp.src('src/css/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('src/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'css task complete' }));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    // .pipe(concat('main.js'))
    // .pipe(uglify())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .on('error', function(error){
      gutil.log(error)
    })
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'js task complete' }));
});

gulp.task('fonts', function(){
  return gulp.src('src/css/font/*')
    .pipe(gulp.dest('dist/css/font/'));
})

gulp.task('nodes', function(){
  return gulp.src('src/node_modules/**/*')
    .pipe(gulp.dest('dist/node_modules/'));
})

gulp.task('watch', function(){
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/css/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/images/**/*');

  livereload.listen();

  gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('server', function(){
  gulp.src('src')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8800
    }));

  gulp.start('watch');
});

gulp.task('clean', function(cb) {
  del(['dist/'], cb)
});

gulp.task('build', function() {
  gulp.start('images','html', 'css',  'js', 'fonts', 'nodes');
});

gulp.task('test', function(){
  gulp.start('hello');
})

gulp.task('hello', function(){
  console.log('hello gulp....')
})