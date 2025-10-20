import WorkspaceRepository from "../repositories/workspace.repository.js";

class WorkspaceController {
    static async getAll(req, res) {
        const workspaces = await WorkspaceRepository.getAll();
        res.send({ workspaces: workspaces });
    }
}

export default WorkspaceController;
