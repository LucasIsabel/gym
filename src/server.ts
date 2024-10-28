import { app } from '@/app';
import { env } from '@/env';

app
  .listen({
    host: '0.0.0.0',
    port: env.data.PORT,
  })
  .then(() => {
    console.log(`🚀 Server is running at http://localhost:${env.data.PORT}`);
  });
