# MERN Base Template

A minimal MERN (MongoDB, Express, React, Node.js) stack template to get started quickly.

## Tech Stack

- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

## Project Structure

```
base/
├── client/          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/          # Express backend
    ├── server.js
    ├── config/
    ├── models/
    ├── routes/
    └── package.json
```

## Getting Started

### 1. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/mern_base
```

Start the server:

```bash
npm start        # production
npm run dev      # development (auto-reload)
```

Server runs at `http://localhost:8000`

### 2. Setup Frontend

```bash
cd client
npm install
npm run dev
```

Client runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Available Scripts

### Server
- `npm start` - Start production server
- `npm run dev` - Start with auto-reload (Node.js watch mode)

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Extending the Template

### Add a Model

Create `server/models/User.js`:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

### Add a Route

Create `server/routes/userRoutes.js`:

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;
```

Register in `server.js`:

```javascript
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/mern_base |
| `NODE_ENV` | Environment mode | development |

## License

ISC
