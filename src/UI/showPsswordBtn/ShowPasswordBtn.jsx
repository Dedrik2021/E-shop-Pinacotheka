import ShowPasswordIcon from '../../assets/sprite/show-password-icon.svg';
import HidePasswordIcon from '../../assets/sprite/hide-password-icon.svg';

import './showPasswordBtn.scss'

const ShowPasswordBtn = ({switchLangBtn, showPassword, setShowPassword}) => {
	return (
		<div className="password">
			<button
				className="password__btn btn"
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				title={showPassword ? 'Hide Password' : 'Show Password'}
			>
				<span className="sr-only">
					{switchLangBtn ? 'Eingabefeld löschen' : 'Show password'}
				</span>
				{showPassword ? (
					<svg width="15" height="15">
						<use href={`${HidePasswordIcon}#hide-password`}></use>
					</svg>
				) : (
					<svg width="15" height="15">
						<use href={`${ShowPasswordIcon}#show-password`}></use>
					</svg>
				)}
			</button>
		</div>
	);
};

export default ShowPasswordBtn;
