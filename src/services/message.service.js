import MessagesChannelRepository from "../repositories/messageChannel.repository.js";

class MessageService {
    static async create(channel_id, member_id, content) {
        const message_created = await MessagesChannelRepository.create(
            channel_id,
            member_id,
            content
        );
        const messages_list = await MessagesChannelRepository.getAllByChannelId(
            channel_id
        );
        return { message_created, messages: messages_list };
    }
    static async getAllByChannelId(channel_id) {
        const messages_list = await MessagesChannelRepository.getAllByChannelId(
            channel_id
        );
        return { messages: messages_list };
    }
    static async update(message_id, update_message) {
        const message_updated = await MessagesChannelRepository.updateById(
            message_id,
            update_message
        );
        return message_updated;
    }
}

export default MessageService;
