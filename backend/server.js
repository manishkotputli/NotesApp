/** @format */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Import Path Module
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/noteRoutes");

const app = express();
app.use(express.json()); // ✅ Fix JSON parsing issue

// ✅ CORS Configuration (Allow All)
app.use(cors({ origin: "*", credentials: true }));

// ✅ MongoDB Connection with Error Handling
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("✅ MongoDB Connected"))
	.catch((error) => {
		console.error("❌ MongoDB Connection Error:", error.message);
		process.exit(1);
	});

// ✅ Serve Uploaded Files for Download
const uploadPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadPath));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// ✅ Default Route (Health Check)
app.get("/", (req, res) => {
	res.status(200).json({ message: "✅ API is Running..." });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
	console.error("❌ Server Error:", err.message);
	res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
