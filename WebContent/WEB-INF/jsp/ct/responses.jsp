<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<spring:url value="/js/responses.js" var="responsesJs" />
	<spring:url value="/css/ct-responses.css" var="responsesCss" />

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Honest Chat - Conversation</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.1/sockjs.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>	
	<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
	<script src="${responsesJs}"></script>
	<link type="text/css" rel="stylesheet" href="${responsesCss}" />
</head>
<body onload="connect()">	
	<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being enabled. Please enable
    Javascript and reload this page!</h2></noscript>

	<div id="topbar-container">
		<div class="topbar-logo">Candid Chat</div>
		<div class="topbar-action-item"><a href="/ct/ct-home">Start A New Conversation</a></div>
		<div class="topbar-action-item" onclick="copyLink()">Copy Link</div>
		<div class="topbar-action-item"><a href="/ct/faq">FAQ</a></div>
		<div class="topbar-action-item"><a href="/ct/contact">Contact</a></div>
		<div class="topbar-action-item"><a href="/ct/blog">Blog</a></div>
	</div>
	
	<div style="clear: both"></div>
	<br/>

	<div id="topic-div">
    	<div id="topic-spinner">
    		<label class="spinner-label">Loading your chat...</label><br/>
        	<img class="topic-spinner-spinner" id="loading" src="/img/loading.gif"/>
    	</div>
    	<div id="topic" style="display:none;">    		
    	</div>
    	<div id="username-div" style="display:none;">
    	</div>
    </div>    
	
    <div id="conversation-div" style="display:none;">
    	<div id="conversation-main"></div>
    	<br/>
        <input type="text" id="my-response" />
        <button id="send-response" onclick="sendResponse();">Send Response</button>        
    </div>

</body>
</html>