import { Router } from 'express';
import { spotifyLogin, spotifyCallback } from '../controllers/auth.controller';

const router = Router();
router.get('/spotify/login', spotifyLogin);
router.get('/spotify/callback', spotifyCallback);

export default router;
