import { ServerError } from "../error.js";
import MemberWorkspaceRepository from "../repositories/memberWokspace.repository.js";
import WorkspaceRepository from "../repositories/workspace.repository.js";

function workspaceMiddleware(valid_member_roles = []) {
    return async function (req, res, next) {
        try {
            const { workspace_id } = req.params;
            const user = req.user;
            const workspace_selected = await WorkspaceRepository.getById(
                workspace_id
            );
            if (!workspace_selected) {
                throw new ServerError(404, "Workspace not found");
            }
            const member =
                await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(
                    user.user_id,
                    workspace_id
                );
            if (!member) {
                throw new ServerError(401, "Unauthorized");
            }
            if (
                !valid_member_roles.length > 0 &&
                !valid_member_roles.includes(member.role)
            ) {
                throw new ServerError(403, "Forbidden");
            }
            req.member = member;
            req.workspace_selected = workspace_selected;
            next();
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at getting workspace",
                    error
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    };
}

export default workspaceMiddleware;
