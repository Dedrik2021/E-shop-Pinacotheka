import { memo } from 'react';
import { useSelector } from 'react-redux';

import Social from '../../Social/Social';
import ModalAgreementLink from '../ModalAgreementLink/ModalAgreementLink';
import ModalPasswordLink from '../ModalPasswordLink/ModalPasswordLink';
import ModalUsersChoice from '../ModalUserChoice/ModalUsersChoice';
import InputForm from '../../InputForm/InputForm';

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

						<InputForm
							id="modal-name"
							srOnly="Name"
							inputValue={props.nameInput}
							setInputValue={props.setNameInput}
							type="text"
							placeholder="Name"
							name="[register]name"
							message="The Name field should not be empty!"
							inputRef={props.nameRef}
						/>

						<InputForm
							id="modal-tel"
							srOnly="Tel"
							inputValue={props.telInput}
							setInputValue={props.setTelInput}
							type="tel"
							placeholder={switchLangBtn ? 'Telefon' : 'Phone'}
							name="[register]tel"
							message={`${props.telInput.val ? isNaN(props.telInput.val) && 'The phone field must contain the signs of the number!' : 'The Phone field should not be empty!'}`}
							inputRef={props.telRef}
						/>
					</>
				)}

				<InputForm
					id="modal-email2"
					srOnly="Email"
					inputValue={props.emailInput}
					setInputValue={props.setEmailInput}
					type="email"
					placeholder="User@gmail.com"
					name="[register]email"
					message={
						modalSwitchBtn === 1
							? props.emailInput.existEmail
								? 'This email already exists'
								: props.emailInput.val ? !props.emailInput.val.includes('@') && 'The Email field should be contain "@" symbol!' : 'The Email field should not be empty!'
							: props.emailInput.existEmail
							? 'This email not exists'
							: props.emailInput.val ? !props.emailInput.val.includes('@') && 'The Email field should be contain "@" symbol!' : 'The Email field should not be empty!'
					}
					inputRef={props.emailRef}
				/>

				<InputForm
					id="modal-password2"
					srOnly={switchLangBtn ? 'Passwort' : 'Password'}
					inputValue={props.passwordInput}
					setInputValue={props.setPasswordInput}
					type={props.showPassword ? 'text' : 'password'}
					placeholder={switchLangBtn ? 'Passwort' : 'Password'}
					name="[register]password"
					message={
						props.passwordInput.wrongPass
							? 'Check your password!'
							: 'The Password field should not be empty!'
					}
					switchLangBtn={switchLangBtn}
					password={true}
					setShowPassword={props.setShowPassword}
					showPassword={props.showPassword}
					inputRef={props.passwordRef}
				/>

				{modalSwitchBtn === 1 && (
					<>
						<InputForm
							id="modal-repassword"
							srOnly={switchLangBtn ? 'Passwort wiederholen' : 'Repeat Password'}
							inputValue={props.doublePasswordInput}
							setInputValue={props.setDoublePasswordInput}
							type={props.showPassword ? 'text' : 'password'}
							placeholder={switchLangBtn ? 'Passwort wiederholen' : 'Repeat Password'}
							name="[register]repeat-password"
							message={`${props.doublePasswordInput.val ? props.doublePasswordInput.val !== props.passwordInput.val && 'The double password field must match the password field and contain the same signs!' : 'The Password field should not be empty!'} `}
							inputRef={props.doublePasswordRef}
						/>
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
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<ModalAgreementLink
								switchLangBtn={switchLangBtn}
								checkedAgree={props.checkedAgree}
								setCheckedAgree={props.setCheckedAgree}
							/>
							{!props.checkedAgree.isValid && (
								<p style={{ paddingTop: '5px' }} className="error-message">
									Accept the agreement!
								</p>
							)}
						</div>
					) : (
						<ModalPasswordLink
							switchLangBtn={switchLangBtn}
							setShowModal={props.setShowModal}
						/>
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
