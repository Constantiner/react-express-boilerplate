import log4javascript from "log4javascript";
import React, { Component } from "react";
import "./App.css";
import "./log4javascript.config";
import logo from "./logo.svg";

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
