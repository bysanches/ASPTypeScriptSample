var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var View;
    (function (View) {
        var scripts = [];
        function registerScript(src) {
            scripts.push(src);
        }
        View.registerScript = registerScript;
        function renderScripts() {
            return scripts.map(function (src) { return "<script src=\"" + src + "\"></script>"; }).join();
        }
        View.renderScripts = renderScripts;
        function getTemplate(path) {
            var stream = new ActiveXObject('ADODB.Stream');
            stream.Type = adTypeText;
            stream.CharSet = 'utf-8';
            stream.Open();
            stream.LoadFromFile(Server.MapPath(path));
            var result = stream.ReadText();
            stream.Close();
            return Handlebars.compile(result);
        }
        View.getTemplate = getTemplate;
        function activeNavItem(controller, action) {
            if (action === void 0) { action = 'index'; }
            var c = Request.QueryString('c')() || 'home';
            var a = Request.QueryString('a')() || 'index';
            if (controller === c && action === a)
                return 'active';
        }
        View.activeNavItem = activeNavItem;
        function navItem(label, controller, action) {
            if (controller === void 0) { controller = 'home'; }
            if (action === void 0) { action = 'index'; }
            var active = activeNavItem(controller, action);
            return "<li class=\"nav-item " + active + "\">\n                  <a class=\"nav-link\" href=\"?c=" + controller + "&a=" + action + "\">" + label + "</a>\n                </li>";
        }
        View.navItem = navItem;
        var title;
        function setTitle(t) {
            title = t;
        }
        View.setTitle = setTitle;
        function getTitle() {
            return (title && title + ' - ' || '') + 'Classic ASP + TypeScript';
        }
        View.getTitle = getTitle;
    })(View = ASPTypeScriptSample.View || (ASPTypeScriptSample.View = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=view.js.map