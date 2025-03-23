/** @format */

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	try {
		// ✅ Extract Token from Header
		const authHeader = req.header("Authorization");

		if (!authHeader) {
			return res.status(401).json({
				message: "❌ Unauthorized - No token provided",
			});
		}

		// ✅ Ensure "Bearer" token format is used
		const tokenParts = authHeader.split(" ");
		if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
			return res.status(401).json({
				message: "❌ Unauthorized - Invalid token format",
			});
		}

		// ✅ Extract Actual Token
		const token = tokenParts[1];

		// ✅ Verify Token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// ✅ Log Decoded Token for Debugging
		console.log("🔹 Decoded Token:", decoded);

		// ✅ Check Token Expiry
		const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
		if (!decoded.exp || decoded.exp < currentTime) {
			return res.status(401).json({
				message: "❌ Token expired. Please log in again.",
			});
		}

		// ✅ Ensure Role is Present
		if (!decoded.role) {
			return res.status(403).json({
				message: "❌ Access Denied - User role missing in token",
			});
		}

		// ✅ Attach User Info to Request
		req.user = {
			id: decoded.id,
			role: decoded.role, // Directly from JWT payload
		};

		next(); // ✅ Move to next middleware
	} catch (error) {
		console.error("❌ Authentication Error:", error);
		return res.status(401).json({
			message: "❌ Invalid token",
			error: error.message,
		});
	}
};

// ✅ Admin Middleware (Separate Function for Admin Check)
const verifyAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({
			message: "❌ Access Denied! Admins only.",
		});
	}
	next();
};

module.exports = { authMiddleware, verifyAdmin };
