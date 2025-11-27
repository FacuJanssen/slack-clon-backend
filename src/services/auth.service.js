import express from "express";
import ENVIRONMENT from "../config/environment.config.js";
import mailTransporter from "../config/mailTransporter.config.js";
import { ServerError } from "../error.js";
import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    static async register(email, password, name) {
        const user = await UserRepository.getByEmail(email);
        if (user) {
            throw new ServerError(400, "Email already in use");
        }
        const password_hashed = await bcrypt.hash(password, 12);
        const user_created = await UserRepository.create(
            name,
            email,
            password_hashed
        );
        const user_id_created = user_created._id;
        const token = jwt.sign(
            { user_id: user_id_created },
            ENVIRONMENT.JWT_SECRET_KEY
        );
        const verification_url = `${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email/${token}`;
        try {
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
        } catch (error) {
            throw new ServerError(500, "Could not send email");
        }
        return;
    }

    static async verifyEmail(token) {
        try {
            const payload = jwt.verify(token, ENVIRONMENT.JWT_SECRET_KEY);
            const { user_id } = payload;
            if (!user_id) {
                throw new ServerError(400, "Action denied, invalid token");
            }
            const user_found = await UserRepository.getById(user_id);
            if (!user_found) {
                throw new ServerError(404, "User not found");
            }
            if (user_found.verified_email) {
                throw new ServerError(400, "Email already verified");
            }
            await UserRepository.updateById(user_id, { verified_email: true });
            return;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new ServerError(400, "Invalid token");
            }
            throw error;
        }
    }

    static async login(email, password) {
        const user_found = await UserRepository.getByEmail(email);
        if (!user_found) {
            throw new ServerError(404, "User not found");
        }
        if (!user_found.verified_email) {
            throw new ServerError(401, "Email not verified");
        }
        const is_password_correct = await bcrypt.compare(
            password,
            user_found.password
        );
        if (!is_password_correct) {
            throw new ServerError(400, "Invalid password");
        }
        const token = jwt.sign(
            {
                name: user_found.name,
                email: user_found.email,
                user_id: user_found._id,
            },
            ENVIRONMENT.JWT_SECRET_KEY
        );
        return { token: token };
    }
}

export default AuthService;
