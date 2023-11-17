import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useState, memo } from 'react';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';

import TextareaForm from '../../../components/TextareaForm/TextareaForm';
import MessageCard from '../../../components/MessageCard/MessageCard';
import ReviewsSkeleton from '../../../skeletons/reviewsSkeleton';
import PaintingAttention from '../../../components/PaintingAttention/PaintingAttention';

import { fetchAuthorsData } from '../../../redux/modules/authors/authorsThunks';
import { fetchUsersData } from '../../../redux/modules/users/usersThunks';
import { Status } from '../../../utils/status/status';
import { database } from '../../../firebase/firebaseConfig';

import './aboutAuthorChat.scss';
import { set } from 'firebase/database';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { useMemo } from 'react';

const AboutAuthorChat = memo((props) => {
	const {
		authorInfo,
		switchBtn,
		authorsDataStatus,
		setDataSelected,
		setLimitLast,
		limitLast,
		limitStart,
		dataSelected,
		dataLength,
		loading,
		onDeleteMessage,
		setLoading,
		setMessages,
		messages,
	} = props;

	const dispatch = useDispatch();
	const [messageInput, setMessageInput] = useState({ val: '', isValid: true });
	const [validForm, setValidForm] = useState(true);

	const { foundUser } = useSelector((state) => state.usersSlice);

	const chatContent =
		authorInfo !== undefined &&
		foundUser &&
		foundUser.chat.filter(
			(item) =>
				item.userInit.user === foundUser.emailId &&
				item.userInit.author === authorInfo.emailId,
		);

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
		setLoading(true);
		if (messageInput.val !== '' && foundUser.emailId !== authorInfo.emailId) {
			const newUserMessage = {
				id: new Date().toISOString(),
				name: { user: foundUser.title, author: authorInfo.title },
				avatar: foundUser.image,
				userInit: { user: foundUser.emailId, author: authorInfo.emailId },
				chatId: foundUser.ID + authorInfo.ID,
				userId: foundUser.ID,
				authorId: authorInfo.ID,
				rating: 0,
				date: new Date().toLocaleDateString(),
				message: messageInput.val,
				timeToSend: new Date().toLocaleTimeString(),
				dateFilter: new Date().toISOString(),
			};

			setMessages((prevMessages) => [...prevMessages, newUserMessage]);

			const collectionReffAuthor = doc(database, 'authors', authorInfo.ID);
			const collectionReffUser = doc(
				database,
				foundUser.user === 'author' ? 'authors' : 'users',
				foundUser.ID,
			);

			updateDoc(collectionReffAuthor, {
				chat: arrayUnion(newUserMessage),
			})
				.then(setMessageInput({ val: '', isValid: true }))
				.catch((error) => {
					console.log(error.message);
				});

			updateDoc(collectionReffUser, {
				chat: arrayUnion(newUserMessage),
			})
				.then(setMessageInput({ val: '', isValid: true }))
				.catch((error) => {
					console.log(error.message);
				});

			setTimeout(() => {
				setLoading(false);
			}, 100);
		}
	};

	return (
		<>
			<Helmet>
				<meta name="description" content={`${authorInfo && authorInfo.title} Chat`} />
				<title>{`${authorInfo && authorInfo.title} | Chat`}</title>
			</Helmet>
			<section className="about-author-chat">
				<span className="sr-only">Chat</span>
				<h1 className="title about-author-chat__title">
					Chat with {authorInfo && authorInfo.title}
				</h1>
				{messages && messages.length > 0 ? (
					loading ? (
						[
							...new Array(
								messages && messages.length
							),
						].map((_, i) => <ReviewsSkeleton key={i} />)
					) : (
						<ul className="reviews__list">
							{chatContent &&
								messages.map((item, i) => {
									return foundUser.title === item.name.user ? (
										<MessageCard
											message={item}
											key={i}
											switchBtn={switchBtn}
											clickRemoveMessage={() => onDeleteMessage(item.id)}
											foundUser={foundUser}
											styles={{ width: '48%', marginLeft: 'auto' }}
										/>
									) : (
										<MessageCard
											message={item}
											key={i}
											switchBtn={switchBtn}
											clickRemoveMessage={() => onDeleteMessage(item.id)}
											foundUser={foundUser}
											styles={{ width: '48%' }}
										/>
									);
								})}
						</ul>
						
					)
				) : messages && messages.length === 0 ? (
					<PaintingAttention
						title="here no messages"
						attention1="Be the first"
						attention2="To write a message"
						marginTop="0px"
					/>
				) : (
					[
						...new Array(
							messages !== undefined && messages.length > 0 ? messages.length : 3,
						),
					].map((_, i) => <ReviewsSkeleton key={i} />)
				)}

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
			</section>
		</>
	);
});

export default AboutAuthorChat;
