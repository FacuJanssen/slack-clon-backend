import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

//Creamos una ruta de express
const authRouter = Router();

authRouter.get("/test", (req, res) => {
    res.send({ ok: true });
});

authRouter.get("/verify-email/:token", AuthController.verifyEmail);

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export default authRouter;
