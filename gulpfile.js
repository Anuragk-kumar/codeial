const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
//const del = require('del');



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


/* This code defines a Gulp task named 'js' that minifies all JavaScript files in the './assets'
directory and its subdirectories using the 'gulp-uglify-es' plugin. It then adds a revision hash to
the filename using the 'gulp-rev' plugin and generates a manifest file that maps the original
filenames to the new hashed filenames. Finally, it saves the minified and hashed files to the
'./public/assets' directory and the manifest file to the same directory. The 'done()' function is
called to signal the completion of the task. */
gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


/* This task is compressing images using the `gulp-imagemin` plugin. It selects all image files with
extensions `.png`, `.jpg`, `.gif`, `.svg`, and `.jpeg` from the `./assets` directory and its
subdirectories, compresses them, and saves them to the `./public/assets` directory. It also adds a
revision hash to the filename using the `gulp-rev` plugin and generates a manifest file that maps
the original filenames to the new hashed filenames. Finally, it saves the manifest file to the
`./public/assets` directory. The `done()` function is called to signal the completion of the task. */
gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    //del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});