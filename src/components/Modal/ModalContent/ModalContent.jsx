import { memo } from 'react';
import { useSelector } from 'react-redux';

import Social from '../../Social/Social';
import ModalAgreementLink from '../ModalAgreementLink/ModalAgreementLink';
import ModalPasswordLink from '../ModalPasswordLink/ModalPasswordLink';
import ModalUsersChoice from '../ModalUserChoice/ModalUsersChoice';

import CleanInputBtn from '../../../UI/cleanInputBtn/CleanInputBtn';
import ShowPasswordBtn from '../../../UI/showPsswordBtn/ShowPasswordBtn';

import './modalContent.scss';

const ModalContent = memo(({ props }) => {
	const modalSwitchBtn = useSelector((state) => state.useModalContentSlice.modalSwitchBtn);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchLangBtn = switchLanguageBtn[0] === 0;

	return (
		<>
			<form className="modal-form">
				{modalSwitchBtn === 1 && (
					<>
						<ModalUsersChoice
							switchLangBtn={switchLangBtn}
							checkedClient={props.checkedClient}
							setCheckedClient={props.setCheckedClient}
							checkedAuthor={props.checkedAuthor}
							setCheckedAuthor={props.setCheckedAuthor}
							setClientInput={props.setClientInput}
							setAuthorInput={props.setAuthorInput}
						/>

						<label className="modal-form__label" htmlFor="modal-name">
							<span className="sr-only">Name</span>
							<CleanInputBtn
								inputValue={props.nameInput}
								setInputValue={props.setNameInput}
							/>
						</label>
						<input
							className="modal-form__input"
							type="text"
							placeholder="Name"
							name="[register]name"
							id="modal-name"
							style={{ marginBottom: !props.nameInput.isValid && '5px' }}
							value={props.nameInput.val}
							onChange={(e) =>
								props.setNameInput({ val: e.target.value, isValid: true })
							}
							required
						/>

						{!props.nameInput.isValid && (
							<p className="error-message">The Name field should not be empty!</p>
						)}

						<label className="modal-form__label" htmlFor="modal-tel">
							<span className="sr-only">{switchLangBtn ? 'Telefon' : 'Phone'}</span>
							<CleanInputBtn
								inputValue={props.telInput}
								setInputValue={props.setTelInput}
							/>
						</label>
						<input
							className="modal-form__input"
							type="tel"
							placeholder={switchLangBtn ? 'Telefon' : 'Phone'}
							name="[register]tel"
							id="modal-tel"
							style={{ marginBottom: !props.telInput.isValid && '5px' }}
							value={props.telInput.val}
							onChange={(e) =>
								props.setTelInput({ val: e.target.value, isValid: true })
							}
							required
						/>
						{!props.telInput.isValid && (
							<p className="error-message">The Phone field should not be empty!</p>
						)}
					</>
				)}
				<label className="modal-form__label" htmlFor="modal-email2">
					<span className="sr-only">Email</span>
					<CleanInputBtn
						inputValue={props.emailInput}
						setInputValue={props.setEmailInput}
					/>
				</label>
				<input
					className="modal-form__input"
					type="email"
					placeholder="User@gmail.com"
					name="[register]email"
					id="modal-email2"
					style={{ marginBottom: !props.emailInput.isValid && '5px' }}
					ref={props.emailRef}
					value={props.emailInput.val}
					onChange={(e) => props.setEmailInput({ val: e.target.value, isValid: true })}
					required
				/>

				{!props.emailInput.isValid && (
					<p className="error-message">
						{modalSwitchBtn === 1
							? props.emailInput.existEmail
								? 'This email already exists'
								: 'The Email field should not be empty and contain "@" symbol!'
							: props.emailInput.existEmail
							? 'This email not exists'
							: 'The Email field should not be empty and contain "@" symbol!'}
					</p>
				)}

				<label className="modal-form__label" htmlFor="modal-password2">
					<span className="sr-only">{switchLangBtn ? 'Passwort' : 'Password'}</span>
					<CleanInputBtn
						inputValue={props.passwordInput}
						setInputValue={props.setPasswordInput}
					/>

					<ShowPasswordBtn
						switchLangBtn={switchLangBtn}
						showPassword={props.showPassword}
						setShowPassword={props.setShowPassword}
					/>
				</label>
				<input
					className="modal-form__input"
					type={props.showPassword ? 'text' : 'password'}
					placeholder={switchLangBtn ? 'Passwort' : 'Password'}
					name="[register]password"
					id="modal-password2"
					style={{ marginBottom: !props.passwordInput.isValid && '5px' }}
					value={props.passwordInput.val}
					onChange={(e) => props.setPasswordInput({ val: e.target.value, isValid: true })}
					required
				/>

				{!props.passwordInput.isValid && (
					<p className="error-message">
						{props.passwordInput.wrongPass
							? 'Check your password!'
							: 'The Password field should not be empty!'}
					</p>
				)}

				{modalSwitchBtn === 1 && (
					<>
						<label className="modal-form__label" htmlFor="modal-repassword">
							<span className="sr-only">
								{switchLangBtn ? 'Passwort wiederholen' : 'Repeat Password'}
							</span>
							<CleanInputBtn
								inputValue={props.doublePasswordInput}
								setInputValue={props.setDoublePasswordInput}
							/>
						</label>
						<input
							className="modal-form__input"
							type="password"
							placeholder={switchLangBtn ? 'Passwort wiederholen' : 'Repeat Password'}
							name="[register]password"
							id="modal-repassword"
							style={{ marginBottom: !props.doublePasswordInput.isValid && '5px' }}
							value={props.doublePasswordInput.val}
							onChange={(e) =>
								props.setDoublePasswordInput({ val: e.target.value, isValid: true })
							}
							ref={props.doublePasswordRef}
							required
						/>
						{!props.doublePasswordInput.isValid && (
							<p className="error-message">The Password field should not be empty!</p>
						)}
					</>
				)}

				<button
					className="modal-form__btn btn btn--red-hover"
					type="submit"
					onClick={(e) =>
						modalSwitchBtn === 1 ? props.clickOnRegister(e) : props.clickSignIn(e)
					}
				>
					{modalSwitchBtn === 1
						? switchLangBtn
							? 'Registriren'
							: 'Register'
						: switchLangBtn
						? 'Betreten'
						: 'Enter'}
				</button>

				<div className="modal-form__bottom">
					{modalSwitchBtn === 1 ? (
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<ModalAgreementLink
								switchLangBtn={switchLangBtn}
								checkedAgree={props.checkedAgree}
								setCheckedAgree={props.setCheckedAgree}
							/>
							{!props.checkedAgree.isValid && (
								<p style={{paddingTop: '5px'}} className="error-message">
									Accept the agreement!
								</p>
							)}
						</div>
					) : (
						<ModalPasswordLink switchLangBtn={switchLangBtn} />
					)}
				</div>
			</form>
			<span className="modal__enter">
				{switchLangBtn
					? 'Mit sozialen Netzwerken anmelden'
					: 'Sign in with social networks'}
			</span>
			<Social />
		</>
	);
});

export default ModalContent;
