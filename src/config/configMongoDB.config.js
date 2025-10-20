import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";

async function connectToMongoDB() {
    try {
        /* const connectionString =
            ENVIRONMENT.MONGO_DB_HOST + "/" + ENVIRONMENT.MONGO_DB_NAME; */
        const connectionString = ENVIRONMENT.MONGODB_URI;
        await mongoose.connect(connectionString);
        console.log("Conexion exitosa a la DB:", mongoose.connection.name);
    } catch (error) {
        console.log("Error de conexion", error);
    }
}

export default connectToMongoDB;
