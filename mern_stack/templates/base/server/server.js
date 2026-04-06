require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
