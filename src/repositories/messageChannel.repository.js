import MessageChannel from "../models/MessageChannel.model.js";

class MessagesChannelRepository {
    static async create(chanel_id, sender_member_id, content) {
        try {
            await MessageChannel.insertOne({
                chanel_id: chanel_id,
                sender_member_id: sender_member_id,
                content: content,
            });
        } catch (error) {
            console.error("[SERVER ERROR]: Could not create message", error);
            throw error;
        }
    }
    static async getAll() {
        try {
            const messages = await MessageChannel.find();
            return messages;
        } catch (error) {
            console.error("[SERVER ERROR]: Could not get messages", error);
            throw error;
        }
    }
    static async getById(message_id) {
        try {
            const message_found = await MessageChannel.findById(message_id);
            return message_found;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not get message with id " + message_id,
                error
            );
            throw error;
        }
    }
    static async deleteById(message_id) {
        try {
            const response = await MessageChannel.findByIdAndDelete(message_id);
            return response;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not delete message with id " +
                    message_id,
                error
            );
            throw error;
        }
    }

    static async updateById(message_id, update_message) {
        try {
            const message_update = await MessageChannel.findByIdAndUpdate(
                message_id,
                update_message
            );
            return message_update;
        } catch (error) {
            console.error(
                "[SERVER ERROR]: Could not update message with id ",
                error
            );
            throw error;
        }
    }
}
export default MessagesChannelRepository;
