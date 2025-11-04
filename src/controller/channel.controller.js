import ChannelService from "../services/channel.service.js";

class ChannelController {
    static async create(req, res) {
        try {
            const { workspace_selected } = req;
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: "Name is required",
                });
            }
            const channel_list = await ChannelService.create(
                workspace_selected.id,
                name
            );
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Channel created",
                data: {
                    channels: channel_list,
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
                    "[SERVER ERROR]: Error at creating channel",
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
    static async getAllByWorkspaceId(req, res) {
        try {
            const { workspace_selected } = req;
            const channels = await ChannelService.getAllByWorkspaceId(
                workspace_selected.id
            );
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Channels found",
                data: {
                    channels: channels,
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
                    "[SERVER ERROR]: Error at getting channels",
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
            const { channel_selected } = req;
            const { name } = req.body;
            const channel_updated = await ChannelService.update(
                channel_selected.id,
                name
            );
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Channel updated",
                data: {
                    channel_updated,
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
                    "[SERVER ERROR]: Error at updating channel",
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
            const { channel_selected } = req;
            const channel_deleted = await ChannelService.delete(
                channel_selected.id
            );
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Channel deleted",
                data: {
                    channel_deleted,
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
                    "[SERVER ERROR]: Error at deleting channel",
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

export default ChannelController;
