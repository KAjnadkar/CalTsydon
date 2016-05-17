<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<h1>Titania</h1>
	<p>Time on the server is ${time}</p>

	<form action="/j_spring_security_check" method="POST">
		<label for="username">User Name:</label> <input id="username"
			name="j_username" type="text" /> <label for="password">Password:</label>
		<input id="password" name="j_password" type="password" /> <input
			type="submit" value="Log In" />
	</form>

</body>
</html>