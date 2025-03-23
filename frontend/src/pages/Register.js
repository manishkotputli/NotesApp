/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		const userData = {
			name,
			email,
			password,
			role: isAdmin ? "admin" : "student", // ✅ Correct field name
		};

		console.log("Sending data to backend:", userData); // Debugging ke liye

		try {
			await axios.post("http://localhost:5000/api/users/register", userData);
			alert("✅ Registration Successful!");
			navigate("/login");
		} catch (error) {
			alert(error.response?.data?.message || "❌ Error in registration!");
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
