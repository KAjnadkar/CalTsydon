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
	audio.volume = 0.03;
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
	
	var equalizerVertices = [];
	
	for(j = 0, i = bufferLength - 1 ; i >= 50 ; i--, j++){
		equalizerVertices.push(j*(2/bufferLength)); //x
		equalizerVertices.push(0.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(0.0); //r
		equalizerVertices.push(0.0); //g
		equalizerVertices.push(0.0); //b
	}
	
	var lightVertices = [];
	lightVertices.push(0.0); //x
	lightVertices.push(0.0); //y
	lightVertices.push(0.0); //z
	lightVertices.push(1.0); //r
	lightVertices.push(1.0); //g
	lightVertices.push(1.0); //b
	
	lightVertices.push(100.0); //x
	lightVertices.push(100.0); //y
	lightVertices.push(0.0); //z
	lightVertices.push(1.0); //r
	lightVertices.push(1.0); //g
	lightVertices.push(1.0); //b
	
	lightVertices.push(0.0); //x
	lightVertices.push(200.0); //y
	lightVertices.push(0.0); //z
	lightVertices.push(1.0); //r
	lightVertices.push(1.0); //g
	lightVertices.push(1.0); //b

	
	var lightVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, lightVerticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lightVertices), gl.DYNAMIC_DRAW);
	
	var equalizerVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, equalizerVerticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(equalizerVertices), gl.DYNAMIC_DRAW);	
	
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
	mat4.lookAt(viewMat, [512, 0, 999], [512, 0, 0], [0, 1, 0]);	
	
	gl.uniformMatrix4fv(worldMatUniformLocation, gl.FALSE, worldMat);
	gl.uniformMatrix4fv(viewMatUniformLocation, gl.FALSE, viewMat);
	gl.uniformMatrix4fv(projMatUniformLocation, gl.FALSE, projMat);
			
	var showLights = 0.0;
	var drawLoop = function() {	
		analyser.getByteFrequencyData(dataArray);	

		equalizerVertices = [];
		
		equalizerVertices.push(0.0); //x
		equalizerVertices.push(0.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(1.0); //r
		equalizerVertices.push(0.0); //g
		equalizerVertices.push(0.0); //b
		
		equalizerVertices.push(0.0); //x
		equalizerVertices.push(300.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(1.0); //r
		equalizerVertices.push(0.0); //g
		equalizerVertices.push(0.0); //b
		
		equalizerVertices.push(500.0); //x
		equalizerVertices.push(0.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(0.0); //r
		equalizerVertices.push(1.0); //g
		equalizerVertices.push(0.0); //b
		
		equalizerVertices.push(500.0); //x
		equalizerVertices.push(300.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(0.0); //r
		equalizerVertices.push(1.0); //g
		equalizerVertices.push(0.0); //b
		
		equalizerVertices.push(999.0); //x
		equalizerVertices.push(0.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(0.0); //r
		equalizerVertices.push(0.0); //g
		equalizerVertices.push(1.0); //b
		
		equalizerVertices.push(999.0); //x
		equalizerVertices.push(300.0); //y
		equalizerVertices.push(0.0); //z
		equalizerVertices.push(0.0); //r
		equalizerVertices.push(0.0); //g
		equalizerVertices.push(1.0); //b
		
		showLights = 0.0;
		for(j = 0, i = 0 ; i <= bufferLength ; i++, j++){			
			equalizerVertices.push(j); //x
			equalizerVertices.push(dataArray[i]); //y
			equalizerVertices.push(0.0); //z
			equalizerVertices.push(1.0); //r
			equalizerVertices.push(0.0); //g
			equalizerVertices.push(0.0); //b
			
			equalizerVertices.push(j); //x
			equalizerVertices.push(-dataArray[i]); //y
			equalizerVertices.push(0.0); //z
			equalizerVertices.push(1.0); //r
			equalizerVertices.push(0.0); //g
			equalizerVertices.push(0.0); //b
		}
		
		for(i = 0 ; i < 500 ; i++)
			showLights = showLights + Math.trunc((dataArray[i]/10));
		
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	
		
		gl.bindBuffer(gl.ARRAY_BUFFER, equalizerVerticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(equalizerVertices), gl.DYNAMIC_DRAW);
		gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
		gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.enableVertexAttribArray(colorAttributeLocation);
		gl.drawArrays(gl.LINES, 0, bufferLength*2);
		
		if(showLights > 2500){
			lightVertices = [];	
			
			for(j = 1, i = 0 ; i < 3 ; i++, j++){
				lightVertices.push(j * 250); //x
				lightVertices.push(350.0); //y			
				lightVertices.push(0.0); //z
				lightVertices.push(1.0); //r
				lightVertices.push(1.0); //g
				lightVertices.push(1.0); //b
				
				lightVertices.push((j-1)*250); //x
				lightVertices.push(200.0); //y
				lightVertices.push(0.0); //z
				lightVertices.push(0.0); //r
				lightVertices.push(0.0); //g
				lightVertices.push(0.0); //b
				
				lightVertices.push((j+1)*250); //x
				lightVertices.push(200.0); //y
				lightVertices.push(0.0); //z
				lightVertices.push(0.0); //r
				lightVertices.push(0.0); //g
				lightVertices.push(0.0); //b
			}
			
			gl.bindBuffer(gl.ARRAY_BUFFER, lightVerticesBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lightVertices), gl.DYNAMIC_DRAW);
			gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
			gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
			gl.enableVertexAttribArray(positionAttributeLocation);
			gl.enableVertexAttribArray(colorAttributeLocation);
			gl.drawArrays(gl.TRIANGLES, 0, 9);
		}
		
		
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