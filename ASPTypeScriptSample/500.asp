<%@ language="VBScript" codepage="65001" %>
<script language="JScript" runat="server" src="src/helpers/server-error.js"></script>
<!DOCTYPE html>
<html>
<head>
    <title>ERROR</title>
	<meta charset="utf-8" />
</head>
<body>
    <pre><%= getErrorMessage() %></pre>
</body>
</html>
