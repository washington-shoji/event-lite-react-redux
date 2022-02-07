import * as Yup from 'yup';

export const EventValidationSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	date: Yup.date().required('Required'),
	location: Yup.string()
		.min(4, 'Too Short!')
		.max(20, 'Too Long!')
		.required('Required'),
	status: Yup.string().required('Required'),
	shortDescription: Yup.string()
		.min(20, 'Too Short!')
		.max(150, 'Too Long!')
		.required('Required'),
	fullDescription: Yup.string()
		.min(50, 'Too Short!')
		.max(750, 'Too Long!')
		.required('Required'),
});
