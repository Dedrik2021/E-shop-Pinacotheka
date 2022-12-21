import { memo } from 'react';
import { Link } from 'react-router-dom';

import './modalPasswordLink.scss'

const ModalPasswordLink = memo(({switchLangBtn}) => {
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
			<Link className="modal-form__link" to={''}>
				{switchLangBtn ? 'Vergessen Passwort?' : 'Forgot your password?'}
			</Link>
		</>
	);
});

export default ModalPasswordLink;
