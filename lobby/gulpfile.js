var elixir = require('laravel-elixir');
require('laravel-elixir-sass-compass');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
	mix.compass('app.scss')
	// .browserify('lobby.js', 'public/dist/lobby.min.js')
	// .browserify('reel-sample/boot.js', 'public/dist/reel.min.js')
	// .browserify('lobby-mobile.js', 'public/dist/lobby-mobile.min.js')
	// .browserify('lobby-mobile-content.js', 'public/dist/lobby-mobile-content.min.js')
	// .browserify('lobby-mobile-content.js', 'public/dist/lobby-mobile-content.min.js')
	// .browserify('v2/main.js', 'public/dist/main.js')
	.browserify('3.0/mobile/main-mobile.js', 'public/dist/main-mobile-3.0.js')
	// .browserify('v2-web/main.js', 'public/dist/main-2.js')
	.browserify('3.0/main.js', 'public/dist/main-3.0.js')
});



// elixir(function(mix) {
// 	mix.browserify('dragon-tiger-mobile.js', 'public/dist/dragon-tiger-mobile.min.js');
// });
