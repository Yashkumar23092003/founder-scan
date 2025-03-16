import { verifyToken } from '../utils/auth.js';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const user = await verifyToken(req);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
} 