window.onload = function(e) {		
	document.getElementById('music-files').addEventListener('change', selectMusic, false);
	setTimeout(function(){		
	}, 500);
}

var musicFiles = [];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio;
var audioSrc;
var analyser;
var bufferLength;
var dataArray;
var animationLoopId;

function selectMusic(e) {	
	musicFiles = e.target.files;	
}

function play(){	
	var num = Math.floor(Math.random()*musicFiles.length);
	console.log("playing=" + num);
	var musicFile = URL.createObjectURL(musicFiles[num]); 
	$("#music").attr("src", musicFile);
	document.getElementById('music').play();
	
	audio = document.getElementById('music');
	audio.volume = 0.2;
	audioSrc = audioCtx.createMediaElementSource(audio);	
	analyser = audioCtx.createAnalyser();
	audioSrc.connect(analyser);
	analyser.connect(audioCtx.destination);
	bufferLength = analyser.frequencyBinCount;
	dataArray = new Uint8Array(bufferLength);
	
	initWebgl();
}

function stop(){
	document.getElementById('music').pause();
	console.log(animationLoopId+ "<<<<<<<<<<<<<<<");
	cancelAnimationFrame(animationLoopId);
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
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);
	
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
	
	var vertices = [];
	
	for(j = 0, i = bufferLength - 1 ; i >= 50 ; i--, j++){
		vertices.push(j*(2/bufferLength)); //x
		vertices.push(0.0); //y
		vertices.push(0.0); //z
		vertices.push(0.0); //r
		vertices.push(0.0); //g
		vertices.push(0.0); //b
	}
	
	var vertixBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertixBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);	
	
	var positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
	var colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
	gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
	gl.enableVertexAttribArray(positionAttributeLocation);
	gl.enableVertexAttribArray(colorAttributeLocation);
	
	var worldMatUniformLocation = gl.getUniformLocation(program, "worldMat");
	var viewMatUniformLocation = gl.getUniformLocation(program, "viewMat");
	var projMatUniformLocation = gl.getUniformLocation(program, "projMat");
	
	gl.useProgram(program);
	
	var projMat = new Float32Array(16);
	var worldMat = new Float32Array(16);
	var viewMat = new Float32Array(16);
	mat4.perspective(projMat, glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 1000.0);
	mat4.identity(worldMat);
	mat4.lookAt(viewMat, [0, 0, -3], [0, 0, 0], [0, 1, 0]);	
	
	gl.uniformMatrix4fv(worldMatUniformLocation, gl.FALSE, worldMat);
	gl.uniformMatrix4fv(viewMatUniformLocation, gl.FALSE, viewMat);
	gl.uniformMatrix4fv(projMatUniformLocation, gl.FALSE, projMat);
		
	var drawLoop = function() {	
		analyser.getByteFrequencyData(dataArray);	

		vertices = [];
		for(j = 0, i = 0 ; i <= bufferLength ; i++){
			if(i % 2 == 0){
				vertices.push(j*0.01); //x
				vertices.push(0.0); //y
				vertices.push(0.0); //z
				vertices.push(1.0); //r
				vertices.push(0.0); //g
				vertices.push(0.0); //b
			}
			else{
				vertices.push(j*0.01); //x
				vertices.push(dataArray[i]/1000); //y
				vertices.push(0.0); //z
				vertices.push(1.0); //r
				vertices.push(0.0); //g
				vertices.push(0.0); //b
				j = j+1;
			}
		}	
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);		
		gl.drawArrays(gl.LINES, 0, bufferLength/2);
		
		requestAnimationFrame(drawLoop);	
	};
	
    animationLoopId = requestAnimationFrame(drawLoop);
	
	console.log("web gl init end");
}

var vertexShaderText = [
                        "precision mediump float;",
                        "attribute vec3 vertPosition;",
                        "attribute vec3 vertColor;",
                        "varying vec3 fragColor;",
                        "uniform mat4 worldMat;",
                        "uniform mat4 viewMat;",
                        "uniform mat4 projMat;",
                        "",
                        "void main(){",
                        "fragColor = vertColor;",
                        "gl_Position = projMat * viewMat * worldMat * vec4(vertPosition, 1.0);",
                        "}"
                        ].join("\n");

var fragmentShaderText = [
                          "precision mediump float;",
                          "varying vec3 fragColor;",
                          "void main(){",
                          "gl_FragColor = vec4(fragColor, 1.0);",
                          "}"
                          ].join("\n");