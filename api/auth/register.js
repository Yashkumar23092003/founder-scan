import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers, saveUsers } from '../utils/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'founder_evaluation_secret_key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, password, company } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    // Get existing users
    const users = await getUsers();

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      company: company || '',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Add to users array
    users.push(newUser);
    await saveUsers(users);

    // Create token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
} 