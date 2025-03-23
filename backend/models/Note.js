/** @format */

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		fileUrl: { type: String, required: true },
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
