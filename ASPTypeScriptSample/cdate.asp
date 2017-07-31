<%@ language="JScript" codepage="65001" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<meta charset="utf-8" />
</head>
<body>
    <%= toVBDate(new Date()) %>
</body>
</html>
<script language="VBScript" runat="server">
    Function toVBDate(ByVal jsDate)
        toVBDate = DateAdd("s", jsDate.getTime() / 1000, #1970-1-1#)
    End Function
</script>