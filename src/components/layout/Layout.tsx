import React, { ReactNode } from 'react';
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
			<h1>This is a footer</h1>
		</div>
	);
}
