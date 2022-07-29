const gulp = require('gulp');
const shell = require('gulp-shell');
const rimraf = require('gulp-rimraf');

const outDir = './dist';

// Install
gulp.task('setup', shell.task(['rm-local-modules', 'npm install']));

// Remove build directory
gulp.task('clean', function() {
  return gulp.src(outDir, { read: false, allowEmpty: true }).pipe(rimraf());
});

// Compile Typescript to Javascript
gulp.task('compile', shell.task(['nest build', 'shx cp -r src/modules/mailer/templates dist/modules/mailer/templates']));

// Build project
gulp.task('build', gulp.series('compile'));
gulp.task('default', gulp.series('build'));