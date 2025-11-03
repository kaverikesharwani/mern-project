// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  try {
    let token;

    // If using cookie:
    if (req.cookies && req.cookies.token) token = req.cookies.token;

    // Or accept Bearer token in Authorization header:
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // optionally fetch user:
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

module.exports = protect;
