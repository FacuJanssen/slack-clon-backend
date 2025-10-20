import ENVIRONMENT from "./config/environment.config.js";
import connectToMongoDB from "./config/configMongoDB.config.js";
import express from "express";
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import handlebars from "express-handlebars";
import WorkspaceRepository from "./repositories/workspace.repository.js";
import mailTransporter from "./config/mailTransporter.config.js";
import cors from "cors";

connectToMongoDB();

const app = express();
app.use(cors());

app.use(express.json());

app.engine(
    "handlebars",
    handlebars.engine({
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspaceRouter);

app.get("/home", async (req, resp) => {
    const workspaces = await WorkspaceRepository.getAll();
    console.log(workspaces);
    resp.render("home", {
        username: "pepe",
        workspaces: workspaces,
        admin: true,
    });
});

/* const PORT = 8080; */

app.listen(ENVIRONMENT.PORT, () => {
    console.log(
        `Tu servidor se esta ejecutando correctamente en el puerto ${ENVIRONMENT.PORT}`
    );
});
