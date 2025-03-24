/** @format */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav
			className="navbar navbar-expand-lg shadow"
			style={{
				background: "linear-gradient(135deg, #6a11cb, #2575fc)",
				padding: "10px 20px",
			}}
		>
			<div className="container">
				<Link
					className="navbar-brand fw-bold text-white"
					to="/"
				>
					📚 NotesApp
				</Link>

				{/* ✅ Corrected Navbar Toggler */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* ✅ Navbar Collapse */}
				<div
					className="collapse navbar-collapse"
					id="navbarNav"
				>
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link
								className="nav-link fw-semibold text-white"
								to="/"
							>
								🏠 Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link fw-semibold text-white"
								to="/contact"
							>
								📞 Contact Us
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link fw-semibold text-white"
								to="/support"
							>
								🛠 Support
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link fw-semibold text-white"
								to="/login"
							>
								🔑 Login
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
