"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var expressError_1 = require("./expressError");
var auth_1 = require("./middleware/auth");
var messages_1 = __importDefault(require("./routes/messages"));
var reviews_1 = __importDefault(require("./routes/reviews"));
var skiAreas_1 = __importDefault(require("./routes/skiAreas"));
var users_1 = __importDefault(require("./routes/users"));
var photos_1 = __importDefault(require("./routes/photos"));
var videos_1 = __importDefault(require("./routes/videos"));
var tags_1 = __importDefault(require("./routes/tags"));
var favMountains_1 = __importDefault(require("./routes/favMountains"));
var config_1 = require("./config");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(morgan('combined')); - deal with this later
app.use(auth_1.authenticateJWT);
app.use(messages_1.default);
app.use(reviews_1.default);
app.use(skiAreas_1.default);
app.use(users_1.default);
app.use(photos_1.default);
app.use(videos_1.default);
app.use(tags_1.default);
app.use(favMountains_1.default);
app.use(function (req, res, next) {
    return next(new expressError_1.NotFoundError("Route not found."));
});
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test')
        console.error(err.stack);
    var status = err.status || 500;
    var message = err.message;
    return res.status(status).json({
        error: { message: message, status: status }
    });
});
app.listen(config_1.PORT, function () {
    console.log('Now listening on port 5000');
});
