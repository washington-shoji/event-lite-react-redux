import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../../components/button/Button';
import './LandingPage.scss';

export default function LandingPage() {
	const { loginWithRedirect } = useAuth0();
	return (
		<main className='landing-page'>
			<div className='landing-page__container'>
				<div className='landing-page__container__content'>
					<h1>Welcome to Event Lite</h1>
					<p>Please login to get started</p>
					<Button
						onClick={() => loginWithRedirect()}
						type='submit'
						title={'Log in'}
					/>
				</div>
			</div>
		</main>
	);
}
