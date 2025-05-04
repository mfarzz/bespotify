import { Request, Response } from 'express';
import querystring from 'querystring';
import { getSpotifyAuthURL, handleSpotifyCallback } from '../services/auth.service';

export const spotifyLogin = (_req: Request, res: Response) => {
    const url = getSpotifyAuthURL();
    res.redirect(url);
};

export const spotifyCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    
    if (!code) {
        // Redirect with error if no code
        const errorUri = `spotifyapp://callback?error=no_authorization_code`;
        return res.redirect(errorUri);
    }
    
    try {
        const { token, user } = await handleSpotifyCallback(code);
        console.log('Generated token:', token);
        console.log('User ID:', user.id);
        
        // Redirect to Flutter app with all data
        // Make sure to use the format that matches our app's expectations
        // Use "spotifyapp://callback" without trailing slash
        const redirectParams = querystring.stringify({
            token,
            userId: user.id,
            name: user.name,
            email: user.email
        });
        
        const redirectUri = `spotifyapp://callback?${redirectParams}`;
        console.log('Redirecting to:', redirectUri);
        res.redirect(redirectUri);
    } catch (err) {
        console.error('Spotify callback error:', err);
        // Redirect with error message
        const errorUri = `spotifyapp://callback?error=spotify_login_failed`;
        res.redirect(errorUri);
    }
};