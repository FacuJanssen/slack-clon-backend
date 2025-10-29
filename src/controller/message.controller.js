import { request } from "express";
import MessagesChannelRepository from "../repositories/messageChannel.repository.js";

class MessageController {
    static async getAllByChannelId(req, res) {
        try {
            const { channel_selected, member } = request;
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
    static async create(req, res) {
        try {
            const { channel_selected, member, user } = req;
            const { content } = request.body;
            const message_created = await MessagesChannelRepository.create(
                channel_selected._id,
                member._id,
                content
            );
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Message created",
                data: {
                    message_created,
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
}

export default MessageController;
