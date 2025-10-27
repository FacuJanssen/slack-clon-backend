import jwt from "jsonwebtoken";
import MemberWorkspaceRepository from "../repositories/memberWokspace.repository.js";
import ENVIRONMENT from "../config/environment.config.js";

class MemberWorkspaceSerrvice {
    static async confirmInvitation(invitation_token) {
        const invitation_token_payload = jwt.verify(
            invitation_token,
            ENVIRONMENT.JWT_SECRET_KEY
        );
        const { id_invited, id_workspace, role_invited } =
            invitation_token_payload;
        const is_member =
            await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(
                id_invited,
                id_workspace
            );
        if (is_member) {
            throw new ServerError("User is already member of workspace");
        }
        await MemberWorkspaceRepository.create(
            id_invited,
            id_workspace,
            role_invited
        );
    }
}

export default MemberWorkspaceSerrvice;
