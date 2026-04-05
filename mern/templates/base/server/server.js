require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = requite('mongoose');

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors);           // Allow cross-origin requests
app.use(express.json()); // Parses incoming JSON data

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
