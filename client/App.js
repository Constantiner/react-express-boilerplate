import log4javascript from "log4javascript";
import React, { PureComponent } from "react";
import "./App.css";
import "./log4javascript.config";
import logo from "./logo.svg";

const appLogger = log4javascript.getLogger("app");

appLogger.debug("start!");

const callApi = async () => {
	const response = await fetch("/users/me");
	if (response.ok) {
		const user = await response.json();
		return user;
	}
	throw new Error(response.statusText);
};

class App extends PureComponent {
	state = {
		user: null,
		error: null
	};

	componentDidMount() {
		callApi()
			.then(user => {
				if (appLogger.isDebugEnabled()) {
					appLogger.debug(JSON.stringify(user));
				}
				this.setState({ user });
			})
			.catch(e => {
				appLogger.error(e);
				this.setState({ error: e.message });
			});
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					{this.state.user ? (
						<>
							<p className="App-user-info-row">
								First Name: <span>{this.state.user.firstName}</span>
							</p>
							<p className="App-user-info-row">
								Last Name: <span>{this.state.user.lastName}</span>
							</p>
							<p className="App-user-info-row">
								Home Page:{" "}
								<a
									className="App-link"
									href={this.state.user.homePage}
									target="_blank"
									rel="noopener noreferrer"
								>
									{this.state.user.homePage}
								</a>
							</p>
						</>
					) : this.state.error ? (
						<p className="App-error">{this.state.error}</p>
					) : (
						<p>Loading…</p>
					)}
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
