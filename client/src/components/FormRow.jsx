const FormRow = ({ type, name, labelText, defaultValue, required }) => {
	return (
		<div className="form-row">
			<label className="form-label" htmlFor={name}>
				{labelText}
			</label>
			<input
				className="form-input"
				type={type}
				name={name}
				id={name}
				defaultValue={defaultValue || ''}
				required={required}
			/>
		</div>
	);
};
export default FormRow;
