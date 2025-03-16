import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Path to the JSON file (relative to the function)
const DB_PATH = join(process.cwd(), 'data/users.json');

// Get all users
export const getUsers = () => {
  try {
    return JSON.parse(readFileSync(DB_PATH, 'utf8'));
  } catch (error) {
    // If the file doesn't exist or is invalid, return an empty array
    return [];
  }
};

// Save users to the JSON file
export const saveUsers = (users) => {
  try {
    writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
}; 