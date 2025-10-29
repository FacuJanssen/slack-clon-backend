import { ServerError } from "../error.js";
import ChannelRepository from "../repositories/channel.repository.js";

/* 
Se antepondra en las consultas hacia
/api/workspace/:workspace_id/channel/:channel_id
Responsabilidades:
    - Verificar que exista el channel en DB y pertenezca al workspace
    - Guardar el channel_selected dentro de el objeto request
*/
async function channelMiddleware(request, response, next) {
    try {
        const { workspace_selected, member, user } = request;
        const { workspace_id, channel_id } = request.params;
        const channel_selected = await ChannelRepository.getByIdAndWorkspaceId(
            workspace_id,
            channel_id
        );
        if (!channel_selected) {
            throw new ServerError(404, "Channel not found");
        }
        request.channel_selected = channel_selected;
        next();
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                ok: false,
                message: error.message,
                status: error.status,
            });
        } else {
            console.error("[SERVER ERROR]: Error at getting channel", error);
            return res.status(500).json({
                ok: false,
                message: "Internal server error",
                status: 500,
            });
        }
    }
}

export default channelMiddleware;
