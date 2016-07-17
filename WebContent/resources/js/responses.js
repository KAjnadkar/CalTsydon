var lastResponseReceived = "-1";
var stompClient = null;
var pingEverySecs = 30000;
var runPingServerLoop = true;
var clientUserName = undefined;
var topic = undefined;
var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

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
	        		var nameSpan = document.createElement("span");
	        		nameSpan.innerHTML = "You have joined this conversation as " + clientUserName;
	        		var userNameDiv = document.getElementById("username-div");
	        		userNameDiv.appendChild(nameSpan);
	        		$("#username-div").slideDown(1000);
	        	}
	        	else if(messageType === "requestConversatioTopic"){	  
	        		topic = JSON.parse(messageFromServer.body).message;	   
	        		var topicSpan = document.createElement("span");
	        		topicSpan.innerHTML = topic;
	        		$("#topic-spinner").slideUp();
	        		var topicDiv = document.getElementById("topic");
	        		topicDiv.appendChild(topicSpan);
	        		$("#topic").slideDown(1000);
	        		$("#conversation-div").slideDown(1000);
	        	}
	        	else if(messageType === "404"){	  
	        		window.location.href = "/ct/404";
	        	}
	        	else{	        	
	        		var conversationMainDiv = document.getElementById("conversation-main");
	        		var seperator = document.createElement("div");
	        		var date = new Date();
	        		var marker = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	        		seperator.innerHTML = marker;
	        		$(seperator).addClass("response-seq-seperator");
	        		conversationMainDiv.appendChild(seperator);
	        		$(conversationMainDiv).append("<hr/>");
	        		
		        	var messages = JSON.parse(messageFromServer.body).messages;		        	
		        	messages.map(function(message){	     
		        		if(message.message.length != 0){
			        		var newMessage = document.createElement("div");
			        		
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
	}, 500);
	
	requestConversatioTopic();
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
	}, 2500);
}

function requestConversatioTopic(){
	setTimeout(function(){
		var messageToServer = {
			 	messageType: "requestConversatioTopic",
			  	message: lastResponseReceived,
			  	conversationId: gup("conv_id", window.location.href)
			};
			stompClient.send("/ct/responseStream", {}, JSON.stringify(messageToServer));
	}, 2000);
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