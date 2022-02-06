import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import Layout from './components/layout/Layout';
import Routes from './components/router/Routes';

function App() {
	const isLoggedIn: boolean = true;
	return (
		<Router>
			<div className='app'>
				{isLoggedIn ? (
					<Layout>
						<Routes />
					</Layout>
				) : (
					<LandingPage />
				)}
			</div>
		</Router>
	);
}

export default App;
