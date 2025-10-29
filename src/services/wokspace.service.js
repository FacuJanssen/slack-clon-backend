import ENVIRONMENT from "../config/environment.config.js";
import mailTransporter from "../config/mailTransporter.config.js";
import { ServerError } from "../error.js";
import MemberWorkspaceRepository from "../repositories/memberWokspace.repository.js";
import WorkspaceRepository from "../repositories/workspace.repository.js";
import jwt from "jsonwebtoken";
import UserRespository from "../repositories/user.repository.js";
class WorkspaceService {
    static async getAll(user_id) {
        const members = await MemberWorkspaceRepository.getAllByUserId(user_id);
        return members;
    }
    static async create(user_id, name, url_image) {
        /* console.log(user_id, name, url_image); */
        const workspace_created = await WorkspaceRepository.create(
            name,
            url_image
        );
        await MemberWorkspaceRepository.create(
            user_id,
            workspace_created._id,
            "admin"
        );
        return workspace_created;
    }
    static async invite(
        member,
        workspace_selected,
        email_invited,
        role_invited
    ) {
        const user_invited = await UserRespository.getByEmail(email_invited);
        if (!user_invited) {
            throw new ServerError("User not found");
        }
        const already_member =
            await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(
                user_invited._id,
                workspace_selected._id
            );
        if (!already_member) {
            throw new ServerError("User is already member of workspace");
        }
        const invite_token = jwt.sing(
            {
                id_invited: user_invited._id,
                id_inviter: member._id,
                id_workspace: workspace_selected._id,
                role_invited: role_invited,
            },
            ENVIRONMENT.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );
        await mailTransporter.sendMail({
            from: ENVIRONMENT.GMAIL_USER,
            to: email_invited,
            subject: "Invitation to workspace",
            html: `<h1> Join the workspace: ${workspace_selected.name}</h1>
                <a href="${ENVIRONMENT.URL_BACKEND}/api/member/confirm/${invite_token}">Accept</a>`,
        });
    }
}

export default WorkspaceService;
