const jwt = require('jsonwebtoken');
//secret for JWT token
const JWT_SECRET = '$it$is$a$secret$key';

exports.isAdmin = (req, res, next) => {
  //get the user from jwt token and get the id to req object
  const token = req.header('auth-token');
  if (token) {
    const data = jwt.verify(token, JWT_SECRET);
    if (data.user.role === 'admin') {
      req.user = data.user;
      next();
    } else {
      res.status(401).send({ error: 'you are not allowed' });
    }
  } else {
    res.status(401).send({ error: 'Please authentcate using a valid token' });
  }
};

exports.isUser = (req, res, next) => {
  //get the user from jwt token and get the id to req object
  const token = req.header('auth-token');
  if (token) {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } else {
    res.status(401).send({ error: 'Please authentcate using a valid token' });
  }
};
