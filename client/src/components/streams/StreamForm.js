import React from "react";
import { Form, Field} from 'react-final-form';

const StreamForm = props => {

	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div
				className="ui error message">
					<div className="header">
						{error}
					</div>
				</div>
			)
		}
	};

	//destructured formProps for input
	const renderInput = ({ input, label, meta }) => {

		const className = `field ${meta.error && meta.touched ? 'error': ''}`

		return (
		<div className={className}>
			<label>
				{label}
			</label>
			<input {...input} autoComplete="off" />
			{renderError(meta)}
		</div>
		)
	};

	const onSubmit = formValues => {
		props.onSubmit(formValues)
	};

	//will validate inputs
	const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}

	return errors;
};


	return (
		<Form
		initialValues={props.initialValues}
		onSubmit={onSubmit}
		validate={validate}
		render={({ handleSubmit }) => (
		<form
		onSubmit={handleSubmit}
		className="ui form error">
			<Field
			label="Enter Title"
			name="title"
			component={renderInput}
			/>
			<Field
			label="Enter Description"
			name="description"
			component={renderInput}
			/>
			<button
			className="ui button primary">
				Submit
			</button>
		</form>
		)}
		/>
	);
};

export default StreamForm;