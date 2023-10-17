const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});