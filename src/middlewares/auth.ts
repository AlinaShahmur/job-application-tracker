const jwt = require('jsonwebtoken');


export function auth(req, res, next) {
    const token = req.headers['authorization'];
    const cert = process.env.PUBLIC_KEY;
    jwt.verify(token, cert, function(err, decoded) {
        console.log({err})
        if (!decoded) return res.status(401).send("The token is not valid");
        next();
    });
}