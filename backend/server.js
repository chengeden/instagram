const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./db/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});