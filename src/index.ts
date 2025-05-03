import app from './app';
import dotenv from 'dotenv';
import { PORT } from './config/env';

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
