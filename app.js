const errcode = require("./utils/error/errcode");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
	res.status(404)
		.send("404");
});
// error handler
// eslint-disable-next-line no-unused-vars
app.use(function ErrorHandler(err, req, res, next) {
	const error = errcode(err.errcode);
	console.log(err);
	res.status(error.status);
	res.send({ ...error.body, ...(err.name === "MyError" ? err.resBody : {}) });
});

module.exports = app;
