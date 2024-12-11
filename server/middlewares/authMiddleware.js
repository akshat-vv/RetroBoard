const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log(req,res);
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification error:", err);
    res.status(400).send('Invalid token.');
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).send('Access denied.');
  next();
};

module.exports = { authenticate, authorizeRole };
