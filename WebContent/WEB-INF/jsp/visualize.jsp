<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js"></script>
<script src="js/visualize.js"></script>
<script src="js/gl-matrix.js"></script>
</head>
<body>
	<h1>Visualize</h1>
	<input type="file" id="music-files" multiple accept="audio/*" />
	<audio id="music" src=""></audio>
	<div class="play" id="play" onclick="play()">Play ></div>
	<div class="stop" id="stop" onclick="stop()">Stop |=| ></div>
	<br />
	<canvas id="web-gl-canvas" width="1500" height="1000" style="border: 1px solid red;"></canvas>
</body>
</html>