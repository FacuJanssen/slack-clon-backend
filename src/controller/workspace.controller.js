import { request } from "express";
import WorkspaceRepository from "../repositories/workspace.repository.js";
import WorkspaceService from "../services/wokspace.service.js";

class WorkspaceController {
    static async getAll(req, res) {
        try {
            const user = req.user;
            const workspaces = await WorkspaceRepository.getAll(user.id);
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Workspaces found",
                data: {
                    workspaces: workspaces,
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
                    "[SERVER ERROR]: Error at getting workspaces",
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
    static async getAllByUserId(req, res) {
        try {
            const { user } = req;
            const workspaces = await WorkspaceService.getAllByUserId(
                user.user_id
            );
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Workspaces found",
                data: {
                    workspaces: workspaces,
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
                    "[SERVER ERROR]: Error at getting workspaces",
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
            const user = req.user;
            const { name, url_image } = req.body;
            const workspace_created = await WorkspaceService.create(
                user.user_id, // Cambia de user.id a user.user_id
                name,
                url_image
            );
            res.status(201).json({
                ok: true,
                status: 201,
                message: "Workspace created",
                data: {
                    workspace_created,
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
                    "[SERVER ERROR]: Error at creating workspace",
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
            res.status(200).json({
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
    static async update(req, res) {
        try {
            const { workspace_selected } = req;
            const { name, url_image } = req.body;
            const workspace_updated = await WorkspaceService.update(
                workspace_selected,
                name,
                url_image
            );
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Workspace updated",
                data: {
                    workspace_updated,
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
                    "[SERVER ERROR]: Error at updating workspace",
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
            const { workspace_selected } = req;
            await WorkspaceService.delete(workspace_selected);
            res.status(200).json({
                ok: true,
                status: 200,
                message: "Workspace deleted",
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
                    "[SERVER ERROR]: Error at deleting workspace",
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
