var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var Controllers;
    (function (Controllers) {
        var BaseController = (function () {
            function BaseController() {
            }
            BaseController.prototype.postOnly = function () {
                var method = Request.ServerVariables('REQUEST_METHOD')();
                if (method !== 'POST') {
                    return this.methodNotAllowed();
                }
            };
            BaseController.prototype.methodNotAllowed = function () {
                return new Controllers.HttpErrorResult(new MethodNotAllowedError());
            };
            BaseController.prototype.badRequest = function () {
                return new Controllers.HttpErrorResult(new BadRequestError());
            };
            BaseController.prototype.notFound = function () {
                return new Controllers.HttpErrorResult(new NotFoundError());
            };
            BaseController.prototype.redirectTo = function (ctrl, action, params) {
                if (action === void 0) { action = 'index'; }
                var url = "?c=" + ctrl + "&a=" + action;
                var qs = '';
                if (params != null) {
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            if (qs.length > 0)
                                qs += '&';
                            qs += key + '=' + Server.URLEncode(params[key]);
                        }
                    }
                }
                url += qs.length > 0 ? '&' + qs : '';
                Response.Redirect(url);
            };
            BaseController.prototype.getTemplate = function (path) {
                return ASPTypeScriptSample.View.getTemplate(path);
            };
            BaseController.prototype.view = function (path, data) {
                var template = this.getTemplate(path);
                return new Controllers.HtmlResult(template(data));
            };
            return BaseController;
        }());
        Controllers.BaseController = BaseController;
    })(Controllers = ASPTypeScriptSample.Controllers || (ASPTypeScriptSample.Controllers = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=base-controller.js.map