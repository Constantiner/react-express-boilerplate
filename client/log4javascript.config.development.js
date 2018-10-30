import log4javascript from "log4javascript";

const consoleAppender = new log4javascript.BrowserConsoleAppender();
const layout = new log4javascript.PatternLayout(
	`%d{${log4javascript.PatternLayout.DATETIME_DATEFORMAT}} [%-5p] (%c) %m`
);
log4javascript.setShowStackTraces(true);
consoleAppender.setLayout(layout);
const log = log4javascript.getRootLogger();
log.addAppender(consoleAppender);
log.setLevel(log4javascript.Level.DEBUG);
