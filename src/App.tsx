import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import Layout from './components/layout/Layout';

function App() {
	const isLoggedIn: boolean = true;
	return (
		<Router>
			<div className='app'>{isLoggedIn ? <Layout /> : <LandingPage />}</div>;
		</Router>
	);
}

export default App;
