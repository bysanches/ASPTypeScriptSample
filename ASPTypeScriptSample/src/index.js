function executeHtmlResult(result) {
    var view = ASPTypeScriptSample.View;
    Handlebars.registerHelper('active', function (controller) {
        return view.activeNavItem(controller);
    });
    Handlebars.registerHelper('navItem', function (label, controller, action) {
        return new Handlebars.SafeString(view.navItem(label, controller, action));
    });
    var template = view.getTemplate('/src/views/shared/layout.html');
    return template({
        title: view.getTitle(),
        body: result.content,
        scripts: view.renderScripts()
    });
}
function main() {
    var router = new ASPTypeScriptSample.Routers.QueryStringRouter();
    var actionDelegate = router.route();
    var result = actionDelegate();
    switch (result.constructor) {
        case ASPTypeScriptSample.Controllers.HtmlResult:
            Response.Write(executeHtmlResult(result));
            break;
        case ASPTypeScriptSample.Controllers.HttpErrorResult:
            Response.Status = result.error.code;
            Response.Write(executeHtmlResult(new ASPTypeScriptSample.Controllers.HtmlResult(result.toString())));
            break;
        default:
            Response.Write(result);
    }
}
//# sourceMappingURL=index.js.map