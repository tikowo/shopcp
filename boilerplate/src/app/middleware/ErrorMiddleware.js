const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        return res.status(err.statusCode).json({ error: err });
    }

    res.status(500).json({ error: 'Internal Server Error'});
}

module.exports = errorHandler;