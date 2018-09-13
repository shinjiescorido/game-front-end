<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<style type="text/css">
	body,html{
		background: #000;
		width: 100%;
		height: 100%
	}
	#flippy-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 999;
		display: none
	}
	#flippy-wrap canvas {
		top:46%;
	}
</style>
<body>
<div id="flippy-wrap">
	
</div>
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script type="text/javascript"> window.isMobile = false </script>
<script src="/js/createjs/createjs-2015.11.26.min.js"></script>
<script src="/js/flippify-js/dependency/hammer.min.js"></script>
<script src="/js/flippify-js/dependency/isMobile.min.js"></script>
<script src="/js/flippify-js/dependency/device.min.js"></script>
<script src="/js/flippify-js/dependency/rAF.js"></script>
<script src="/js/flippify-js/dependency/TweenMax.min.js"></script>
	<script src="/js/flippify-js/flippify-2-mobile.js"></script>
	<script src="/js/flippify-js/flippify-2-mobile.js"></script>
	<script type="text/javascript" src="/dist/testfpf.js"></script>
</body>
</html>