import Workspace from "../models/workspace.model.js";

class WorkspaceRepository {
    static async create(name, url_image) {
        try {
            await Workspace.insertOne({
                name: name,
                url_image: url_image,
            });
        } catch (error) {
            console.error("[SERVER ERROR]: Could not create workspace", error);
            throw error;
        }
    }
    static async getAll() {
        try {
            const workspace = await Workspace.find({ active: true });
            return workspace;
        } catch (error) {
            console.error("[SERVER ERROR]: Could not get all workspace");
            throw error;
        }
    }
    static async getById(workspace_id) {
        try {
            const workspace_found = await Workspace.findById(workspace_id);
            return workspace_found;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not get workspace with id" +
                    workspace_id,
                error
            );
            throw error;
        }
    }
    static async deleteById(workspace_id) {
        try {
            const workspaece_delete = await Workspace.findByIdAndDelete(
                workspace_id
            );
            return workspaece_delete;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not delete workspace with id" +
                    workspace_id,
                error
            );
            throw error;
        }
    }
    static async updateById(worksapce_id, worksapce_update) {
        try {
            const update = await Workspace.findByIdAndUpdate(
                worksapce_id,
                worksapce_update
            );
            return update;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: no se pudo actualizar el workspace",
                error
            );
            throw error;
        }
    }
}

export default WorkspaceRepository;
