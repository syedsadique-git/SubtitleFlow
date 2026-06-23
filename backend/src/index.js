const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User routes
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Translation routes
const translationRouter = require('./routes/translation');
app.use('/api/translate', translationRouter);

// Preferences routes
const preferencesRouter = require('./routes/preferences');
app.use('/api/preferences', preferencesRouter);

app.listen(PORT, () => {
  console.log(`SubtitleFlow API running on port ${PORT}`);
});
