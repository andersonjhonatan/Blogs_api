const { verifyToken } = require('../auth/authFunction');

const authenticateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const data = verifyToken(authorization);
    req.payload = data;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authenticateToken;
