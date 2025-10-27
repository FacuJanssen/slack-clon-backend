import WorkspaceRepository from "../repositories/workspace.repository.js";
import WorkspaceService from "../services/wokspace.service.js";
import { response } from "express";

class WorkspaceController {
    static async getAll(req, res) {
        try {
            const user = req.user;
            const workspaces = await WorkspaceService.getAll(user._id);
            response.status(200).json({
                ok: true,
                status: 200,
                message: "Workspaces found",
                data: {
                    workspaces: workspaces,
                },
            });
        } catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at getting workspaces",
                    error
                );
                return response.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    }
    static async create(req, res) {
        try {
            const user = req.user;
            const { name, url_image } = req.body;
            const workspace_created = await WorkspaceService.create(
                user._id,
                name,
                url_image
            );
            response.status(201).json({
                ok: true,
                status: 201,
                message: "Workspace created",
                data: {
                    workspace_created,
                },
            });
        } catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status,
                });
            } else {
                console.error(
                    "[SERVER ERROR]: Error at creating workspace",
                    error
                );
                return response.status(500).json({
                    ok: false,
                    message: "Internal server error",
                    status: 500,
                });
            }
        }
    }
    static async invite(req, res) {
        try {
            const { member, workspace_selected, user } = req;
            const { email_invited, role_invited } = req.body;

            await WorkspaceService.invite(
                member,
                workspace_selected,
                email_invited,
                role_invited
            );
            response.status(200).json({
                ok: true,
                status: 200,
                message: "Invitation sent",
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
                    "[SERVER ERROR]: Error at inviting member",
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

export default WorkspaceController;
