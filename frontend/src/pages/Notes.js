/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Correct JWT Decode Import

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchNotes = async () => {
			const token = localStorage.getItem("token");

			// ✅ Token Check
			if (!token) {
				alert("⚠️ Please login to view notes.");
				navigate("/login");
				return;
			}

			try {
				// ✅ Decode JWT Token & Check Expiry
				const decodedToken = jwtDecode(token);
				console.log("🔹 Decoded Token:", decodedToken);

				const currentTime = Math.floor(Date.now() / 1000);
				if (!decodedToken.exp || decodedToken.exp < currentTime) {
					alert("⚠️ Session expired! Please login again.");
					localStorage.removeItem("token");
					navigate("/login");
					return;
				}

				// ✅ Check If User is Admin
				setIsAdmin(decodedToken.role === "admin");

				// ✅ Fetch Notes
				const { data } = await axios.get("http://localhost:5000/api/notes", {
					headers: { Authorization: `Bearer ${token}` },
				});

				console.log("📜 Notes API Response:", data);
				setNotes(data);
			} catch (err) {
				console.error("❌ Error fetching notes:", err);

				// ✅ Check for Unauthorized Access (403)
				if (err.response && err.response.status === 403) {
					alert("⚠️ Access denied! You are not authorized.");
					localStorage.removeItem("token");
					navigate("/login");
					return;
				}

				setError(err.response?.data?.message || "❌ Error fetching notes.");
			} finally {
				setLoading(false);
			}
		};

		fetchNotes();
	}, [navigate]);

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">📚 Notes</h2>

			{/* ✅ Show Upload Button for Admins */}
			{isAdmin && (
				<div className="text-center mb-3">
					<button
						onClick={() => navigate("/upload-note")}
						className="btn btn-success"
					>
						📤 Upload Notes
					</button>
				</div>
			)}

			{loading ? (
				<p className="text-center">⏳ Loading Notes...</p>
			) : error ? (
				<p className="text-center text-danger">{error}</p>
			) : notes.length === 0 ? (
				<p className="text-center text-muted">❌ No notes available.</p>
			) : (
				<div className="row">
					{notes.map((note) => (
						<div
							key={note._id}
							className="col-md-6 col-lg-4"
						>
							<div className="card shadow my-2">
								<div className="card-body">
									<h5 className="card-title">{note.title}</h5>
									<a
										href={`http://localhost:5000/${note.fileUrl.replace(
											/^\/+/,
											""
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-primary w-100 mt-2"
									>
										📥 Download
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Notes;
