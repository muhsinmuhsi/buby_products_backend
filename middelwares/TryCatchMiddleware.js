const TryCatchMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.error(error);
            
            // If headers are already sent, pass to error handler
            if (res.headersSent) {
                return next(error);
            }
            
            // Send error response
            res.status(500).json({
                status: 'failure',
                message: 'Internal server error',
                error_message: error.message
            });
        }
    };
};

export default TryCatchMiddleware;
