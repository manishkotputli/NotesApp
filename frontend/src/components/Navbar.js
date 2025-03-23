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
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNav"
				>
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link
								className="nav-link text-white fw-semibold"
								to="/"
							>
								🏠 Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link text-white fw-semibold"
								to="/contact"
							>
								📞 Contact Us
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link text-white fw-semibold"
								to="/support"
							>
								🛠 Support
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link text-white fw-semibold"
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
