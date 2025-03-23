/** @format */

const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");
const { authMiddleware } = require("../middleware/authMiddleware"); // ✅ Ensure Correct Import
const router = express.Router();

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Save files in "uploads" folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname); // Rename file
	},
});
const upload = multer({ storage });

// ✅ Middleware to Check Admin Access
const checkAdmin = (req, res, next) => {
	try {
		// ✅ Ensure User Object Exists
		if (!req.user || req.user.role !== "admin") {
			return res.status(403).json({
				message: "❌ Access denied. Only admins can perform this action.",
			});
		}
		next();
	} catch (error) {
		console.error("❌ Admin Check Error:", error);
		res.status(500).json({ message: "❌ Internal server error", error });
	}
};

// ✅ Upload Note (Only Admins)
router.post(
	"/upload",
	authMiddleware,
	checkAdmin,
	upload.single("file"),
	async (req, res) => {
		try {
			const { title } = req.body;
			const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

			// ✅ Validate request body
			if (!title || !fileUrl) {
				return res
					.status(400)
					.json({ message: "❌ Title and file are required" });
			}

			const note = new Note({ title, fileUrl, uploadedBy: req.user.id });
			await note.save();

			res.json({ message: "✅ Note uploaded successfully", note });
		} catch (error) {
			console.error("❌ Error in Upload API:", error);
			res.status(500).json({ message: "❌ Error uploading note", error });
		}
	}
);

// ✅ Get All Notes (Admins & Students)
router.get("/", authMiddleware, async (req, res) => {
	try {
		const notes = await Note.find().populate("uploadedBy", "name email");
		res.json(notes);
	} catch (error) {
		console.error("❌ Error in Get Notes API:", error);
		res.status(500).json({ message: "❌ Error fetching notes", error });
	}
});

// ✅ Delete Note (Only Admins)
router.delete("/:id", authMiddleware, checkAdmin, async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).json({ message: "❌ Note not found" });
		}

		await note.deleteOne(); // ✅ More Secure Delete
		res.json({ message: "✅ Note deleted successfully" });
	} catch (error) {
		console.error("❌ Error in Delete API:", error);
		res.status(500).json({ message: "❌ Error deleting note", error });
	}
});

module.exports = router;
