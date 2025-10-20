import ENVIRONMENT from "../config/environment.config.js";
import { ServerError } from "../error.js";
import AuthService from "../services/auth.service.js";

class AuthController {
    static async register(req, res) {
        console.log("🔵 [AuthController.register] INICIANDO registro");
        console.log("🔵 [AuthController.register] Body recibido:", req.body);

        try {
            const { email, name, password } = req.body;
            const email_regex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            console.log("🔵 [AuthController.register] Validando email...");
            if (!email || !email_regex.test(email)) {
                console.log(
                    "🔴 [AuthController.register] Email inválido:",
                    email
                );
                throw new ServerError(400, "Invalid email format");
            }

            console.log("🔵 [AuthController.register] Validando nombre...");
            if (!name || typeof name !== "string" || name.length < 4) {
                console.log(
                    "🔴 [AuthController.register] Nombre inválido:",
                    name
                );
                throw new ServerError(
                    400,
                    "Invalid name, must be longer than 4 characters"
                );
            }

            console.log("🔵 [AuthController.register] Validando password...");
            if (
                !password ||
                typeof password !== "string" ||
                password.length < 6
            ) {
                console.log(
                    "🔴 [AuthController.register] Password inválido (longitud):",
                    password ? password.length : "undefined"
                );
                throw new ServerError(
                    400,
                    "Invalid password, must be longer than 6 characters"
                );
            }

            console.log(
                "🔵 [AuthController.register] Todas las validaciones pasadas, llamando a AuthService.register..."
            );
            await AuthService.register(email, password, name);

            console.log(
                "🟢 [AuthController.register] Registro exitoso, enviando respuesta 201"
            );
            return res.status(201).json({
                ok: true,
                message: "User registered successfully",
            });
        } catch (error) {
            console.log("🔴 [AuthController.register] ERROR CAPTURADO:", error);
            console.log("🔴 [AuthController.register] Error details:", {
                message: error.message,
                status: error.status,
                stack: error.stack,
            });

            if (error.status) {
                console.log(
                    "🔵 [AuthController.register] Enviando error con status personalizado:",
                    error.status
                );
                return res.status(error.status).json({
                    error: error.message,
                    ok: false,
                });
            } else {
                console.log(
                    "🔵 [AuthController.register] Enviando error 500 genérico"
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error on auth register",
                });
            }
        }
    }

    static async verifyEmail(req, res) {
        console.log("🔵 [AuthController.verifyEmail] Verificando email");
        console.log(
            "🔵 [AuthController.verifyEmail] Token recibido:",
            req.params.token
        );

        try {
            const { token } = req.params;
            await AuthService.verifyEmail(token);

            console.log(
                "🟢 [AuthController.verifyEmail] Verificación exitosa, redirigiendo..."
            );
            console.log(
                "🔵 [AuthController.verifyEmail] URL_FRONTEND:",
                ENVIRONMENT.URL_FRONTEND
            );

            return res.redirect(
                ENVIRONMENT.URL_FRONTEND + "/login?from=verified_email"
            );
        } catch (error) {
            console.log("🔴 [AuthController.verifyEmail] ERROR:", error);

            if (error.status) {
                console.log(
                    "🔵 [AuthController.verifyEmail] Enviando error HTML con status:",
                    error.status
                );
                return res
                    .status(error.status)
                    .send(`<h1>${error.message}</h1>`);
            } else {
                console.log(
                    "🔵 [AuthController.verifyEmail] Enviando error 500 HTML"
                );
                console.error("Register error", error);
                return res
                    .status(500)
                    .send(`<h1>Internal server error, please try again</h1>`);
            }
        }
    }

    static async login(req, res) {
        console.log("🔵 [AuthController.login] INICIANDO login");
        console.log("🔵 [AuthController.login] Body recibido:", req.body);

        try {
            const { email, password } = req.body;
            console.log(
                "🔵 [AuthController.login] Llamando a AuthService.login..."
            );

            const { token } = await AuthService.login(email, password);

            console.log(
                "🟢 [AuthController.login] Login exitoso, enviando respuesta"
            );
            return res.status(200).json({
                ok: true,
                message: "User logged in successfully",
                status: 200,
                body: { token },
            });
        } catch (error) {
            console.log("🔴 [AuthController.login] ERROR:", error);

            if (error.status) {
                console.log(
                    "🔵 [AuthController.login] Enviando error con status:",
                    error.status
                );
                return res.status(error.status).json({
                    error: error.message,
                    ok: false,
                });
            } else {
                console.log(
                    "🔵 [AuthController.login] Enviando error 500 genérico"
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error on auth register",
                });
            }
        }
    }
}

export default AuthController;
