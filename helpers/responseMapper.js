const mapResponse = (data, success, message) => {
    return {
        ...data,
        success,
        message
    }
}

module.exports = mapResponse;