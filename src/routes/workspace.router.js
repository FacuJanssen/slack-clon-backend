import express from "express";
import WorkspaceRepository from "../repositories/workspace.repository.js";
import WorkspaceController from "../controller/workspace.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import workspaceMiddleware from "../middlewares/workspaceMiddleware.js";
import ChannelController from "../controller/channel.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.get("/", authMiddleware, WorkspaceController.getAll);

workspaceRouter.post("/", authMiddleware, WorkspaceController.create);

// POST /workspaces/:workspace_id/channels (Solo admins)
/* 
body: {
    name
}
- Crear un nuevo canal
*/

// GET /workspaces/:workspace_id
/* 
- Obtener los detalles de un espacio de trabajo
- Cargar la lista de canales de un espacio de trabajo
*/

workspaceRouter.post(
    "/workspaces/:workspace_id/channels",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    ChannelController.create
);

workspaceRouter.get(
    "/workspaces/:workspace_id",
    authMiddleware,
    workspaceMiddleware,
    WorkspaceController.getById
);

workspaceRouter.get(
    "/:workspace_id",
    authMiddleware,
    workspaceMiddleware(),
    (req, res) => {
        console.log(req.workspace_selected);
        console.log(req.member);
        res.json({
            ok: true,
            status: 200,
            message: "test",
        });
    }
);

workspaceRouter.post(
    "/:workspace_id/invite",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    WorkspaceController.invite
);
export default workspaceRouter;
