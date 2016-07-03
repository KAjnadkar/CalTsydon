function sendResponse() {
    var response = document.getElementById('response').value;
    var messageToServer = {
    	messageType: "clientResponse",
    	message: response,
    	conversationId: gup("conv_id", window.location.href)
    };
    stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));
}

var lastResponseReceived = "-1";

function pingServer(){
	var messageToServer = {
	 	messageType: "requestResponses",
	  	message: lastResponseReceived,
	  	conversationId: gup("conv_id", window.location.href)
	};
	stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));
	console.log("!!!!!!!!!!!!!!!!!!!!!!!");
}

var stompClient = null;


function connect() {
	setTimeout(function(){		
	    var socket = new SockJS('/responseStream');
	    stompClient = Stomp.over(socket);
	    stompClient.connect({}, function(frame) {
	        console.log('Connected: ' + frame);
	        stompClient.subscribe('/ct/responses', function(greeting){
	        	console.log(">>>>>>>>>>>>>>>>>>>");
	        	console.log(greeting);
	            showGreeting(JSON.parse(greeting.body).greeting);
	        });
	    });		
	}, 1500);
	
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
		pingServer();
		pingServerLoop();
	}, 8000);
}
  