//$(document).ready(function() {
//	console.log(">>>>>>>>>>>>>>>>>>>>>>>");
//	console.log("Begin stitching");
//	console.log(">>>>>>>>>>>>>>>>>>>>>>>");	
//});


var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connect() {
    var socket = new SockJS('/initConversation');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function(greeting){
        	console.log(">>>>>>>>>>>>>>>>>>>");
        	console.log(greeting);
            showGreeting(JSON.parse(greeting.body).greeting);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendquestionOrTopic() {
	var questionOrTopic = document.getElementById('questionOrTopic').value;
	window.location.href = "/ct/responses?q=" + questionOrTopic;
}

function showGreeting(message) {	
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}