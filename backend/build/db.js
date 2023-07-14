"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = require("./config");
var db;
if (process.env.NODE_ENV === 'production') {
    var dbConfig = {
        connectionString: (0, config_1.getDatabaseURI)(),
        ssl: {
            rejectUnauthorized: false
        }
    };
    db = new pg_1.Client(dbConfig);
}
else {
    var dbConfig = {
        connectionString: (0, config_1.getDatabaseURI)()
    };
    db = new pg_1.Client(dbConfig);
}
db.connect();
exports.default = db;
