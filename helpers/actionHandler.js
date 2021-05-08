const actionHandler = (callback) => {
    try {
        return callback();
    } catch (error) {
        return handleError(error);
    }
}

module.exports = actionHandler;