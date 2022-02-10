import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../utils/hooks/redux/redux-toolkit-hooks';
import './Toast.scss';

interface IToastProps {
	title: string;
	description: string | string[];
	type: string;
	redirect?: string;
	resetState?: {
		payload: undefined;
		type: string;
	};
}

export default function Toast({
	title,
	description,
	type,
	redirect,
	resetState,
}: IToastProps): JSX.Element {
	const [hideToast, setHideToast] = useState<string>('');
	const dispatch = useAppDispatch();
	const history = useHistory();

	function handleHideToast() {
		setHideToast('hide');
		resetState && dispatch(resetState);
		redirect && history.replace(redirect as string);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			handleHideToast();
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	}, [description]);

	return (
		<div className={`container ${hideToast}`}>
			<div className={`notification toast ${type}`}>
				<button onClick={handleHideToast}>X</button>
				<div>
					<p className='title'>{title}</p>
					<p className='description'>{description}</p>
				</div>
			</div>
		</div>
	);
}
