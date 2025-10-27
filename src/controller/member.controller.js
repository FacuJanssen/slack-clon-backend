import jwt from "jsonwebtoken";
import MemberWorkspaceRepository from "../repositories/memberWokspace.repository.js";
import ENVIRONMENT from "../config/environment.config.js";
class MemberController {
    static async confirmInvitation(req, res) {
        try {
            const { invitation_token } = req.params;
            await MemberWorkspaceRepository.confirmInvitation(invitation_token);
            res.redirect(`${ENVIRONMENT.URL_FRONTEND}/login`);
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({
                    ok: false,
                    message: "Invalid token",
                    status: 400,
                });
            }
            if (error.status) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else
                console.error(
                    "[SERVER ERROR]: Error at confirming invitation",
                    error
                );
            return res.status(500).json({
                ok: false,
                message: "Internal server error",
                status: 500,
            });
        }
    }
}

export default MemberController;
