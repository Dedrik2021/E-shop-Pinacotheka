import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './modalPasswordLink.scss'

const ModalPasswordLink = memo(({switchLangBtn, setShowModal}) => {
	const dispatch = useDispatch()

	return (
		<>
			<div className="modal-form__wrapper">
				<input
					className="modal-form__checkbox-input checkbox-origin"
					type="checkbox"
					name="[enter]checkbox"
					id="forgotten-password"
				/>
				<div className="auto-park__checkbox checkbox-custom">
					<span></span>
				</div>
				<label className="modal-form__label" htmlFor="forgotten-password">
					{switchLangBtn ? 'Passwort merken' : 'Remember Password'}
				</label>
			</div>
			<Link className="modal-form__link" to={'/ForgotYourPassword'} onClick={() => dispatch(setShowModal(false))}>
				{switchLangBtn ? 'Vergessen Passwort?' : 'Forgot your password?'}
				
			</Link>
		</>
	);
});

export default ModalPasswordLink;
