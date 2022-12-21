import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setShowModal } from '../../../redux/slices/modalContentSlice';

import './headerOpenModalBtn.scss'

const HeaderOpenModalBtn = memo(() => {
	const dispatch = useDispatch();

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;
	const showModal = useSelector((state) => state.useModalContentSlice.showModal);

	const clickShowModal = () => {
		dispatch(setShowModal(true))
	}

	return (
		<>
			<div className={`menu__user-box ${showModal ? 'active' : ''}`}>
				<button
					onClick={clickShowModal}
					className={`menu__enter-btn btn ${showModal ? 'active' : ''}`}
					type="button"
				>
					{switchBtn ? 'Eingang' : 'Entrance'}
				</button>
			</div>
		</>
	);
});

export default HeaderOpenModalBtn;
