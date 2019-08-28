'use strict'

const {
  src,
  dest,
  series
} = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

var bases = {
  app: 'src/',
  dist: 'dist/',
};

var paths = {
  scripts: ['**/*.js']
};

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

// Delete the dist directory
const clear = function () {
  return src(bases.dist)
    .pipe(clean());
};

// Process scripts and concatenate them into one output file
const min = () => src(paths.scripts, {
    cwd: bases.app
  })
  .pipe(uglify())
  .pipe(concat('gridstack-angular.min.js'))
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(dest(bases.dist));
const full = () => src(paths.scripts, {
    cwd: bases.app
  })
  .pipe(concat('gridstack-angular.js'))
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(dest(bases.dist));



exports.default = series(clear, min, full)