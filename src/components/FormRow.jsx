function FormRow({ type, name, value, handleChange, labelText }) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {name}
            </label>
            <input
                onChange={handleChange}
                type={type}
                name={name}
                value={value}
                className="form-input"
            />
        </div>
    );
}

export default FormRow;