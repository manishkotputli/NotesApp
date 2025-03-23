/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import UploadNote from "./pages/UploadNote";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				{/* Default Home Route */}
				<Route
					path="/"
					element={
						<h1>
							{/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
							<marquee>Welcome to Notes App </marquee>
						</h1>
					}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/notes"
					element={<Notes />}
				/>
				<Route
					path="/upload-note"
					element={<UploadNote />}
				/>{" "}
				{/* ✅ Fixed Route */}
			</Routes>
		</Router>
	);
}

export default App;
