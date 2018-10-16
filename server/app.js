import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import { realpath } from "fs";
import usersRouter from "./routes/users";
import envConfig from "./util/envConfig";
import { promisify } from "util";

const realpathAsync = promisify(realpath);

const getApp = async () => {
	await envConfig("server/.env");
	const cwd = await realpathAsync(process.cwd());

	const app = express();

	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(cwd, "public")));

	app.use("/users", usersRouter);
	app.use("/*", (req, res) => {
		res.sendFile(path.join(cwd, "/public/index.html"));
	});

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	// error handler
	/* eslint-disable-next-line no-unused-vars */
	app.use((err, req, res, next) => {
		/* eslint-disable-next-line no-console */
		console.error(err);
		res.status(err.status || 500).json({
			error: err.message
		});
	});

	return app;
};

export default getApp;
