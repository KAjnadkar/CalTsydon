var lastResponseReceived = "-1";
var stompClient = null;
var pingEverySecs = 30000;
var runPingServerLoop = true;


function sendResponse() {
    var response = document.getElementById('response').value;
    var messageToServer = {
    	messageType: "clientResponse",
    	message: response,
    	conversationId: gup("conv_id", window.location.href)
    };
    stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));
    document.getElementById('response').value = "";
}

function pingServer(){
	var messageToServer = {
	 	messageType: "requestResponses",
	  	message: lastResponseReceived,
	  	conversationId: gup("conv_id", window.location.href)
	};
	stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));	
}

function connect() {
	setTimeout(function(){		
	    var socket = new SockJS('/responseStream');
	    stompClient = Stomp.over(socket);
	    stompClient.connect({}, function(frame) {
	        console.log('Connected: ' + frame);
	        stompClient.subscribe('/ct/responses', function(messageFromServer){	        	
	        	var messages = JSON.parse(messageFromServer.body).messages;
	        	var conversationMainDiv = document.getElementById("conversation-main");
	        	messages.map(function(message){	        		
	        		var newMessage = document.createElement("div");
	        		newMessage.innerHTML = message.message;
	        		conversationMainDiv.appendChild(newMessage);
	        	});
	        	lastResponseReceived = messages[messages.length - 1].timestamp.toString(); 
//	        	console.log(messages);
//	        	console.log(lastResponseReceived);
//	            showGreeting(JSON.parse(greeting.body).greeting);
	        });
	    });		
	}, 1000);
	
	pingServerLoop();
}

function showGreeting(message) {	
    var response = document.getElementById('server-response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function pingServerLoop(){
	setTimeout(function(){
		if(runPingServerLoop){
			pingServer();
			pingServerLoop();
		}
	}, pingEverySecs);
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }        
    runPingServerLoop = false;
    console.log("Disconnected");
}  