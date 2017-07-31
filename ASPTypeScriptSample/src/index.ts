function executeHtmlResult(result: ASPTypeScriptSample.Controllers.HtmlResult): string {
    let view = ASPTypeScriptSample.View;

    Handlebars.registerHelper('active', controller =>
        view.activeNavItem(controller));

    Handlebars.registerHelper('navItem', (label: string, controller: string, action: string) =>
        new Handlebars.SafeString(view.navItem(label, controller, action)));

    let template = view.getTemplate('/src/views/shared/layout.html');

    return template({
        title: view.getTitle(),
        body: result.content,
        scripts: view.renderScripts()
    });
}

function main() {
    let router = new ASPTypeScriptSample.Routers.QueryStringRouter();
    let actionDelegate = router.route();
    let result = actionDelegate();

    switch (result.constructor) {
        case ASPTypeScriptSample.Controllers.HtmlResult:
            Response.Write(executeHtmlResult(result));
            break;
        case ASPTypeScriptSample.Controllers.HttpErrorResult:
            Response.Status = result.error.code;
            Response.Write(executeHtmlResult(
                new ASPTypeScriptSample.Controllers.HtmlResult(result.toString())));
            break;
        default:
            Response.Write(result);
    }
}