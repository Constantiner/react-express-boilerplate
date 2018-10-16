import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import indexRouter from "./routes";
import usersRouter from "./routes/users";
import envConfig from "./util/envConfig";

const getApp = async () => {
	await envConfig("server/.env");

	const app = express();

	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, "public")));

	app.use("/", indexRouter);
	app.use("/users", usersRouter);

	return app;
};

export default getApp;
