<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<spring:url value="/js/CTHomeJS.js" var="mainJs" />
	<spring:url value="/css/ct-home.css" var="mainCss" />

	<meta name="_csrf" th:content="${_csrf.token}"/>
  	<meta name="_csrf_header" th:content="${_csrf.headerName}"/>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Honest Chat - Home</title>	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js"></script>
	<script src="${mainJs}"></script>
	<script src="/js/carousel.js"></script>
	<link type="text/css" rel="stylesheet" href="${mainCss}" />
	<link type="text/css" rel="stylesheet" href="/css/carousel.css" />	
</head>
<body>
	<noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being enabled. Please enable
    Javascript and reload this page!</h2></noscript>
	<div id="carousel-goes-here">
<!-- 		<div class="carousel-container">
			<ul class="carousel">
				<li>one</li>
				<li>two</li>
				<li>three</li>
				<li>four</li>
			</ul>
		</div> -->
	</div>
	<div class="container-main">
		<div class="question-container">    
        	<label class="question-label">What is your question or topic of discussion?</label><br/>
        	<input class="question-text" type="text" id="questionOrTopic" /><br/>
        	<button class="question-send" id="sendName" onclick="sendquestionOrTopic();">Start Conversation</button>
        </div>
        <div class="spinner-container" style="display:none;">
        	<label class="spinner-label">Starting your conversation</label><br/>
        	<img class="spinner" id="loading" src="/img/loading.gif"/>
        </div>	        	    
	</div>
	<div class="oscar-wilde">
		Man is least himself when he talks in his own person.<br/>
		Give him a mask and he will tell you the truth.<br/>
		- Oscar Wilde
	</div>
</body>
</html>