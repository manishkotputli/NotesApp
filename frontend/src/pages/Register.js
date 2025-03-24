/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://notesapp-production-87cb.up.railway.app/api";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [adminCode, setAdminCode] = useState(""); // ✅ New State for Admin Code
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null); // Reset error before submission

		// ✅ If user selects admin, check admin code
		if (isAdmin && adminCode !== "MS01") {
			setError("❌ Invalid Admin Code! You cannot register as an admin.");
			return;
		}

		const userData = {
			name,
			email,
			password,
			role: isAdmin ? "admin" : "student",
			adminCode: isAdmin ? adminCode : undefined, // ✅ Send adminCode only if isAdmin is true
		};

		try {
			await axios.post(`${BASE_URL}/users/register`, userData);
			alert("✅ Registration Successful!");
			navigate("/login");
		} catch (error) {
			setError(error.response?.data?.message || "❌ Error in registration!");
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "100vh", backgroundColor: "#000" }}
		>
			<div
				className="card shadow p-4 text-white"
				style={{
					width: "400px",
					background: "#1c1c1c",
					borderRadius: "10px",
				}}
			>
				<h2
					className="text-center mb-4 py-2"
					style={{
						background: "linear-gradient(135deg, #6a11cb, #2575fc)",
						color: "#fff",
						borderRadius: "8px",
					}}
				>
					📝 Register
				</h2>

				{error && <p className="text-danger text-center">{error}</p>}

				<form onSubmit={handleRegister}>
					<div className="mb-3">
						<label className="form-label text-white">Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter your full name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<label className="form-label text-white">Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<label className="form-label text-white">Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{/* ✅ Checkbox for Admin Registration */}
					<div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>
						<label className="form-check-label text-white">
							Register as Admin
						</label>
					</div>

					{/* ✅ Show Admin Code Input if checkbox is checked */}
					{isAdmin && (
						<div className="mb-3">
							<label className="form-label text-white">Admin Code</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter Admin Code"
								value={adminCode}
								onChange={(e) => setAdminCode(e.target.value)}
								required={isAdmin}
							/>
						</div>
					)}

					<button
						type="submit"
						className="btn w-100"
						style={{
							background: "linear-gradient(135deg, #6a11cb, #2575fc)",
							color: "#fff",
						}}
					>
						🚀 Register
					</button>
				</form>

				<p className="text-center mt-3 text-white">
					Already have an account?{" "}
					<a
						href="/login"
						className="fw-bold"
						style={{ color: "#6a11cb" }}
					>
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
