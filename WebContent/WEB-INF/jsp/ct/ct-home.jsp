<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<spring:url value="/js/CTHomeJS.js" var="mainJs" />

	<meta name="_csrf" th:content="${_csrf.token}"/>
  	<meta name="_csrf_header" th:content="${_csrf.headerName}"/>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Insert title here</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.1/sockjs.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>	
	<script src="${mainJs}"></script>
</head>
<body>
	<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being enabled. Please enable
    Javascript and reload this page!</h2></noscript>
	<div>    
        <label>What is your question or topic?</label><input type="text" id="questionOrTopic" />
        <button id="sendName" onclick="sendquestionOrTopic();">Send</button>
        <p id="response"></p>	    
	</div>
</body>
</html>