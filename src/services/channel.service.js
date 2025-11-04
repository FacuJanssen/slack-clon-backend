import ChannelRepository from "../repositories/channel.repository.js";

class ChannelService {
    static async getAllByWorkspaceId(workspace_id) {
        return await ChannelRepository.getAllByWorkspaceId(workspace_id);
    }

    static async create(workspace_id, name) {
        await ChannelRepository.create(workspace_id, name);
        return await ChannelRepository.getAllByWorkspaceId(workspace_id);
    }
    static async update(channel_id, channel_update) {
        const channel_updated = await ChannelRepository.updateById(
            channel_id,
            channel_update
        );
        return channel_updated;
    }
    static async delete(channel_id) {
        return await ChannelRepository.deleteById(channel_id);
    }
}

export default ChannelService;
