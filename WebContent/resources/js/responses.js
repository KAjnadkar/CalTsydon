var lastResponseReceived = "-1";
var stompClient = null;
var pingEverySecs = 8000;
var runPingServerLoop = true;
var clientUserName = "";


function sendResponse() {
    var response = document.getElementById('my-response').value;
    var messageToServer = {
    	messageType: "clientResponse",
    	message: response,
    	userName: clientUserName,
    	conversationId: gup("conv_id", window.location.href)
    };
    stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));
    document.getElementById('my-response').value = "";
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
	        	var messageType = JSON.parse(messageFromServer.body).type;	        	
	        	if(messageType === "userName"){	  
	        		clientUserName = JSON.parse(messageFromServer.body).message;	        		
	        	}
	        	else{	        		
		        	var messages = JSON.parse(messageFromServer.body).messages;
		        	var conversationMainDiv = document.getElementById("conversation-main");
		        	messages.map(function(message){	     
		        		if(message.message.length != 0){
			        		var newMessage = document.createElement("div");
//			        		newMessage.innerHTML = message.message;
			        		
			        		var userNameSpan = document.createElement("span");
			        		userNameSpan.innerHTML = message.userName;
			        		$(userNameSpan).addClass("response-user-name");		        		
			        		
			        		var messageSpan = document.createElement("span");
			        		messageSpan.innerHTML = message.message;
			        		$(messageSpan).addClass("response-message");
			        		
			        		newMessage.appendChild(userNameSpan);
			        		newMessage.appendChild(messageSpan);
			        		
			        		$(newMessage).addClass("response");
			        		$(newMessage).css("display", "none");
			        		conversationMainDiv.appendChild(newMessage);
			        		$(newMessage).show("highlight", 1500);
		        		}
		        	});
		        	lastResponseReceived = messages[messages.length - 1].timestamp.toString();	        		
	        	}	        	
	        });
	    });		
	}, 1000);
	
	requestUserName();
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

function requestUserName(){
	setTimeout(function(){
		var messageToServer = {
			 	messageType: "requestUserName",
			  	message: lastResponseReceived,
			  	conversationId: gup("conv_id", window.location.href)
			};
			stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));
	}, 3500);
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