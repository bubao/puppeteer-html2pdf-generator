function MyError(errcode = 50000, message = {}) {
	this.name = "MyError";
	this.errcode = errcode;
	this.resBody = message;
	this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;
// global.MyError = MyError;
module.exports = MyError;