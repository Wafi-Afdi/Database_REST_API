function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    const consoleBody = {
        message: err.message,
        stack: err.stack,
    };
    const responseBody = {
        message: err.message,
    };
    console.log("Error : ", consoleBody);
    return res.json(responseBody);
}
  
module.exports = errorHandler;