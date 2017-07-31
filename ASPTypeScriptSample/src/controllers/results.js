var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var Controllers;
    (function (Controllers) {
        var HtmlResult = (function () {
            function HtmlResult(content) {
                this.content = content;
            }
            HtmlResult.prototype.toString = function () {
                return this.content;
            };
            return HtmlResult;
        }());
        Controllers.HtmlResult = HtmlResult;
        var HttpErrorResult = (function () {
            function HttpErrorResult(error) {
                this.error = error;
            }
            HttpErrorResult.prototype.toString = function () {
                return this.error.name + ": " + this.error.message;
            };
            return HttpErrorResult;
        }());
        Controllers.HttpErrorResult = HttpErrorResult;
    })(Controllers = ASPTypeScriptSample.Controllers || (ASPTypeScriptSample.Controllers = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=results.js.map