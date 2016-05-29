<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<h1>Titania</h1>
	<p>Time on the server is ${time}</p>

	<form name="f" action="<c:url value='/login'/>" method="POST">
		<label for="username">User Name:</label> <input id="username" name="username" type="text" /> <label for="password">Password:</label>
		<input id="password" name="password" type="password" /> <input type="submit" value="Log In" />
		<input type="hidden"  name="${_csrf.parameterName}" value="${_csrf.token}" />
	</form>

</body>
</html>