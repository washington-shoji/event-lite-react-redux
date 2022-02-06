import React from 'react';
import Button from '../../components/button/Button';
import './LandingPage.scss';

export default function LandingPage() {
	return (
		<main className='landing-page'>
			<div className='landing-page__container'>
				<div className='landing-page__container__content'>
					<h1>Welcome to Event X App</h1>
					<p>Please login to get started</p>

					<button onClick={() => {}}>Log in</button>

					<Button onClick={() => {}} title={'Log in'} />
				</div>
			</div>
		</main>
	);
}