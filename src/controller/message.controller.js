import MessageService from "../services/message.service.js";

class MessageController {
    static async create(req, res) {
        try {
            const { channel_selected, member } = req;
            const { content } = req.body;
            const { message_created, messages } = await MessageService.create(
                channel_selected._id,
                member._id,
                content
            );
            return res.status(201).json({
                ok: true,
                status: 201,
                message: "Message created",
                data: {
                    message_created,
                    messages: messages,
                },
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at creating message",
                    error
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    }
    static async getAllByChannelId(req, res) {
        try {
            const { channel_selected } = req;
            const messages_list = await MessageService.getAllByChannelId(
                channel_selected._id
            );
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Messages found",
                data: {
                    messages: messages_list,
                },
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at getting messages",
                    error
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    }
    static async update(req, res) {
        try {
            const { message_selected } = req;
            const { content } = req.body;
            const message_updated = await MessageService.update(
                message_selected,
                content
            );
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Message updated",
                data: {
                    message_updated,
                },
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at updating message",
                    error
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    }
    static async delete(req, res) {
        try {
            const { message_selected } = req;
            const message_deleted = await MessageService.delete(
                message_selected
            );
            return res.status(200).json({
                ok: true,
                status: 200,
                message: "Message deleted",
                data: {
                    message_deleted,
                },
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at deleting message",
                    error
                );
                return res.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    }
}

export default MessageController;
