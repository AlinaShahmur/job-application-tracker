import { readFileSync } from 'fs';
const jwt = require('jsonwebtoken');
import path from 'path';

const certPath = path.join( __dirname, '../../certs/public.key');

export function auth(req, res, next) {
    const cert = readFileSync(certPath);
    const token = req.headers['bearer']
    jwt.verify(token, cert, function(err, decoded) {
        if (!decoded) res.status(401).send("The token is not valid");
        next();
    });
}