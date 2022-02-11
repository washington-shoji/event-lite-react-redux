import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import Layout from './components/layout/Layout';
import Routes from './components/router/Routes';
import { useAuth0 } from '@auth0/auth0-react';
import MainLoader from './components/main-loader/MainLoaderSpheres';

function App() {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return (
			<div className='app__loading'>
				<MainLoader />
			</div>
		);
	}

	return (
		<Router>
			<div className='app'>
				{isAuthenticated ? (
					<Layout>
						<Routes />
					</Layout>
				) : (
					<Route exact path='/'>
						<LandingPage />
					</Route>
				)}
			</div>
		</Router>
	);
}

export default App;
