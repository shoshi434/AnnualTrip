const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    });
};
//מידלוואר לבדוק שאכן רק מורה יכול לגשת לנתיב מסוים
const onlyTeachers = (req, res, next) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { authMiddleware, onlyTeachers };