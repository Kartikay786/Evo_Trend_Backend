import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


const protectedRoute = async (req, res, next) => {

    const sceret_key = process.env.TokenScretKey ;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
  
    try {
      const decoded = jwt.verify(token,sceret_key);
      req.user = await User.findById(decoded._id).select('_id');

      next();
    } catch (error) {
      res.status(500).json({ message: 'Invalid token' });
    }
  };

export default protectedRoute