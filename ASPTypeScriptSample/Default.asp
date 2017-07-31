<%@  language="VBScript" codepage="65001" %>
<% Response.ContentType = "text/html; charset=utf-8" %>

<!--#include file="src/helpers/vb-functions.asp"-->

<script language="JScript" runat="server" src="lib/json2.js"></script>
<script language="JScript" runat="server" src="lib/handlebars.js"></script>
<script language="JScript" runat="server" src="lib/moment.js"></script>
<script language="JScript" runat="server" src="lib/polyfills.js"></script>

<script language="JScript" runat="server" src="src/errors/http-error.js"></script>
<script language="JScript" runat="server" src="src/domain/validator.js"></script>
<script language="JScript" runat="server" src="src/helpers/view.js"></script>
<script language="JScript" runat="server" src="src/helpers/handlebars-helpers.js"></script>
<script language="JScript" runat="server" src="src/repositories/base-repository.js"></script>
<script language="JScript" runat="server" src="src/repositories/student-repository.js"></script>
<script language="JScript" runat="server" src="src/controllers/results.js"></script>
<script language="JScript" runat="server" src="src/controllers/base-controller.js"></script>
<script language="JScript" runat="server" src="src/controllers/home-controller.js"></script>
<script language="JScript" runat="server" src="src/controllers/student-controller.js"></script>
<script language="JScript" runat="server" src="src/routers/router.js"></script>
<script language="JScript" runat="server" src="src/index.js"></script>

<% main %>
