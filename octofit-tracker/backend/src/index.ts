import app from './app';
import { connectDatabase } from './config/database';

const port = 8000;

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});

connectDatabase().catch((error: unknown) => {
  console.error('Unable to connect to octofit_db:', error);
});