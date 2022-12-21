import { memo } from "react";
import { Link } from "react-router-dom";

import './modalAgreementLink.scss'

const ModalAgreementLink = memo(({switchLangBtn, checkedAgree, setCheckedAgree}) => {
	return (
		<div className="modal-form__wrapper-box">
			<input
				className="modal-form__checkbox-input checkbox-origin"
				type="checkbox"
				name="[register]checkbox"
				id="Agreement"
				value={checkedAgree.val}
				onChange={() => setCheckedAgree({val: !checkedAgree.val, isValid: true})}
				required
			/>
			<div className="auto-park__checkbox checkbox-custom">
				<span></span>
			</div>
			<label className="modal-form__label" htmlFor="Agreement">
				{switchLangBtn ? 'Ich stimme den' : 'I agree with the'}
				<Link to={''}>
					{switchLangBtn ? ' Dienstordnungsvereinbarung ' : ' Service Order Agreement '}
				</Link>
				{switchLangBtn
					? 'zu den Bedingungen und zu den in der '
					: 'under the terms and conditions of the'}
				<Link to={''}>{switchLangBtn ? ' Nutzungsvereinbarung ' : ' User agreement '}</Link>
				{switchLangBtn ? 'beschriebenen Zwecken zu' : 'for the purposes described above'}
			</label>
		</div>
	);
})

export default ModalAgreementLink;
