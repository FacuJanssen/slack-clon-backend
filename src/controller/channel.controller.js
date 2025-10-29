import ChannelService from "../services/channel.service.js";

class ChannelController {
    static async create(req, res) {
        try {
            const { workspace_selected, user, member } = req;
            const { name } = req.body;
            const channel_created = await ChannelService.create(
                workspace_selected._id,
                name
            );
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Channel created",
                data: {
                    channel_created,
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
}

export default ChannelController;
