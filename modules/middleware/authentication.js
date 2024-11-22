import jwt from 'jsonwebtoken'


const protectedRoute = (req, res, next) => {

    const sceret_key = process.env.TokenScretKey ;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
  
    try {
      const decoded = jwt.verify(token,sceret_key);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

export default protectedRoute