import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import UserAccountInfo from './UserAccountInfo/UserAccountInfo';
import unknowImg from '../../assets/images/unknow-photo.png';
import MessageCard from '../../components/MessageCard/MessageCard';
import TextareaForm from '../../components/TextareaForm/TextareaForm';
import { database } from '../../firebase/firebaseConfig';
import PaintingAttention from '../../components/PaintingAttention/PaintingAttention';
import ReviewsSkeleton from '../../skeletons/reviewsSkeleton';
import { Status } from '../../utils/status/status';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { setAboutAuthorSwitchContentBtn } from '../../redux/modules/authors/authorsSlice';

import './userAccountPage.scss';

const UserAccount = () => {
	const dispatch = useDispatch();
	const [previousChats, setPreviousChats] = useState([]);
	const [messageInput, setMessageInput] = useState({ val: '', isValid: true });
	const [validForm, setValidForm] = useState(true);
	const [userChatId, setUserChatId] = useState(null);
	const [loading, setLoading] = useState(false);

	const { authorsData, authorsDataStatus, aboutAuthorSwitchContentBtn } = useSelector(
		(state) => state.authorsSlice,
	);
	const { foundUser, usersData, usersDataStatus } = useSelector((state) => state.usersSlice);

	const data = [...authorsData, ...usersData];

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	const officeBtns = [
		{ id: 0, title: switchBtn ? 'Indentität der Person' : 'Personal Office' },
		{ id: 1, title: switchBtn ? 'Korb' : 'My Cart' },
		{ id: 2, title: switchBtn ? 'Bewertungen' : 'I Like It' },
		{ id: 3, title: userChatId ? 'Back' : 'Chat' },
	];

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 15);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	const clickOnAuthorInfoBtn = (id) => {
		if (userChatId) {
			setUserChatId(null);
		}
		dispatch(setAboutAuthorSwitchContentBtn(id));
	};

	const filteringChat = Array.from(
		new Set(foundUser && foundUser.chat.map((chat) => chat.chatId)),
	);

	const filteredUserChat =
		foundUser && foundUser.chat.filter((chat) => chat.chatId === userChatId);

	const getChatItems = (chat) => {
		const chatId = foundUser && foundUser.chat.find((el) => el.chatId === chat);
		return chatId;
	};

	const chatik = foundUser && [...filteredUserChat, ...previousChats];
	const filteringChatik = foundUser && chatik.filter((item) => item.chatId === userChatId);
	
	useEffect(() => {
		setPreviousChats(filteringChatik ? filteringChatik : [])
	}, [])

	console.log(previousChats);

	const onDeleteMessage = (id) => {
		console.log('ondelete', id);
		// setLoading(true);
		// const collectionChatReff = doc(database, 'authors', userChatId);
		// const docToDeleteMessage = filteringChatik.find((item) => item.id === id);

		// const collectionUserReff = doc(
		// 	database,
		// 	foundUser && foundUser.user === 'author' ? 'authors' : 'users',
		// 	foundUser.ID,
		// );
		// const docToDeleteUserMessage = filteringChatik.find((item) => item.id === id);

		setPreviousChats((prevChat) => prevChat.filter((item) => item.id !== id));

		// if (window.confirm('Do you want to delite this message? Are you sure?')) {
		// 	updateDoc(collectionChatReff, {
		// 		chat: arrayRemove(docToDeleteMessage),
		// 	});

		// 	updateDoc(collectionUserReff, {
		// 		chat: arrayRemove(docToDeleteUserMessage),
		// 	});

		// 	setTimeout(() => {
		// 		setLoading(false);
		// 	}, 100);
		// }
	};

	const clickToOpenUserChat = (id) => {
		setUserChatId(id);
		console.log('clickToOpenUserChat', id);
	};

	const validateForm = () => {
		setValidForm(true);

		if (messageInput.val === '') {
			setMessageInput({ val: '', isValid: false });
			setValidForm(false);
		}
	};

	const addMessage = (e) => {
		e.preventDefault();
		validateForm();
		if (!validForm) return;

		if (messageInput.val !== '') {
			const newUserMessage = {
				id: new Date().toISOString(),
				name: { user: foundUser.title, author: getChatItems(userChatId).name.author },
				avatar: foundUser.image,
				userInit: {
					user: foundUser.emailId,
					author: getChatItems(userChatId).userInit.author,
				},
				chatId: userChatId,
				rating: 0,
				date: new Date().toLocaleDateString(),
				message: messageInput.val,
				timeToSend: new Date().toLocaleTimeString(),
				dateFilter: new Date().toISOString(),
			};
			setPreviousChats((prevChat) => [...prevChat, newUserMessage]);

			const collectionWriterReff = doc(
				database,
				data.find((el) => el.ID === userChatId).user === 'user' ? 'users' : 'authors',
				userChatId,
			);
			const collectionUserReff = doc(
				database,
				foundUser.user === 'author' ? 'authors' : 'users',
				foundUser.ID,
			);

			updateDoc(collectionUserReff, {
				chat: arrayUnion(newUserMessage),
			})
				.then(setMessageInput({ val: '', isValid: true }))
				.catch((error) => {
					console.error(error.message);
				});

			updateDoc(collectionWriterReff, {
				chat: arrayUnion(newUserMessage),
			})
				.then(setMessageInput({ val: '', isValid: true }))
				.catch((error) => {
					console.error(error.message);
				});
		}
	};

	const showContent = () => {
		switch (aboutAuthorSwitchContentBtn) {
			case 0:
				return <UserAccountInfo />;
			case 1:
				return 2;
			case 2:
				return 3;
			case 3:
				return (
					<section className="messanger">
						<h1 className="messanger__title title">
							{userChatId
								? getChatItems(userChatId).name.user === foundUser.title
									? 'Chat with ' + getChatItems(userChatId).name.author
									: 'Chat with ' + getChatItems(userChatId).name.user
								: 'Chat'}
						</h1>
						{filteringChat.length > 0 ? (
							authorsDataStatus === Status.SUCCESS ||
							usersDataStatus === Status.SUCCESS ? (
								<ul className={userChatId ? 'reviews__list' : 'messanger__list'}>
									{userChatId
										? previousChats.map((message, i) => {
												return foundUser.title === message.name.user ? (
													<MessageCard
														message={message}
														key={i}
														switchBtn={switchBtn}
														clickRemoveMessage={() =>
															onDeleteMessage(message.id)
														}
														foundUser={foundUser}
														styles={{
															width: '48%',
															marginLeft: 'auto',
														}}
													/>
												) : (
													<MessageCard
														message={message}
														key={i}
														switchBtn={switchBtn}
														clickRemoveMessage={() => onDeleteMessage(message.id)}
														foundUser={foundUser}
														styles={{ width: '48%' }}
													/>
												);
										  })
										: filteringChat.map((chat) => {
												return (
													<li
														key={chat}
														className="messanger__item"
														onClick={() =>
															clickToOpenUserChat(
																getChatItems(chat).chatId,
															)
														}
													>
														<article>
															<div className="messanger__info">
																<div className="messanger__avatar-name">
																	<img
																		src={
																			getChatItems(chat)
																				.avatar !== ''
																				? getChatItems(chat)
																						.avatar
																				: unknowImg
																		}
																		className="messanger__avatar"
																		width={100}
																		height={100}
																		alt="avatar"
																	/>

																	<h2>
																		{getChatItems(chat).name
																			.user ===
																		foundUser.title
																			? getChatItems(chat)
																					.name.author
																			: getChatItems(chat)
																					.name.user}
																	</h2>
																</div>
																<div className="messanger__date">
																	<span>
																		{getChatItems(chat).date}
																	</span>
																	/
																	<span>
																		{
																			getChatItems(chat)
																				.timeToSend
																		}
																	</span>
																</div>
															</div>
														</article>
													</li>
												);
										  })}
								</ul>
							) : (
								[...new Array(5)].map((_, i) => <ReviewsSkeleton key={i} />)
							)
						) : (
							(usersDataStatus === Status.SUCCESS ||
								authorsDataStatus === Status.SUCCESS) && (
								<PaintingAttention
									title="No messages"
									attention1="Here is no messages yet."
									marginTop="0"
								/>
							)
						)}
						{userChatId && (
							<form className="reviews__form" onSubmit={(e) => addMessage(e)}>
								<TextareaForm
									id="message"
									textareaValue={messageInput}
									setTextareaValue={setMessageInput}
									type="text"
									placeholder="Type Your Comment"
									name="textarea-message"
									message="The Text field should not be empty!"
									labelName="Chat"
									styleArea={{
										height: '150px',
										marginBottom: messageInput.isValid ? '25px' : '0px',
										width: '99.5%',
										padding: '15px 30px 15px 15px',
									}}
								/>
								<button className="reviews__btn btn btn--red" type="submit">
									Send message
								</button>
							</form>
						)}
					</section>
				);
			default:
				return 1;
		}
	};

	return (
		<div className="container">
			<BreadCrumbs />
			<div className="user-account">
				<div className="user-account__inner">
					<div className="user-account__aside">
						<ul className="btns">
							{officeBtns.map(({ id, title }) => {
								return (
									<li className="btns__item" key={id}>
										<button
											style={{
												pointerEvents: userChatId && 'visible',
											}}
											className={`btns__btn btn btn--red btn--universal ${
												aboutAuthorSwitchContentBtn === id
													? 'btn--active'
													: ''
											}`}
											type="button"
											onClick={() => clickOnAuthorInfoBtn(id)}
										>
											{title}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="user-account__info">{showContent()}</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
