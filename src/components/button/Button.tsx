import React, { MouseEventHandler } from 'react';
import './Button.scss';

interface IButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	title: string;
	type?: 'button' | 'submit' | 'reset';
}

export default function Button(props: IButtonProps) {
	return (
		<div className='button-container'>
			<button
				className={`${props.type}`}
				onClick={props.onClick}
				type={props.type}
			>
				{props.title}
			</button>
		</div>
	);
}
