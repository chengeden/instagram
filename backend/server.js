const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});