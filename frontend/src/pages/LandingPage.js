/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Styling file

const LandingPage = () => {
	return (
		<div className="landing-container">
			{/* Hero Section */}
			<div className="hero">
				<img
					src="/sgi_landing.png"
					alt="SGI"
					className="hero-image"
				/>
				<h1>Welcome to SGI</h1>
				<p>
					Join the best online study group and collaborate with top students.
				</p>
				<Link
					to="/register"
					className="btn"
				>
					Join Now
				</Link>
			</div>

			{/* Features Section */}
			<div className="features">
				<div className="feature-card">
					<h3>📖 Study Material</h3>
					<p>Access high-quality notes and resources for your studies.</p>
				</div>
				<div className="feature-card">
					<h3>🧑‍🏫 Expert Mentors</h3>
					<p>Learn from experienced mentors and improve your skills.</p>
				</div>
				<div className="feature-card">
					<h3>🤝 Group Discussions</h3>
					<p>Engage with peers in group study sessions for better learning.</p>
				</div>
			</div>

			{/* Footer Section */}
			<footer className="footer">
				<p>© 2025 SGI | All Rights Reserved</p>
				<div className="links">
					<Link to="/about">About Us</Link>
					<Link to="/contact">Contact</Link>
					<Link to="/support">Support</Link>
					<Link to="/privacy">Privacy Policy</Link>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
