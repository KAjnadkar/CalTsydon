window.onload = function(e) {		
	document.getElementById('music-files').addEventListener('change', selectMusic, false);
	setTimeout(function(){ 
		initWebgl();
	}, 500);
}

var musicFiles = [];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio;
var audioSrc;
var analyser;
var bufferLength;
var dataArray;

function selectMusic(e) {	
	musicFiles = e.target.files;	
}

function getFreq(){
	requestAnimationFrame(getFreq);
	analyser.getByteFrequencyData(dataArray);
	console.log(">>>>>>>>>>>>>>>");
	console.log(dataArray[240])
}

function play(){	
	var num = Math.floor(Math.random()*musicFiles.length);
	console.log("playing=" + num);
	var musicFile = URL.createObjectURL(musicFiles[num]); 
	$("#music").attr("src", musicFile);
	document.getElementById('music').play();
	
	audio = document.getElementById('music');
	audioSrc = audioCtx.createMediaElementSource(audio);	
	analyser = audioCtx.createAnalyser();
	audioSrc.connect(analyser);
	analyser.connect(audioCtx.destination);
	bufferLength = analyser.frequencyBinCount;
	dataArray = new Uint8Array(bufferLength);
	
	drawVisual = requestAnimationFrame(getFreq);
	getFreq();
}

function stop(){
	document.getElementById('music').pause();
}

function initWebgl(){
	console.log("Webgl init start");
	var canvas = document.getElementById("web-gl-canvas");
	var gl = canvas.getContext("webgl");
	if(!gl){
		alert("Get a better browser. HTML5 not supported on your current browser.");
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);
	
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		console.log("Vertex Shader compilation failed");
		return;
	}
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		console.log("Fragment Shader compilation failed");
		return;
	}
	
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
		console.log("Linking program failed");
		return;
	}
	
	var vertices = [
	                0.0, 0.5, 1.0, 0.0, 0.0, 
	                -0.5, -0.5, 0.0, 1.0, 0.0,
	                0.5, -0.5, 0.0, 0.0, 1.0
	                ];
	
	var vartixBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vartixBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	var positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
	var colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
	gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
	gl.enableVertexAttribArray(positionAttributeLocation);
	gl.enableVertexAttribArray(colorAttributeLocation);
	
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	console.log("web gl init end");
}

var vertexShaderText = [
                        "precision mediump float;",
                        "attribute vec2 vertPosition;",
                        "attribute vec3 vertColor;",
                        "varying vec3 fragColor;",
                        "",
                        "void main(){",
                        "fragColor = vertColor;",
                        "gl_Position = vec4(vertPosition, 0.0, 1.0);",
                        "}"
                        ].join("\n");

var fragmentShaderText = [
                          "precision mediump float;",
                          "varying vec3 fragColor;",
                          "void main(){",
                          "gl_FragColor = vec4(fragColor, 1.0);",
                          "}"
                          ].join("\n");