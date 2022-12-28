import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut, getAuth } from 'firebase/auth';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import LogoutModal from '../../components/LogoutModal/LogoutModal';

const MainLayout = () => {
	const auth = getAuth()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false);
	const showModal = useSelector((state) => state.useModalContentSlice.showModal);
	
	const clickOpenLogout = () => {
		setOpen(true);
	};

	const clickLogout = () => {
		signOut(auth);
		navigate('/')
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className={`app ${showModal ? 'lock' : ''}`}>
			<Modal />
			<LogoutModal 
				openLogout={open} 
				handleClose={handleClose}
				clickLogout={clickLogout}
			/>
			<div className={`content-container ${showModal || open ? 'active' : ''}`}>
				<Header 
					clickOpenLogout={clickOpenLogout}
					openLogout={open} 
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
