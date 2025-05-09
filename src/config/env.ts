import dotenv from 'dotenv';
dotenv.config();

export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
export const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
