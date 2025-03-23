/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Correct JWT Decode Import

const UploadNote = () => {
	const [title, setTitle] = useState("");
	const [file, setFile] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");

		// ✅ Check if Token Exists
		if (!token) {
			console.warn("⚠️ No token found. User not logged in.");
			setError("⚠️ You must log in to upload notes.");
			return;
		}

		try {
			const decodedToken = jwtDecode(token);
			console.log("🔹 Decoded Token:", decodedToken);

			// ✅ Check if Token is Expired
			const currentTime = Math.floor(Date.now() / 1000);
			if (!decodedToken.exp || decodedToken.exp < currentTime) {
				alert("⚠️ Session expired! Please login again.");
				localStorage.removeItem("token");
				window.location.href = "/login"; // Redirect to Login
				return;
			}

			// ✅ Set Admin Role
			setIsAdmin(decodedToken.role === "admin");
		} catch (error) {
			console.error("❌ Error decoding token:", error);
			setError("⚠️ Invalid session! Please login again.");
		}
	}, []);

	const handleUpload = async (e) => {
		e.preventDefault();

		if (!title || !file) {
			alert("⚠️ Please provide both title and file.");
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("file", file);

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				alert("⚠️ No authentication token found. Please log in.");
				return;
			}

			const response = await axios.post(
				"http://localhost:5000/api/notes/upload",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("✅ Upload Successful:", response.data);
			alert("✅ Note uploaded successfully!");
			setTitle(""); // ✅ Clear Title Field
			setFile(null); // ✅ Reset File Input
			document.getElementById("fileInput").value = ""; // ✅ Reset File Input
		} catch (error) {
			console.error("❌ Upload error:", error);

			// ✅ Improved Error Handling
			if (error.response) {
				alert(`❌ Error: ${error.response.data.message}`);
			} else {
				alert("❌ Error uploading note. Please try again.");
			}
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow p-4">
						<h2 className="text-center">📤 Upload Note</h2>

						{/* ✅ Show Error Message */}
						{error && <p className="text-danger text-center">{error}</p>}

						{/* ✅ Show Upload Form Only for Admins */}
						{isAdmin ? (
							<form onSubmit={handleUpload}>
								<div className="mb-3">
									<input
										type="text"
										placeholder="Title"
										className="form-control"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<input
										id="fileInput"
										type="file"
										className="form-control"
										onChange={(e) => setFile(e.target.files[0])}
										required
									/>
								</div>
								<button
									type="submit"
									className="btn btn-warning w-100"
								>
									📁 Upload Note
								</button>
							</form>
						) : (
							<p className="text-danger text-center">
								❌ Only Admins Can Upload Notes
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadNote;
