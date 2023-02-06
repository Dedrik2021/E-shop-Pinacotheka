import { memo } from 'react';

import CleanInputBtn from '../../UI/cleanInputBtn/CleanInputBtn';

import './textareaForm.scss';

const TextareaForm = memo((props) => {
    const {
		id,
		srOnly,
		textareaValue,
		setTextareaValue,
		type,
		placeholder,
		name,
		message,
		textareaRef,
		labelName,
        styleArea,
        styleBlock
	} = props;

	return (
		<div className="textarea-form" style={styleBlock}>
			<label className="textarea-form__label" htmlFor={id} ref={textareaRef}>
				<span className="sr-only">{srOnly}</span>
				<span className="textarea-form__label-name">{labelName}</span>
				<CleanInputBtn inputValue={textareaValue} setInputValue={setTextareaValue} id={id} />
			</label>
			<textarea
				className="textarea-form__textarea"
				type={type}
				placeholder={placeholder}
				name={name}
				id={id}
				style={styleArea}
				value={textareaValue.val}
				onChange={(e) => setTextareaValue({ val: e.target.value, isValid: true })}
			/>

			{!textareaValue.isValid && <p className="error-message">{message}</p>}
		</div>
	);
})

export default TextareaForm;
