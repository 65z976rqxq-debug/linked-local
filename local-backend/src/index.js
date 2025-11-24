const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// Allow CORS from configured origins (comma-separated) or allow all in dev
const allowed = process.env.FRONTEND_ORIGINS || '';
if (!allowed) {
  app.use(cors());
} else {
  const origins = allowed.split(',').map(s => s.trim()).filter(Boolean);
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    }
  }));
}

app.get('/', (req, res) => {
  res.json({ message: 'Hello from wellness local backend', env: process.env.NODE_ENV || 'development' });
});

app.get('/health', (req, res) => res.send('ok'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
