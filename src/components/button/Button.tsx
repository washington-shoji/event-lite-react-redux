import React, { MouseEventHandler } from 'react';
import './Button.scss';

interface IButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	title: string;
}

export default function Button(props: IButtonProps) {
	return (
		<div className='button-container'>
			<button onClick={props.onClick}>{props.title}</button>
		</div>
	);
}
