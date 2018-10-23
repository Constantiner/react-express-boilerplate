import log4javascript from "log4javascript";
import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";

const consoleAppender = new log4javascript.BrowserConsoleAppender();
const layout = new log4javascript.PatternLayout(`%d{${log4javascript.PatternLayout.DATETIME_DATEFORMAT}} [%-5p] (%c) %m`);
log4javascript.setShowStackTraces(true);
consoleAppender.setLayout(layout);
const log = log4javascript.getRootLogger();
log.addAppender(consoleAppender);
log.setLevel(log4javascript.Level.DEBUG);

const appLogger = log4javascript.getLogger("app");

appLogger.debug("start!");

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</a>
				</header>
			</div>
		);
	}
}

export default App;
