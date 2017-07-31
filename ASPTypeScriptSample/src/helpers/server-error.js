function getErrorMessage() {
    var e = Server.GetLastError();
    var result = "ERROR " + new Date().toString() + "\n";
    if (e.ASPCode())
        result += "ASPCode: " + e.ASPCode() + "\n";
    if (e.ASPDescription())
        result += "ASPDescription: " + e.ASPDescription() + "\n";
    if (e.Number())
        result += "Number: " + e.Number().toString(16) + "\n";
    if (e.Source())
        result += "Source: " + e.Source() + "\n";
    if (e.Category())
        result += "Category: " + e.Category() + "\n";
    if (e.Description())
        result += "Description: " + e.Description() + "\n";
    if (e.File())
        result += "File: " + e.File() + "\n";
    if (e.Line())
        result += "Line: " + e.Line() + "\n";
    if (e.Column())
        result += "Column: " + e.Column() + "\n";
    result += '\nAPPLICATION\n' + getSummary(Application.Contents);
    result += '\nSESSION\n' + getSummary(Session.Contents);
    result += '\nQUERYSTRING\n' + getSummary(Request.QueryString);
    result += '\nFORM\n' + getSummary(Request.Form);
    result += '\nCOOKIES\n' + getSummary(Request.Cookies);
    result += '\nSERVER VARIABLES\n' + getServerVariablesSummary();
    return result;
}
function getSummary(dic) {
    var result = '';
    for (var i = 1; i <= dic.Count(); i++) {
        var key = dic.Key(i);
        var val = dic.Item(key);
        result += key + ": " + val + "\n";
    }
    return result;
}
function getServerVariablesSummary() {
    var result = "URL: " + Request.ServerVariables('URL')() + "\n";
    var referer = Request.ServerVariables('HTTP_REFERER')();
    if (referer)
        result += "HTTP_REFERER: " + referer + "\n";
    var userAgent = Request.ServerVariables('HTTP_USER_AGENT')();
    if (userAgent)
        result += "HTTP_USER_AGENT: " + userAgent;
    return result;
}
//# sourceMappingURL=server-error.js.map