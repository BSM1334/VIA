import express from "express";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/reports", reportRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
