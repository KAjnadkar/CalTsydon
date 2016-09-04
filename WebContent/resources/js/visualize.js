window.onload = function(e) {		
	document.getElementById('music-files').addEventListener('change', selectMusic, false);
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
	console.log("$$$$$$$$$$$$$$$");
	console.log(analyser);
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