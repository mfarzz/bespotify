import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const generateToken = (userId: string) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
