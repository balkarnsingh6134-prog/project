import express from 'express';
import dbConnect from './connect/dbConnect.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js"; // 1. Import the new order router

const app = express();

app.use(cors({
    origin: ["https://project-1-m2un.onrender.com", "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(fileUpload());

const port = 5555;
dbConnect(); 

// API Routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter); // 2. Set the order route

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});