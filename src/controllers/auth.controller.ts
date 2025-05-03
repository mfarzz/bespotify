import { Request, Response } from 'express';
import { getSpotifyAuthURL, handleSpotifyCallback } from '../services/auth.service';

export const spotifyLogin = (_req: Request, res: Response) => {
    const url = getSpotifyAuthURL();
    res.redirect(url);
};

export const spotifyCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const { token, user } = await handleSpotifyCallback(code);
        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Spotify login failed' });
    }
};
