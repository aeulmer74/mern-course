const FormRowSelect = ({ name, labelText, options, defaultValue }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText}
			</label>
			<select className="form-select" name={name} defaultValue={defaultValue}>
				{options.map((val) => {
					return (
						<option key={val} value={val}>
							{val}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default FormRowSelect;
