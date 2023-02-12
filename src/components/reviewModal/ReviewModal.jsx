import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';

import MessageCard from '../MessageCard/MessageCard';
import TextareaForm from '../TextareaForm/TextareaForm';

import Spinner from '../../spinner/Spinner';
import { Status } from '../../utils/status/status';
import { database } from '../../firebase/firebaseConfig';
import { fetchAuthorsData } from '../../redux/modules/authors/authorsThunks';

import Logo from '../../UI/logo/Logo';
import img from '../../assets/images/logo.svg';
import emptyImg from '../../assets/images/empty-painting.png';

import './reviewModal.scss';

const ReviewModal = (props) => {
	const { openModal, handleClose, painting, author, setIsLoading, isLoading } = props;

	const dispatch = useDispatch();

	const messageRefs = useRef();
	const listRefs = useRef()

	const [reverseMessages, setReverseMessages] = useState(null);
	const [messageIndex, setMessageIndex] = useState(null);
	const [messageInput, setMessageInput] = useState({ val: '', isValid: true });
	const [validForm, setValidForm] = useState(true);
	const [messages, setMessages] = useState([]);
	const [startLimit, setStartLimit] = useState(0);
	const [lastLimit, setLastLimit] = useState(10);

	const { authorsDataStatus } = useSelector((state) => state.authorsSlice);
	const { foundUser } = useSelector((state) => state.usersSlice);

	useEffect(() => {
		setReverseMessages(messages && messages.reverse().splice(startLimit, lastLimit));
	}, [lastLimit, messages, startLimit]);

	useEffect(() => {
		setMessages(
			author !== undefined &&
				author.reviewsWorks.filter((item) => {
					return item.initialID === painting.id;
				}),
		);

	}, [author, painting.id]);

	const clickOpenMessage = (id) => {
		setMessageIndex(id);
		if (messageIndex !== id) {
			setMessageIndex(id);
		} else {
			setMessageIndex(null);
		}
	};

	const validateForm = () => {
		setValidForm(true);

		if (messageInput.val === '') {
			setMessageInput({ val: '', isValid: false });
			setValidForm(false);
		}
	};

	const addReview = (e) => {
		e.preventDefault();
		validateForm();
		if (!validForm) return;

		if (messageInput.val !== '') {
			const newMessage = {
				id: new Date().toISOString(),
				initialID: painting.id,
				name: foundUser.title,
				avatar: foundUser.image,
				rating: 0,
				date: new Date().toLocaleDateString(),
				message: messageInput.val,
				timeToSend: new Date().toLocaleTimeString(),
			};

			setReverseMessages([newMessage, ...reverseMessages]);

			const collectionReff = doc(database, 'authors', author.ID);

			updateDoc(collectionReff, {
				reviewsWorks: arrayUnion(newMessage),
			})
			.then(setMessageInput({ val: '', isValid: true }))
				.then(setLastLimit(10))
				.catch((error) => {
					console.log(error.message);
				});
		}
	};

	const clickOnMoreBtn = () => {
        setIsLoading(true)
		setLastLimit(lastLimit + 10);
		dispatch(fetchAuthorsData());
        setTimeout(() => {
            dispatch(fetchAuthorsData());
        }, 700);
        setTimeout(() => {
            setIsLoading(false)
        }, 1100);
	};

	const clickToRemoveMessage = (id) => {
		setReverseMessages(reverseMessages.filter((item) => item.id !== id));
		const removeMessage = reverseMessages.find((item) => item.id === id);
		const collectionReff = doc(database, 'authors', author.ID);
		updateDoc(collectionReff, {
			reviewsWorks: arrayRemove(removeMessage),
		})
			.catch((error) => {
				console.log(error.message);
			});
	};

    const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 900,
		bgcolor: 'background.paper',
		boxShadow: 24,
	};

	return (
		<div className="reviews">
			<Modal
				open={openModal}
				onClose={() => handleClose(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Logo
						styles={{ paddingTop: '5px', margin: '0 auto', display: 'block' }}
						img={img}
						height={'80'}
						width={'220'}
					/>
					<span className="reviews__title title">Reviews</span>
					{!isLoading && authorsDataStatus === Status.SUCCESS ? (
						reverseMessages && reverseMessages.length > 0 ? (
							<div className="reviews__wrapper" ref={listRefs}>
								<ul className="reviews__list" >
									{reverseMessages &&
										reverseMessages.map((item) => {
											return (
												<MessageCard
													key={item.id}
													message={item}
													setItemId={clickOpenMessage}
													itemId={messageIndex}
													clickRemoveMessage={clickToRemoveMessage}
												/>
											);
										})}
								</ul>
								{reverseMessages && lastLimit === reverseMessages.length && (
									<button
										className="reviews__more-btn btn btn--red"
										type="click"
										onClick={clickOnMoreBtn}
									>
										Show More
									</button>
								)}
							</div>
						) : (
							<div className='reviews__empty'>
								<img
									src={emptyImg}
									alt="No data"
									style={{ height: '420px', width: '570px', transform: 'rotate(5deg)', display: 'block', margin: '0 auto' }}
								/>
                                <span className='reviews__nodata'>No Reviews</span>
							</div>
						)
					) : (
						<Spinner
							styleProps={{
								with: '450px',
								height: '490px',
								objectFit: 'contain',
								position: 'relative',
								padding: '180px 130px',
								display: 'block',
								margin: '0 auto',
							}}
						/>
					)}
					<form className="reviews__form" onSubmit={(e) => addReview(e)}>
						<TextareaForm
							id="message"
							textareaValue={messageInput}
							setTextareaValue={setMessageInput}
							type="text"
							placeholder="Type Your Comment"
							name="textarea-message"
							message="The Text field should not be empty!"
							textareaRef={messageRefs}
							labelName="Message"
							styleArea={{
								height: '150px',
								marginBottom: messageInput.isValid ? '25px' : '0px',
								width: '745px',
                                padding: '15px 30px 15px 15px'
							}}
						/>
						<button className="reviews__btn btn btn--red" type="submit">
							Send Message
						</button>
					</form>
					<button
						className="reviews__close-btn btn btn--red"
						onClick={() => handleClose(false)}
					>
						Close
					</button>
				</Box>
			</Modal>
		</div>
	);
};

export default ReviewModal;
