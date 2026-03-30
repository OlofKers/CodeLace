const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header("Authorization")

        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied"})
        }

        const actualtoken = token.startsWith("Bearer ")
            ? token.slice(7)
            : token
        
        const decoded = jwt.verify(actualtoken, process.env.JWT_SECRET)

        req.user = decoded
        
        next()
    } catch(err) {
        res.status(401).json({ error: "InvalidTokenException"})
    }
}

module.exports = authMiddleware