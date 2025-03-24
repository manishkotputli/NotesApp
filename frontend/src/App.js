/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import UploadNote from "./pages/UploadNote";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}
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
				/>
			</Routes>
		</Router>
	);
}

export default App;
