import { memo } from 'react';

import CleanInputBtn from '../../UI/cleanInputBtn/CleanInputBtn';
import ShowPasswordBtn from '../../UI/showPsswordBtn/ShowPasswordBtn';

import './inputForm.scss'

const InputForm = memo((props) => {
	const {
		id,
		srOnly,
		inputValue,
		setInputValue,
		type,
		placeholder,
		name,
		message,
		password,
		switchLangBtn,
		setShowPassword,
		showPassword,
		inputRef
	} = props;

	return (
		<div className='input-form'>
			<label className="input-form__label" htmlFor={id} ref={inputRef}>
				<span className="sr-only">{srOnly}</span>
				<CleanInputBtn inputValue={inputValue} setInputValue={setInputValue} id={id} />
			</label>
			{password && (
				<ShowPasswordBtn
					switchLangBtn={switchLangBtn}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>
			)}
			<input
				className="input-form__input"
				type={type}
				placeholder={placeholder}
				name={name}
				id={id}
				style={{ marginBottom: !inputValue.isValid && '5px' }}
				value={inputValue.val}
				onChange={(e) => setInputValue({ val: e.target.value, isValid: true })}
				required
			/>

			{!inputValue.isValid && <p className="error-message">{message}</p>}
		</div>
	);
});

export default InputForm;
