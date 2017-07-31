var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function (_super) {
            __extends(HomeController, _super);
            function HomeController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            HomeController.prototype.index = function () {
                var model = { message: 'Classic ASP + TypeScript Sample Web App' };
                return this.view('/src/views/home/index.html', model);
            };
            HomeController.prototype.about = function () {
                throw new Error('not implemented');
            };
            return HomeController;
        }(Controllers.BaseController));
        Controllers.HomeController = HomeController;
    })(Controllers = ASPTypeScriptSample.Controllers || (ASPTypeScriptSample.Controllers = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=home-controller.js.map