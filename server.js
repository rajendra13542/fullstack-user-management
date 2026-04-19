import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import errorHandler from "./middleware/errorMiddleware.js";
import AppError from "./utils/appError.js";

// Load env variables
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


app.use(helmet());

//Middleware
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter)

app.use((req, res, next) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

//Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server start ")
})
