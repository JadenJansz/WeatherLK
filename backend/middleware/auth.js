
const auth = (req, res, next) => {
    try {
        const authToken = req.headers['auth-token'];
    
        if(authToken === process.env.CRON_AUTH_TOKEN) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized Access'
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = auth;