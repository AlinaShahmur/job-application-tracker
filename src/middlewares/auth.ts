import { readFileSync } from 'fs';
const jwt = require('jsonwebtoken');
import path from 'path';

const certPath = path.join( __dirname, '../../certs/public.key');

export function auth(req, res, next) {
    const cert = readFileSync(certPath, 'utf-8');
    const token = req.headers['authorization'];

    jwt.verify(token, cert, function(err, decoded) {
        console.log({err})
        if (!decoded) return res.status(401).send("The token is not valid");
        next();
    });
}