import ENVIRONMENT from "../config/environment.config.js";
import { ServerError } from "../error.js";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    try {
        const auth_header = req.headers.authorization;
        if (!auth_header) {
            throw new ServerError(401, "Invalid header");
        }
        const auth_token = auth_header.split(" ")[1];
        if (!auth_token) {
            throw new ServerError(401, "Invalid token");
        }
        const user_session_data = jwt.verify(
            auth_token,
            ENVIRONMENT.JWT_SECRET_KEY
        );
        req.user = user_session_data;
        next();
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(400).json({
                ok: false,
                message: "Invalid token",
                status: 400,
            });
        } else if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                ok: false,
                message: "Token expired",
                status: 401,
            });
        } else if (error.status) {
            return res.status(error.status).json({
                ok: false,
                message: error.message,
                status: error.status,
            });
        } else {
            console.error("[SERVER ERROR]: Error at auth middleware", error);
            return res.status(500).json({
                ok: false,
                message: "Internal server error",
                status: 500,
            });
        }
    }
}

export default authMiddleware;
