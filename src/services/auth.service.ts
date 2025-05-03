import axios from 'axios';
import querystring from 'querystring';
import prisma from '../prisma/client';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '../config/env';
import { generateToken } from '../utils/jwt';

export const getSpotifyAuthURL = () => {
    const scope = 'user-read-email user-read-private';
    const params = querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri: SPOTIFY_REDIRECT_URI,
    });
    return `https://accounts.spotify.com/authorize?${params}`;
};

export const handleSpotifyCallback = async (code: string) => {
    const tokenRes = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code',
        }),
        {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    const access_token = tokenRes.data.access_token;

    const profileRes = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, display_name } = profileRes.data;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                name: display_name,
                password: '', // karena via OAuth
            },
        });
    }

    const token = generateToken(user.id);
    return { token, user };
};
