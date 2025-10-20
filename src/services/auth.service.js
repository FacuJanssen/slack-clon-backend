import express from "express";
import ENVIRONMENT from "../config/environment.config.js";
import mailTransporter from "../config/mailTransporter.config.js";
import { ServerError } from "../error.js";
import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    static async register(email, password, name) {
        console.log(
            "🔵 [AuthService.register] INICIANDO registro para:",
            email
        );

        const user = await UserRepository.getByEmail(email);
        console.log(
            "🔵 [AuthService.register] Usuario encontrado en BD:",
            user ? "Sí" : "No"
        );

        if (user) {
            console.log("🔴 [AuthService.register] Error: Email ya en uso");
            throw new ServerError(400, "Email already in use");
        }

        console.log("🔵 [AuthService.register] Hasheando password...");
        const password_hashed = await bcrypt.hash(password, 12);
        console.log("🔵 [AuthService.register] Password hasheado");

        console.log("🔵 [AuthService.register] Creando usuario en BD...");
        const user_created = await UserRepository.create(
            name,
            email,
            password_hashed
        );
        const user_id_created = user_created._id;
        console.log(
            "🔵 [AuthService.register] Usuario creado con ID:",
            user_id_created
        );

        console.log("🔵 [AuthService.register] Generando token JWT...");
        const token = jwt.sign(
            { user_id: user_id_created },
            ENVIRONMENT.JWT_SECRET_KEY
        );
        console.log("🔵 [AuthService.register] Token JWT generado");

        const verification_url = `${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email/${token}`;
        console.log(
            "🔵 [AuthService.register] URL de verificación:",
            verification_url
        );

        console.log("🔵 [AuthService.register] Configurando envío de email...");
        console.log("🔵 [AuthService.register] From:", ENVIRONMENT.GMAIL_USER);
        console.log("🔵 [AuthService.register] To:", email);

        try {
            console.log("🟡 [AuthService.register] Intentando enviar email...");
            await mailTransporter.sendMail({
                from: ENVIRONMENT.GMAIL_USER,
                to: email,
                subject: "Verify account",
                html: `
                    <h1>Verify your account</h1>
                    <p>Click the link below to verify your email address:</p>
                    <a href="${verification_url}">Verify here</a>
                    <p>Or copy and paste the following link in your browser:</p>
                    <p>${verification_url}</p>
                `,
            });
            console.log("🟢 [AuthService.register] Email enviado exitosamente");
        } catch (error) {
            console.log(
                "🔴 [AuthService.register] ERROR enviando email:",
                error
            );
            console.log("🔴 [AuthService.register] Detalles del error:", {
                message: error.message,
                stack: error.stack,
                code: error.code,
            });
            throw new ServerError(500, "Could not send email");
        }

        console.log(
            "🟢 [AuthService.register] Registro completado exitosamente"
        );
        return;
    }

    static async verifyEmail(token) {
        console.log(
            "🔵 [AuthService.verifyEmail] Verificando email con token:",
            token
        );
        try {
            const payload = jwt.verify(token, ENVIRONMENT.JWT_SECRET_KEY);
            console.log(
                "🔵 [AuthService.verifyEmail] Token verificado, payload:",
                payload
            );

            const { user_id } = payload;
            if (!user_id) {
                console.log(
                    "🔴 [AuthService.verifyEmail] Token no tiene user_id"
                );
                throw new ServerError(400, "Action denied, invalid token");
            }

            console.log(
                "🔵 [AuthService.verifyEmail] Buscando usuario con ID:",
                user_id
            );
            const user_found = await UserRepository.getById(user_id);
            if (!user_found) {
                console.log(
                    "🔴 [AuthService.verifyEmail] Usuario no encontrado"
                );
                throw new ServerError(404, "User not found");
            }

            console.log(
                "🔵 [AuthService.verifyEmail] Usuario encontrado, email verificado?:",
                user_found.verified_email
            );
            if (user_found.verified_email) {
                console.log(
                    "🔴 [AuthService.verifyEmail] Email ya estaba verificado"
                );
                throw new ServerError(400, "Email already verified");
            }

            console.log(
                "🔵 [AuthService.verifyEmail] Actualizando usuario a verificado..."
            );
            await UserRepository.updateById(user_id, { verified_email: true });
            console.log(
                "🟢 [AuthService.verifyEmail] Email verificado exitosamente"
            );

            return;
        } catch (error) {
            console.log("🔴 [AuthService.verifyEmail] ERROR:", error.message);
            if (error instanceof jwt.TokenExpiredError) {
                console.log("🔴 [AuthService.verifyEmail] Token expirado");
                throw new ServerError(400, "Invalid token");
            }
            throw error;
        }
    }

    static async login(email, password) {
        console.log("🔵 [AuthService.login] Intentando login para:", email);

        const user_found = await UserRepository.getByEmail(email);
        console.log(
            "🔵 [AuthService.login] Usuario encontrado:",
            user_found ? "Sí" : "No"
        );

        if (!user_found) {
            console.log("🔴 [AuthService.login] Usuario no encontrado");
            throw new ServerError(404, "User not found");
        }

        console.log(
            "🔵 [AuthService.login] Email verificado?:",
            user_found.verified_email
        );
        if (!user_found.verified_email) {
            console.log("🔴 [AuthService.login] Email no verificado");
            throw new ServerError(401, "Email not verified");
        }

        console.log("🔵 [AuthService.login] Comparando password...");
        const is_password_correct = await bcrypt.compare(
            password,
            user_found.password
        );
        console.log(
            "🔵 [AuthService.login] Password correcto?:",
            is_password_correct
        );

        if (!is_password_correct) {
            console.log("🔴 [AuthService.login] Password incorrecto");
            throw new ServerError(400, "Invalid password");
        }

        console.log("🔵 [AuthService.login] Generando token de login...");
        const token = jwt.sign(
            {
                name: user_found.name,
                email: user_found.email,
                user_id: user_found._id,
            },
            ENVIRONMENT.JWT_SECRET_KEY
        );
        console.log("🟢 [AuthService.login] Login exitoso, token generado");

        return { token: token };
    }
}

export default AuthService;
