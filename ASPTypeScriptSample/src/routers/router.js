var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var Routers;
    (function (Routers) {
        function isNullOrWhitespace(str) {
            return str == null || /^\s*$/.test(str);
        }
        function dashedToPascalCase(dashed) {
            if (dashed != null) {
                return dashed.replace(/^([a-z])|-([a-z])/g, function (match) { return match.toUpperCase(); }).replace('-', '');
            }
        }
        var QueryStringRouter = (function () {
            function QueryStringRouter(defaultCtrl, defaultAction) {
                this.controllerName = Request.QueryString('c')();
                this.actionName = Request.QueryString('a')();
                if (isNullOrWhitespace(this.controllerName))
                    this.controllerName = defaultCtrl || 'home';
                if (isNullOrWhitespace(this.actionName))
                    this.actionName = defaultAction || 'index';
            }
            QueryStringRouter.prototype.getControllerClassName = function (controller) {
                return dashedToPascalCase(controller) + 'Controller';
            };
            QueryStringRouter.prototype.invalidRoute = function () {
                throw new Error('Path not found:' +
                    (" c = " + this.controllerName + ",") +
                    (" a = " + this.actionName));
            };
            QueryStringRouter.prototype.route = function () {
                var controllers = ASPTypeScriptSample.Controllers;
                var ctrlClassName = this.getControllerClassName(this.controllerName);
                var ctrlClass = controllers[ctrlClassName];
                var actionMethod = ctrlClass && ctrlClass.prototype[this.actionName];
                if (ctrlClass != null && actionMethod != null) {
                    return function () { return actionMethod.call(new ctrlClass()); };
                }
                else {
                    this.invalidRoute();
                }
            };
            return QueryStringRouter;
        }());
        Routers.QueryStringRouter = QueryStringRouter;
    })(Routers = ASPTypeScriptSample.Routers || (ASPTypeScriptSample.Routers = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=router.js.map