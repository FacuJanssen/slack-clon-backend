import MemberWorkspace from "../models/MemberWorkspace.model.js";

class MemberWorkspaceRepository {
    static async create(user_id, workspace_id, role) {
        try {
            await MemberWorkspace.insertOne({
                user_id: user_id,
                workspace_id: workspace_id,
                role: role,
            });
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Error at creating member workspace",
                error
            );
            throw error;
        }
    }
    static async getAll() {
        try {
            const member_worksapces = await MemberWorkspace.find();
            return member_worksapces;
        } catch (error) {
            console.error("[SERVER ERROR]: Error at getting member workspaces");
            throw error;
        }
    }
    static async getById(member_id) {
        try {
            const member_found = await MemberWorkspace.findById(member_id);
            return member_found;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not find member workspace with id" +
                    member_id,
                error
            );
            throw error;
        }
    }
    static async deleteById(member_id) {
        try {
            const member_workspeace_delete =
                await MemberWorkspace.findByIdAndDelete(member_id);
            return member_workspeace_delete;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not delete member workspace with id" +
                    member_id,
                error
            );
            throw error;
        }
    }
    static async updateById(member_id, member_update) {
        try {
            const update = await MemberWorkspace.findByIdAndUpdate(
                member_id,
                member_update
            );
            return update;
        } catch (error) {
            {
                console.error(
                    "[SERVER ERROR]: Could not update member workspace with id",
                    error
                );
                throw error;
            }
        }
    }
}

export default MemberWorkspaceRepository;
