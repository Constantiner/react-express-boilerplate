import cookieParser from "cookie-parser";
import express from "express";
import addRequestId from "express-request-id";
import createError from "http-errors";
import log4js from "log4js";
import path from "path";
import usersRouter from "./routes/users";
import envConfig from "./util/envConfig";
import configureLog4js from "./util/log4jsConfig";

const getApp = async () => {
	await envConfig("server/.env");
	await configureLog4js();

	const app = express();

	app.use(addRequestId());

	const appLogger = log4js.getLogger("react-express-boilerplate.app");

	const expressLogger = log4js.getLogger("express");
	app.use(
		log4js.connectLogger(expressLogger, {
			level: "auto", // include the Express request ID in the logs
			format: (req, res, format) =>
				format(
					`:remote-addr - ${
						req.id
					} - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`
				)
		})
	);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, "../public")));

	app.use("/users", usersRouter);
	app.use("/*", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	// error handler
	/* eslint-disable-next-line no-unused-vars */
	app.use((err, req, res, next) => {
		appLogger.error(err);
		res.status(err.status || 500).json({
			error: err.message
		});
	});

	return app;
};

export default getApp;
