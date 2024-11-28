import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/dbConnection.js";
import generalQRoutes from "./routes/generalQRoutes.js";
import mockQRoutes from "./routes/mockQRoutes.js";
import instituteAuthRoutes from "./routes/instituteAuthRoutes.js";
import { routeNotFound, errorHandler } from "./middleware/errorMiddleware.js";
import corsOptions from "./config/corsOptions.js";
const port = 8080;

dotenv.config();
connectDB();

const app = express();

//use middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("server is ready"));
app.use("/api/institute/account", instituteAuthRoutes);
app.use("/api/institute/GQ", generalQRoutes);
app.use("/api/institute/MQ", mockQRoutes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
