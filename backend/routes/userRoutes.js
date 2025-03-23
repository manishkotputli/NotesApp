/** @format */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		// Check if all fields are provided
		if (!name || !email || !password || !role) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Validate role (should be either "admin" or "student")
		if (role !== "admin" && role !== "student") {
			return res.status(400).json({ message: "Invalid role" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ name, email, password: hashedPassword, role });

		await user.save();
		res.json({ message: "✅ User registered successfully", user });
	} catch (error) {
		console.error("Error in Register API:", error); // ✅ Logs error in console
		res
			.status(500)
			.json({ message: "❌ Internal Server Error", error: error.message });
	}
});

// Login User
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if email and password are provided
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Check if JWT_SECRET is set
		if (!process.env.JWT_SECRET) {
			console.error("JWT_SECRET is missing in .env file!");
			return res
				.status(500)
				.json({ message: "Server error: Missing JWT_SECRET" });
		}

		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({
			message: "✅ Login successful",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role, // Include role in response
			},
		});
	} catch (error) {
		console.error("Error in Login API:", error);
		res
			.status(500)
			.json({ message: "❌ Internal Server Error", error: error.message });
	}
});

module.exports = router;
