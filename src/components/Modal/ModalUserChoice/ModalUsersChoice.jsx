import { memo } from 'react';

import './modalUserChoice.scss'

const ModalUsersChoice = memo((props) => {
	const {
		switchLangBtn,
		checkedClient,
		setCheckedClient,
		checkedAuthor,
		setCheckedAuthor,
		setAuthorInput,
		setClientInput
	} = props;

	const clientChoice = (e) => {
		setClientInput(e.target.name);
		setCheckedClient({val: true, isValid: true});
		setCheckedAuthor({val: false, isValid: true});
		setAuthorInput('');
	};

	const authorChoice = (e) => {
		setAuthorInput(e.target.name);
		setCheckedAuthor({val: true, isValid: true});
		setCheckedClient({val: false, isValid: true});
		setClientInput('');
	};

	return (
		<>
			<div className="modal-form__top" style={{marginBottom: (!checkedAuthor.isValid && !checkedClient.isValid) && '5px'}}>
				<div className="modal-form__wrapper">
					<input
						className="modal-form__checkbox-input checkbox-origin"
						type="checkbox"
						name="user"
						id="modal-user"
						checked={checkedClient.val}
						onChange={(e) => clientChoice(e)}
					/>
					<div className="auto-park__checkbox checkbox-custom">
						<span></span>
					</div>
					<label
						className="modal-form__label"
						style={{ color: !checkedAuthor.isValid && !checkedClient.isValid ? 'red' : '#000' }}
						htmlFor="modal-user"
					>
						{switchLangBtn ? 'Ich bin Kunde' : "I'm an User"}
					</label>
				</div>
				<div className="modal-form__wrapper">
					<input
						className="modal-form__checkbox-input checkbox-origin"
						type="checkbox"
						name="author"
						id="autor"
						checked={checkedAuthor.val}
						onChange={(e) => authorChoice(e)}
					/>
					<div className="auto-park__checkbox checkbox-custom">
						<span></span>
					</div>
					<label
						className="modal-form__label"
						style={{ color: !checkedAuthor.isValid && !checkedClient.isValid ?  'red' : '#000' }}
						htmlFor="autor"
					>
						{switchLangBtn ? 'Ich bin Autor' : "I'm an Author"}
					</label>
				</div>
			</div>
			{(!checkedAuthor.isValid && !checkedClient.isValid) && (
				<p className="error-message">
					Please, make your choice!
				</p>
			)}
		</>
	);
});

export default ModalUsersChoice;
