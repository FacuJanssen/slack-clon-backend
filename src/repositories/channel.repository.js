import Channel from "../models/Channel.model.js";

class ChannelRepository {
    static async create(workspace_id, name) {
        try {
            await Channel.insertOne({
                id_workspace: workspace_id,
                name: name,
            });
            console.log("[SERVER] Channel created");
        } catch (error) {
            console.error("[SERVER ERROR] Channel not created, ", error);
            throw error;
        }
    }
    static async getAllByWorkspaceId(wokspace_id) {
        try {
            const found_channels = await Channel.find({
                id_workspace: wokspace_id,
            });
            return found_channels;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async getById(channel_id) {
        try {
            const found_channel = await Channel.findById(channel_id);
            return found_channel;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteById(channel_id) {
        try {
            const response = await Channel.findByIdAndDelete(channel_id);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async updateById(channel_id, update_channel) {
        try {
            const response = await Channel.findByIdAndUpdate(
                channel_id,
                update_channel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async getByIdAndWorkspaceId(workspace_id, channel_id) {
        try {
            const found_channel = await Channel.findOne({
                id_workspace: workspace_id,
                _id: channel_id,
            });
            return found_channel;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export default ChannelRepository;
