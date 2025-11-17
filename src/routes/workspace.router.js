import express from "express";
import WorkspaceRepository from "../repositories/workspace.repository.js";
import WorkspaceController from "../controller/workspace.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import workspaceMiddleware from "../middlewares/workspaceMiddleware.js";
import ChannelController from "../controller/channel.controller.js";
import channelMiddleware from "../middlewares/channelMiddleware.js";
import MessageController from "../controller/message.controller.js";

const workspaceRouter = express.Router();

// Obtener workspaces
workspaceRouter.get("/", authMiddleware, WorkspaceController.getAll);

// Crear workspace
workspaceRouter.post("/", authMiddleware, WorkspaceController.create);

// Invitar a workspace
workspaceRouter.post(
    "/:workspace_id/invite",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    WorkspaceController.invite
);

// Actualizar workspace
workspaceRouter.put(
    "/:workspace_id/update",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    WorkspaceController.update
);

// Eliminar workspace
workspaceRouter.delete(
    "/:workspace_id/delete",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    WorkspaceController.delete
);

// Crear canales
workspaceRouter.post(
    "/:workspace_id/channels",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    ChannelController.create
);

// Obtener canales
workspaceRouter.get(
    "/:workspace_id/channels",
    authMiddleware,
    workspaceMiddleware(),
    ChannelController.getAllByWorkspaceId
);

//Actualizar canal
workspaceRouter.put(
    "/:workspace_id/channels/:channel_id/update",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    channelMiddleware,
    ChannelController.update
);

// Eliminar canal
workspaceRouter.delete(
    "/:workspace_id/channels/:channel_id/delete",
    authMiddleware,
    workspaceMiddleware(["admin"]),
    channelMiddleware,
    ChannelController.delete
);

// Crear mensajes
workspaceRouter.post(
    "/:workspace_id/channels/:channel_id/messages",
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessageController.create
);

// Obtener mensajes
workspaceRouter.get(
    "/:workspace_id/channels/:channel_id/messages",
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessageController.getAllByChannelId
);

// Actualizar mensajes
workspaceRouter.put(
    "/:workspace_id/channels/:channel_id/messages/:message_id/update",
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessageController.update
);

// Eliminar mensajes
workspaceRouter.delete(
    "/:workspace_id/channels/:channel_id/messages/:message_id/delete",
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessageController.delete
);

export default workspaceRouter;
