/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/users/login",
				{ email, password }
			);
			localStorage.setItem("token", data.token);
			alert("Login Successful!");
			navigate("/notes");
		} catch (error) {
			alert("Invalid credentials!");
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
					🔐 Login
				</h2>
				<form onSubmit={handleLogin}>
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
					<button
						type="submit"
						className="btn w-100"
						style={{
							background: "linear-gradient(135deg, #6a11cb, #2575fc)",
							color: "#fff",
						}}
					>
						Login
					</button>
				</form>
				<p className="mt-3 text-center text-white">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="fw-bold"
						style={{ color: "#6a11cb" }}
					>
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
