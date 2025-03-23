/** @format */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Import Path Module
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/noteRoutes"); // ✅ Check File Name

const app = express();
app.use(express.json()); // ✅ Fix JSON parsing issue
app.use(cors());

// ✅ MongoDB Connection with Error Handling
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("✅ MongoDB Connected"))
	.catch((error) => {
		console.error("❌ MongoDB Connection Error:", error);
		process.exit(1);
	});

// ✅ Serve Uploaded Files for Download
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // 🔥 This line serves static files

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes); // ✅ Notes Routes

// ✅ Default Route (Health Check)
app.get("/", (req, res) => {
	res.send("✅ API is Running...");
});

// ✅ Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
