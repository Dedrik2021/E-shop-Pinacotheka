import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut, getAuth } from 'firebase/auth';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import image from '../../assets/images/exit.gif';

const MainLayout = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState(false);
	const showModal = useSelector((state) => state.useModalContentSlice.showModal);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const clickOpenLogout = () => {
		setOpen(true);
	};

	const clickLogout = () => {
		signOut(auth);
		navigate('/');
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={`app ${search ? 'lock' : ''}`}>
			<Modal />
			<ConfirmModal
				openModal={open}
				handleClose={handleClose}
				clickOnBtn={clickLogout}
				image={image}
				imgStyles={{ height: '150px', width: '100%' }}
				message={
					switchBtn
						? 'Sind Sie sicher, dass Sie sich von Ihrem Konto abmelden möchten'
						: 'Are you sure, you want to log out of your account?'
				}
			/>
			<div
				className={`content-container ${showModal || open ? 'active' : ''} ${
					search ? 'lock' : ''
				}`}
			>
				<Header
					clickOpenLogout={clickOpenLogout}
					openLogout={open}
					search={search}
					setSearch={setSearch}
				/>
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
