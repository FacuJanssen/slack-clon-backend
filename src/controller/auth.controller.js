import ENVIRONMENT from "../config/environment.config.js";
import { ServerError } from "../error.js";
import AuthService from "../services/auth.service.js";

class AuthController {
    static async register(req, res) {
        try {
            const { email, name, password } = req.body;
            const email_regex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email || !email_regex.test(email)) {
                throw new ServerError(400, "Invalid email format");
            }
            if (!name || typeof name !== "string" || name.length < 4) {
                throw new ServerError(
                    400,
                    "Invalid name, must be longer than 4 characters"
                );
            }
            if (
                !password ||
                typeof password !== "string" ||
                password.length < 6
            ) {
                throw new ServerError(
                    400,
                    "Invalid password, must be longer than 6 characters"
                );
            }
            await AuthService.register(email, password, name);
            return res.status(201).json({
                ok: true,
                message: "User registered successfully",
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    error: error.message,
                    ok: false,
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error on auth register",
                });
            }
        }
    }

    static async verifyEmail(req, res) {
        try {
            const { token } = req.params;
            await AuthService.verifyEmail(token);
            return res.redirect(
                ENVIRONMENT.URL_FRONTEND + "/login?from=verified_email"
            );
        } catch (error) {
            if (error.status) {
                return res
                    .status(error.status)
                    .send(`<h1>${error.message}</h1>`);
            } else {
                console.error("Register error", error);
                return res
                    .status(500)
                    .send(`<h1>Internal server error, please try again</h1>`);
            }
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { token } = await AuthService.login(email, password);
            return res.status(200).json({
                ok: true,
                message: "User logged in successfully",
                status: 200,
                body: { token },
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    error: error.message,
                    ok: false,
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error on auth register",
                });
            }
        }
    }
}

export default AuthController;
