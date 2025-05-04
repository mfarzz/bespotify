import app from './app';
import { PORT } from './config/env';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server accessible at:
    - Local: http://127.0.0.1:${PORT}
    - Emulator: http://10.0.2.2:${PORT}
    - Network: http://<your-local-ip>:${PORT}`);
});