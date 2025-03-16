import jwt from 'jsonwebtoken';
import { getUsers } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'founder_evaluation_secret_key';

export const verifyToken = async (req) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const users = await getUsers();
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company
    };
  } catch (err) {
    return null;
  }
}; 