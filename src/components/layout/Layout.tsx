import React, { ReactNode } from 'react';
import Footer from '../footer/Footer';
import NavigationBar from '../navigation-bar/NavigationBar';
import './Layout.scss';

type LayoutProps = {
	children?: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<div className='layout'>
			<NavigationBar />
			{children}
			<Footer />
		</div>
	);
}
