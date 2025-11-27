import dotenv from "dotenv";

dotenv.config();

const ENVIRONMENT = {
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    PORT: process.env.PORT,
    MONGO_DB_HOST: process.env.MONGO_DB_HOST,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    URL_FRONTEND: process.env.URL_FRONTEND,
    URL_BACKEND: process.env.URL_BACKEND,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
};

export default ENVIRONMENT;
