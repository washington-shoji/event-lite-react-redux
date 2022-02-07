import React from 'react';
import './ButtonLoading.scss';

interface IButtonLoadingProps {
	title: string;
}

export default function ButtonLoading(props: IButtonLoadingProps) {
	return (
		<div className='button'>
			<button type='button' disabled>
				<div className='button__spinner'></div>
				{props.title}
			</button>
		</div>
	);
}
