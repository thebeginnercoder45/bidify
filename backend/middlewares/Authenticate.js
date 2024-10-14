import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false
      });
    }

    console.error("Authentication error:", error);
    return res.status(500).json({
      message: "An error occurred during authentication",
      success: false
    });
  }
};