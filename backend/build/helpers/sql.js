"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlForPartialUpdate = void 0;
var expressError_1 = require("../expressError");
var sqlForPartialUpdate = function (dataToUpdate, nodeToSql) {
    var keys = Object.keys(dataToUpdate);
    if (keys.length === 0) {
        throw new expressError_1.BadRequestError("No data");
    }
    var cols = keys.map(function (colName, idx) {
        return "\"".concat(nodeToSql[colName] || colName, "\"=$").concat(idx + 1);
    });
    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate)
    };
};
exports.sqlForPartialUpdate = sqlForPartialUpdate;
