import express from "express";
import MemberController from "../controller/member.controller.js";

const memberRouter = express.Router();
memberRouter.get(
    "/confirm/:intation_token",
    MemberController.confirmInvitation
);

export default memberRouter;
