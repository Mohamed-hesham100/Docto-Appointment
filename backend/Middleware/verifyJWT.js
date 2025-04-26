import jwt from "jsonwebtoken"; // لو انت بتستخدم JWT


export const isAuthenticated = (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // تأكد من ضبط JWT_SECRET في env

    // Attach user to request
    req.user = decoded.id;
    req.role = decoded.role;

    // Continue to next middleware
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

