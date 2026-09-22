import app from './app';
import { connectDatabase } from './config/database';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.listen(port, () => {
  console.log(`OctoFit API listening on ${apiBaseUrl}`);
});

connectDatabase().catch((error: unknown) => {
  console.error('Unable to connect to octofit_db:', error);
});

export default app;
