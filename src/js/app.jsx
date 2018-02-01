import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home-page';
import Search from './pages/search-page';
import About from './pages/about-page';
import Header from './components/header';
import Footer from './components/footer';

function App() {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Route component={Header} />
					<div className="container--main">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/search/:searchTerm" component={Search} />
							<Route path="/about" component={About} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
			<Footer />
		</div>
	);
}

(function InitApp() {
	function Init() {
		const appContainer = document.getElementById('App');
		ReactDOM.render(<App />, appContainer);
	}
	document.addEventListener('DOMContentLoaded', Init);
})();
