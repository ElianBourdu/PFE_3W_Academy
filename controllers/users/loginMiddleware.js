import parseurl from 'parseurl';
import { verifyToken } from "../../config/token.js";

const ADMIN_ROLE_ID = 1;

const paths = {
    ADMIN: ['TESTME'],
    USER: ['userPath'],
    PUBLIC: []
};

const getPathType = (pathname) => {
    for (const [key, value] of Object.entries(paths)) {
        if (value.includes(pathname)) {
            return key;
        }
    }
    return 'PUBLIC';
};

const isAccessAuthorized = (pathType, userData) => {
    if (pathType === 'ADMIN' && userData.admin) return true;
    if (pathType === 'USER' && userData.user) return true;
    if (pathType === 'PUBLIC') return true;
    return false;
};

const middleware = async(req, res, next) => {
    console.log(`req.body : ${JSON.stringify(req.body)}`);
    const pathname = parseurl(req).pathname.split('/')[1];
    const authHeader = req.headers['authorization'];
    console.log(`authHeader : ${authHeader}`);
    const pathType = getPathType(pathname);
    console.log(`pathType : ${pathType}`);

    if (pathType !== "PUBLIC") {
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer') {
            return res.status(401).json({ message: 'Invalid authorization scheme' });
        }

        const userData = await verifyToken(token);

        if (!userData) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        if (!isAccessAuthorized(pathType, userData)) {
            return res.status(401).json({ message: 'Access denied' });
        }
    }

    next();
};

export default middleware;