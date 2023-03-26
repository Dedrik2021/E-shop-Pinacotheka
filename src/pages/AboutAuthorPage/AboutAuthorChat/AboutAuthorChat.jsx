import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useState, memo } from 'react';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';

import TextareaForm from '../../../components/TextareaForm/TextareaForm';
import MessageCard from '../../../components/MessageCard/MessageCard';
import Pagination from '../../../components/Pagination/Pagination';
import ReviewsSkeleton from '../../../skeletons/reviewsSkeleton';

import { fetchAuthorsData } from '../../../redux/modules/authors/authorsThunks';
import { fetchUsersData } from '../../../redux/modules/users/usersThunks';
import { Status } from '../../../utils/status/status';
import { database } from '../../../firebase/firebaseConfig';

import './aboutAuthorChat.scss';

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
		setLoading
    } = props

    const dispatch = useDispatch()
	const [messageInput, setMessageInput] = useState({ val: '', isValid: true });
	const [validForm, setValidForm] = useState(true);

	const { foundUser } = useSelector((state) => state.usersSlice);

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
		
		if (messageInput.val !== '' && foundUser.emailId !== authorInfo.emailId) {
			// setLoading(true)

			const newAuthorMessage = {
				id: new Date().toISOString(),
				name: foundUser.title,
				avatar: foundUser.image,
				rating: 0,
                userInit: foundUser.emailId,
				date: new Date().toLocaleDateString(),
				message: messageInput.val,
				timeToSend: new Date().toLocaleTimeString(),
			};

			const newUserMessage = {
				id: new Date().toISOString(),
				name: foundUser.title,
				avatar: foundUser.image,
                authorInit: authorInfo.emailId,
				rating: 0,
				date: new Date().toLocaleDateString(),
				message: messageInput.val,
				timeToSend: new Date().toLocaleTimeString(),
			};

			// setReverseMessages([newMessage, ...reverseMessages]);

			const collectionReffAuthor = doc(database, 'authors', authorInfo.ID);
			const collectionReffUser = doc(database, foundUser.user === 'author' ? 'authors' : 'users', foundUser.ID);

			updateDoc(collectionReffAuthor, {
				chat: arrayUnion(newAuthorMessage)
			})
				.then(setMessageInput({ val: '', isValid: true }))
				// .then(setLastLimit(10))
				.catch((error) => {
					console.log(error.message);
				});

				setTimeout(() => {
					dispatch(fetchAuthorsData());
				}, 700);
				// setTimeout(() => {
				// 	setLoading(false);
				// }, 1100);

			updateDoc(collectionReffUser, {
				chat: arrayUnion(newUserMessage)
			})
				.then(setMessageInput({ val: '', isValid: true }))
				// .then(setLastLimit(10))
				.catch((error) => {
					console.log(error.message);
				});

				setTimeout(() => {
					dispatch(fetchUsersData());
				}, 700);
                // setTimeout(() => {
                //     setLoading(false);
                // }, 1100);
            }
	};

    // console.log(foundUser.chat.filter(item => item.authorInit === authorInfo.emailId));
    const chatContent = authorInfo !== undefined && foundUser && foundUser.chat.filter(item => item.authorInit === authorInfo.emailId)

	return (
		<>
			<Helmet>
				<meta name="description" content={`${authorInfo && authorInfo.title} Chat`} />
				<title>{`${authorInfo && authorInfo.title} | Chat`}</title>
			</Helmet>
			<section className="about-author-chat">
				<span className="sr-only">Chat</span>
				<h1 className="title about-author-chat__title">Chat</h1>

				<ul className="reviews__list">
					{authorsDataStatus === Status.SUCCESS && !loading
						? chatContent &&
						  chatContent.map((item, i) => {
								return (
									<MessageCard
										key={i}
										message={item}
										switchBtn={switchBtn}
										clickRemoveMessage={onDeleteMessage}
									/>
								);
						  })
						: [
								...new Array(authorInfo && authorInfo.chat.length).slice(
									limitStart,
									limitLast,
								),
						  ].map((_, i) => <ReviewsSkeleton key={i} />)}
				</ul>

				<form className="reviews__form" onSubmit={(e) => addMessage(e)} >
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
