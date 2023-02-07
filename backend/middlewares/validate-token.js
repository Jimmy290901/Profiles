const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const validateToken = (req, res, next) => {
    const req_username = req.params["username"];
    if (!req_username) {
        next();
    }
    const headerAuthorization = req.header('authorization');
    if (headerAuthorization) {
        const authToken = headerAuthorization.split(' ')[1];
        const jwtClaims = jwt.verify(authToken, JWT_SECRET_KEY);
        if (jwtClaims.username === req_username) {
            next();
        } else {
            res.status(403).send({
                message: 'Unauthorized access'
            });
        }
    } else {
        res.status(401).send({
            message: 'Unauthenticated user'
        });
    }
    
}

module.exports = validateToken;