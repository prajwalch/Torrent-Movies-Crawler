function pathAuthorization(request, response, next) {
    if (!(request.query.page || request.query.detailof)) return (
        response.status(403)
        .json([{error: 'Permission denied', message: 'Access id is required'}])
    );
    next()
}

module.exports = pathAuthorization