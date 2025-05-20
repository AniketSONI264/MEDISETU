// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const adminAuth = async (req, res, next) => {
//   try {
   
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'No authentication token, access denied'
//       });
//     }

  
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     if (user.role !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied. Admin privileges required.'
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: 'Token is invalid or expired'
//     });
//   }
// };

// export default adminAuth; 

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Middleware to authenticate admin using either:
 * 1. Authorization Bearer Token in headers
 * 2. JWT stored in cookies
 */
const adminAuth = async (req, res, next) => {
  try {
    let token = null;

    // ✅ Check for Bearer token in Authorization header
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    }

    // ✅ If not in headers, fallback to cookie
    else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // ❌ If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied'
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // ✅ Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // ✅ Set user in request and continue
    req.user = user;
    next();

  } catch (error) {
    console.error('❌ Error in adminAuth middleware:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired'
    });
  }
};

export default adminAuth;
