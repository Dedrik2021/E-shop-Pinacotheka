import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setModalSwitchBtn } from '../../../redux/slices/modalContentSlice';

import './modalSwitchContentBtns.scss'

const ModalSwitchContentBtns = memo(({cleanInputs}) => {
	const dispatch = useDispatch();

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const modalSwitchBtn = useSelector((state) => state.useModalContentSlice.modalSwitchBtn);

	const modalSwitchBtns = [
		{ id: 0, title: switchBtn ? 'Eingang' : 'LogIn' },
		{ id: 1, title: switchBtn ? 'Anmeldung' : 'SignIn' },
	];

    const clickOnModalSwitchBtn = (id) => {
        cleanInputs()
        dispatch(setModalSwitchBtn(id))
    }

	return (
		<ul className="btns-tabs">
			{modalSwitchBtns.map(({ id, title }) => {
				return (
					<li className="btns-tabs__item" key={id}>
						<button
							className={`btns-tabs__btn btn ${
								modalSwitchBtn === id ? 'active' : ''
							}`}
							data-content="modal-form__item--enter"
							type="button"
							onClick={() => clickOnModalSwitchBtn(id)}
						>
							{title}
						</button>
					</li>
				);
			})}
		</ul>
	);
});

export default ModalSwitchContentBtns;
