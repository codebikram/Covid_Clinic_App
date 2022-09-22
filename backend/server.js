const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = process.env.BACKEND_PORT;
const connectToMongo = require('./db');

app.use(cors());
app.use(express.json());

//mongodb connection
connectToMongo();
app.use('/api/auth', require('./routes/user'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/appointment', require('./routes/appointment'));

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
