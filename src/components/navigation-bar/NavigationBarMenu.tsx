import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBarMenu.scss';

export interface ILinksProps {
	label: string;
	link: string;
}

export default function NavigationBarMenu(props: ILinksProps) {
	return (
		<nav className='navigation-bar__menu'>
			<Link to={props.link} className='navigation-bar__menu__link'>
				{props.label}
			</Link>
		</nav>
	);
}
