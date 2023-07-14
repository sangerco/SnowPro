"use strict";
// creates custom errors to provide specific codes instead of the generic 500 error
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.BadRequestError = exports.UnauthorizedError = exports.NotFoundError = exports.ExpressError = void 0;
var ExpressError = /** @class */ (function (_super) {
    __extends(ExpressError, _super);
    function ExpressError(message, status) {
        var _this = this;
        _this = _super.call(this, message) || this,
            _this.status = status;
        return _this;
    }
    return ExpressError;
}(Error));
exports.ExpressError = ExpressError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(errors) {
        var _this = this;
        if (typeof errors === 'string') {
            _this = _super.call(this, errors) || this;
        }
        else {
            _this = _super.call(this, errors.join('\n')) || this;
        }
        _this.name = 'Not Found';
        return _this;
    }
    return NotFoundError;
}(Error));
exports.NotFoundError = NotFoundError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(errors) {
        var _this = this;
        if (typeof errors === 'string') {
            _this = _super.call(this, errors) || this;
        }
        else {
            _this = _super.call(this, errors.join('\n')) || this;
        }
        _this.name = 'Unauthorized';
        return _this;
    }
    return UnauthorizedError;
}(Error));
exports.UnauthorizedError = UnauthorizedError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(errors) {
        var _this = this;
        if (typeof errors === 'string') {
            _this = _super.call(this, errors) || this;
        }
        else {
            _this = _super.call(this, errors.join('\n')) || this;
        }
        _this.name = 'BadRequestError';
        return _this;
    }
    return BadRequestError;
}(Error));
exports.BadRequestError = BadRequestError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(errors) {
        var _this = this;
        if (typeof errors === 'string') {
            _this = _super.call(this, errors) || this;
        }
        else {
            _this = _super.call(this, errors.join('\n')) || this;
        }
        _this.name = 'Forbidden';
        return _this;
    }
    return ForbiddenError;
}(Error));
exports.ForbiddenError = ForbiddenError;
