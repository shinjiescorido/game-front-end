<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=lato-regular" rel="stylesheet">
	<title>rejected</title>
</head>
<style type="text/css">
html, body{
	height: 100%;
	width: 100%;
	padding: 0;
	margin: 0;
	background: #000;
	overflow: hidden;
	font-family: lato-regular;
}
	.container {
		background: #cf2112;
		color:#fff;
		position: absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
	}
	.patterdown {
		width: 500px;
    height: 420px;
    background: url(/img/maintenance/pattern_right.png) no-repeat;
    position: fixed;
    right: -4%;
    top: 61%;
    background-size: contain;
	}
	.dom-resizable {
		    -webkit-transform-origin: right top;
    -moz-transform-origin: right top;
    -ms-transform-origin: right top;
    -o-transform-origin: right top;
    transform-origin: right top;
	}
	.patternLeft {
    width: 550px;
    height: 420px;
    background: url(/img/maintenance/pattern_left.png) no-repeat;
    position: fixed;
    top: 0%;
    right: 71.4%;
    background-size: contain;
	}
	.nihtanLogo {
		width: 550px;
    height: 130px;
    background: url(/img/maintenance/logo.png) no-repeat;
    position: fixed;
    top: 26%;
    right: 36%;
	}
	.title , .content{
		top:40%;
		right: 40%;
		position: absolute;
		font-size: 60px;
	}
	.content{
		font-size: 40px;
		top:64%;
		right: 0%;
		text-align: center;
		width: 1920px;
		font-size: 55px;
	}
	.chip-error{
    background: url(/img/common/chip_error.png) no-repeat;
    background-size: 100%;
    width: 200px;
    height: 200px;
        top: 42%;
    right: 45.5%;
    position: absolute;
	}
</style>
<body>
	<div class="container">
		<div class="nihtanLogo dom-resizable"></div>
		<div class="patterdown dom-resizable"></div>
		<div class="patternLeft dom-resizable"></div>
		<div class="chip-error dom-resizable"></div>
		<div class="content dom-resizable">{{trans('ingame.rejected')}}</div>
	</div>
</body>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script type="text/javascript">

	var baseWidth = 1920;
	var baseHeight = 1080;

	resize(window.innerWidth, window.innerHeight);
	window.addEventListener("resize", function () {
		resize(window.innerWidth, window.innerHeight);
	});

	function resize(newWidth, newHeight) {
		var baseRatio = baseWidth / baseHeight,
			newRatio = newWidth / newHeight;

		if(newRatio > baseRatio) {
			newWidth = newHeight * baseRatio;
		} else {
			newHeight = newWidth / baseRatio
		}
		$(".container").css({
        width:newWidth , height: newHeight
    });

		$(".dom-resizable").css({
    	transform: "scale(" + (newWidth / baseWidth) + ")"
		});

	}
</script>
</html>
