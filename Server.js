import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import adminroute from './routes/adminRoute.js'
import cors from 'cors'

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(cors())

app.use(express.json());


app.use('/api/users', authRoutes);
app.use('/api/users', productRoutes); 
app.use('/api/admin',adminroute)

app.use(express.static(__dirname));

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected successfully'))
    .catch(error => console.log(error));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
