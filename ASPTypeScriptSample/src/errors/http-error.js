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
var HttpError = (function () {
    function HttpError(code, message) {
        this.code = code;
        this.message = message;
        this.name = 'HttpError';
        this.message = this.code + ' ' + this.message;
    }
    HttpError.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return HttpError;
}());
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        var _this = _super.call(this, 404, 'Not Found') || this;
        _this.name = 'NotFoundError';
        return _this;
    }
    return NotFoundError;
}(HttpError));
var MethodNotAllowedError = (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError() {
        var _this = _super.call(this, 405, 'Method Not Allowed') || this;
        _this.name = 'MethodNotAllowedError';
        return _this;
    }
    return MethodNotAllowedError;
}(HttpError));
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError() {
        var _this = _super.call(this, 400, 'Bad Request') || this;
        _this.name = 'BadRequestError';
        return _this;
    }
    return BadRequestError;
}(HttpError));
//# sourceMappingURL=http-error.js.map