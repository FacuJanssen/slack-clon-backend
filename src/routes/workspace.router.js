import express from "express";
import WorkspaceRepository from "../repositories/workspace.repository.js";
import WorkspaceController from "../controller/workspace.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import workspaceMiddleware from "../middlewares/workspaceMiddleware.js";

const workspaceRouter = express.Router();

workspaceRouter.get("/", authMiddleware, WorkspaceController.getAll);

workspaceRouter.post("/", authMiddleware, WorkspaceController.create);

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
