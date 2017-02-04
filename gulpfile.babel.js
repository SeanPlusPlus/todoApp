/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import watch from 'gulp-watch';
import del from 'del';
import webpack from 'webpack-stream';
import connect from 'gulp-connect';
import open from 'gulp-open';
import exec from 'gulp-exec';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  clientEntryPoint: 'src/index.js',
  clientBundle: 'dist/client-bundle.js?(.map)',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
};

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('main', ['lint', 'clean'], () => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
  watch(paths.distDir).pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    root: paths.distDir,
    livereload: true,
    port: 3000,
  });
});

gulp.task('op', () => {
  const options = {
    uri: 'http://localhost:3000',
    app: 'google chrome',
  };
  gulp.src(paths.distDir)
    .pipe(open(options));
});

gulp.task('default', ['watch', 'main', 'connect', 'op']);

gulp.task('server', () => {
  exec('node server.js', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
  });
});
