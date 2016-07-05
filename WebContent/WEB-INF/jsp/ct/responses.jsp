<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<spring:url value="/js/responses.js" var="responsesJs" />

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Honest Chat - Conversation</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.1/sockjs.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>	
	<script src="${responsesJs}"></script>
</head>
<body onload="connect()">
	<h>Scarlett</h1>
	<p>Time on the server is ${time}</p>
	
	<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being enabled. Please enable
    Javascript and reload this page!</h2></noscript>
<div>
    <div id="conversation-div">
    	<div id="conversation-main"></div>
        <label>Your response</label><input type="text" id="response" />
        <button id="sendResponse" onclick="sendResponse();">Send</button>        
    </div>
</div>
</body>
</html>