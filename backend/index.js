import connectToDb from './db/db.js';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import auctionRoute from './routes/auctionItems.routes.js'
import bidRoutes from './routes/bid.routes.js'

dotenv.config()
connectToDb()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions))

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auction', auctionRoute)
app.use('/api/v1/bid', bidRoutes)

app.get('/', (req, res) => {
    res.json({
        message: "Backen working fine"
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));