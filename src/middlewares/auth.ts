import { readFileSync } from 'fs';
const jwt = require('jsonwebtoken');
import path from 'path';

const certPath = path.join( __dirname, '../../certs/public.key');
const publicKey = process.env.PUBLIC_KEY;
console.log({publicKey});
const cert = readFileSync(certPath, 'utf-8');
console.log({cert});


export function auth(req, res, next) {
    const token = req.headers['authorization'];
    const cert = process.env.PUBLIC_KEY;
    jwt.verify(token, cert, function(err, decoded) {
        console.log({err})
        if (!decoded) return res.status(401).send("The token is not valid");
        next();
    });
}