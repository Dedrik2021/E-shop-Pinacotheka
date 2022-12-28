import { memo, useRef, useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore/lite';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import ModalSwitchContentBtns from './ModalSwitchContentBtns/ModalSwitchContentBtns';
import ModalContent from './ModalContent/ModalContent';
import Logo from '../../UI/logo/Logo';
import { database } from '../../firebase/firebaseConfig';

import logo from '../../assets/images/logo.svg';

import { setShowModal, setModalSwitchBtn } from '../../redux/slices/modalContentSlice';

import './modal.scss';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = memo(() => {
	const auth = getAuth();
	const dispatch = useDispatch();

	const doublePasswordRef = useRef();
	const emailRef = useRef();

	const [clientInput, setClientInput] = useState('');
	const [authorInput, setAuthorInput] = useState('');
	const [formIsValid, setFormIsValid] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [nameInput, setNameInput] = useState({ val: '', isValid: true });
	const [telInput, setTelInput] = useState({ val: '', isValid: true });
	const [emailInput, setEmailInput] = useState({ val: '', isValid: true, existEmail: false });
	const [passwordInput, setPasswordInput] = useState({
		val: '',
		isValid: true,
		wrongPass: false,
	});
	const [doublePasswordInput, setDoublePasswordInput] = useState({ val: '', isValid: true });
	const [checkedAuthor, setCheckedAuthor] = useState({ val: false, isValid: true });
	const [checkedClient, setCheckedClient] = useState({ val: false, isValid: true });
	const [checkedAgree, setCheckedAgree] = useState({ val: false, isValid: true });

	const showModal = useSelector((state) => state.useModalContentSlice.showModal);

	const collectionRefClients = collection(database, 'users');
	const collectionRefAuthors = collection(database, 'authors');

	const onCloseModal = () => {
		dispatch(setShowModal(false));
		setTimeout(() => {
			dispatch(setModalSwitchBtn(0));
			cleanInputs();
		}, 500);
	};

	const cleanInputs = () => {
		setAuthorInput('');
		setClientInput('');
		setCheckedAuthor({ val: false, isValid: true });
		setCheckedClient({ val: false, isValid: true });
		setDoublePasswordInput({ val: '', isValid: true });
		setEmailInput({ val: '', isValid: true, existEmail: false });
		setNameInput({ val: '', isValid: true });
		setPasswordInput({ val: '', isValid: true, wrongPass: false });
		setTelInput({ val: '', isValid: true });
		setCheckedAgree({ val: false, isValid: true });
		setFormIsValid(true);
		setShowPassword(false);
	};

	const validateForm = () => {
		setFormIsValid(true);

		if (checkedAuthor.val === false && checkedClient.val === false) {
			setCheckedAuthor({ val: false, isValid: false });
			setCheckedClient({ val: false, isValid: false });
			setFormIsValid(false);
		}

		if (nameInput.val === '') {
			setNameInput({ val: '', isValid: false });
			setFormIsValid(false);
		}

		if (checkedAgree.val === false) {
			setCheckedAgree({ val: false, isValid: false });
			setFormIsValid(false);
		}

		if (emailInput.val === '' || !emailInput.val.includes('@')) {
			setEmailInput({ val: '', isValid: false, existEmail: false });
			setFormIsValid(false);
		}

		if (telInput.val === '') {
			setTelInput({ val: '', isValid: false });
			setFormIsValid(false);
		}

		if (passwordInput.val === '') {
			setPasswordInput({ val: '', isValid: false, wrongPass: false });
			setFormIsValid(false);
		}

		if (doublePasswordInput.val === '') {
			setDoublePasswordInput({ val: '', isValid: false });
			setFormIsValid(false);
		}
	};

	const clickOnRegister = (e) => {
		e.preventDefault();

		validateForm();

		if (!formIsValid) return;

		if (
			passwordInput.val === doublePasswordInput.val &&
			passwordInput.val !== '' &&
			doublePasswordInput.val !== '' && (checkedAuthor.val === true || checkedClient.val === true) && checkedAgree.val === true
		) {
			createUserWithEmailAndPassword(auth, emailInput.val, passwordInput.val)
				.then(addData)
				.then(cleanInputs)
				.then(dispatch(setModalSwitchBtn(1)))
				.then(dispatch(setShowModal(false)))
				.catch(() => {
					setEmailInput({ val: emailInput.val, isValid: false, existEmail: true });
					dispatch(setShowModal(true));
					emailRef.current.focus();
				});
		} else if (
			passwordInput.val !== doublePasswordInput.val &&
			passwordInput.val !== '' &&
			doublePasswordInput.val !== ''
		) {
			setDoublePasswordInput({ val: '', isValid: false });
			doublePasswordRef.current.focus();
		}
	};

	const addData = () => {
		if (checkedAuthor.val || !checkedClient.val) {
			addAuthorData();
		} else {
			addClientData();
		}
	};

	const addClientData = () => {
		addDoc(collectionRefClients, {
			emailId: emailInput.val,
			id: new Date().toISOString(),
			title: nameInput.val,
			email: emailInput.val,
			tel: Number(telInput.val),
			password: passwordInput.val,
			user: 'users',
			// user: checkedAuthor.val ? authorInput : clientInput,
			dateOfRegister: new Date().toLocaleString(),
			facebook: '',
			instagram: '',
			image: '',
			addressStreet: '',
			city: '',
			country: '',
			chat: [],
			cart: [],
			likeMe: [],
		}).catch((err) => {
			alert(err.message);
		});
	};

	const addAuthorData = () => {
		addDoc(collectionRefAuthors, {
			emailId: emailInput.val,
			// id: authors.length + 1,
			id: new Date().toISOString(),
			title: nameInput.val,
			mail: emailInput.val,
			tel: Number(telInput.val),
			password: passwordInput.val,
			user: 'authors',
			// user: checkedAuthor.val ? authorInput : clientInput,
			dateOfRegister: new Date().toLocaleString(),
			facebook: '',
			insta: '',
			image: '',
			city: '',
			country: '',
			chat: [],
			works: [],
			quote: '',
			biography: [],
			rating: 5,
			cite: '',
			info: [],
			feedBack: [],
			cart: [],
			likeMe: [],
		}).catch((err) => {
			alert(err.message);
		});
	};

	const clickSignIn = (e) => {
		e.preventDefault();

		setFormIsValid(true);

		if (emailInput.val === '' || !emailInput.val.includes('@')) {
			setEmailInput({ val: '', isValid: false, existEmail: false });
			setFormIsValid(false);
		}

		if (passwordInput.val === '') {
			setPasswordInput({ val: '', isValid: false, wrongPass: false });
			setFormIsValid(false);
		}

		if (!formIsValid) return;

		if ((emailInput.val !== '' || emailInput.val.includes('@')) && passwordInput.val !== '') {
			signInWithEmailAndPassword(auth, emailInput.val, passwordInput.val)
				.then(
					setEmailInput({ val: emailInput.val, isValid: true, existEmail: false }),
					setPasswordInput({ val: passwordInput.val, isValid: true, wrongPass: false }),
					dispatch(setShowModal(false)),
					cleanInputs()
				)
				.catch(() => {
					dispatch(setShowModal(true));
					setEmailInput({ val: emailInput.val, isValid: false, existEmail: true });
					setPasswordInput({ val: passwordInput.val, isValid: true, wrongPass: true });
				});
		}
	};

	const modalContentProps = {
		nameInput,
		setNameInput,
		clientInput,
		setClientInput,
		authorInput,
		setAuthorInput,
		telInput,
		setTelInput,
		emailInput,
		setEmailInput,
		passwordInput,
		setPasswordInput,
		doublePasswordInput,
		setDoublePasswordInput,
		checkedAuthor,
		setCheckedAuthor,
		checkedClient,
		setCheckedClient,
		doublePasswordRef,
		emailRef,
		clickOnRegister,
		clickSignIn,
		showPassword,
		setShowPassword,
		checkedAgree,
		setCheckedAgree,
		setShowModal
	};

	return (
		<Dialog
			className="modal"
			open={showModal}
			TransitionComponent={Transition}
			keepMounted
			onClose={onCloseModal}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogContent>
				<div className="modal__box">
					<Logo img={logo} width={'150'} height={'45'} />
				</div>
				<ModalSwitchContentBtns cleanInputs={cleanInputs} />
				<ModalContent props={modalContentProps} />
				<button className='modal__btn btn btn--red' onClick={onCloseModal}>Close</button>
			</DialogContent>
		</Dialog>
	)
});

export default Modal;
