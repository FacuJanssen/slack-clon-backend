import MessageChannel from "../models/MessageChannel.model.js";
import MemberWorkspace from "../models/MemberWorkspace.model.js";

class MessagesChannelRepository {
    static async create(channel_id, sender_member_id, content) {
        try {
            const member = await MemberWorkspace.findById(
                sender_member_id
            ).populate("id_user", "email");
            await MessageChannel.insertOne({
                channel_id: channel_id,
                sender_member_id: sender_member_id,
                content: content,
                sender_member_email: member.id_user.email,
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
    static async getAllByChannelId(channel_id) {
        const messages = await MessageChannel.find({
            channel_id: channel_id,
        }).populate({
            path: "sender_member_id",
            populate: {
                path: "id_user",
                model: "User",
                select: "name_id email",
            },
        });
        const messages_formatted = messages.map((message) => {
            return {
                _id: message._id,
                message_content: message.content,
                member_id: message.sender_member_id._id,
                user_email: message.sender_member_id.id_user.email,
                created_at: message.created_at,
                created_at_date: message.created_at.toLocaleDateString("es-AR"),
                created_at_time: message.created_at.toLocaleTimeString(
                    "es-AR",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }
                ),
            };
        });
        return messages_formatted;
    }
}
export default MessagesChannelRepository;
