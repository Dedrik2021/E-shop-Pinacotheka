import React, { memo, useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import MessageCard from '../../../components/MessageCard/MessageCard';
import PaintingAttention from '../../../components/PaintingAttention/PaintingAttention';
import Pagination from '../../../components/Pagination/Pagination';
import ReviewsSkeleton from '../../../skeletons/reviewsSkeleton';
import TextareaForm from '../../../components/TextareaForm/TextareaForm';

import { database } from '../../../firebase/firebaseConfig';
import { Status } from '../../../utils/status/status';
import { fetchAuthorsData } from '../../../redux/modules/authors/authorsThunks';

import './aboutAuthorReviews.scss';

const AboutAuthorReviews = memo((props) => {
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
	} = props;

	const dispatch = useDispatch()

	const [messageInput, setMessageInput] = useState({ val: '', isValid: true });
	const [validForm, setValidForm] = useState(true);

	const { foundUser } = useSelector((state) => state.usersSlice)

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 10);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 10);
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
			setLoading(true)
			const newMessage = {
				id: new Date().toISOString(),
				// initialID: painting.id,
				name: foundUser.title,
				avatar: foundUser.image,
				rating: 0,
				date: new Date().toLocaleDateString(),
				message: messageInput.val,
				timeToSend: new Date().toLocaleTimeString(),
			};

			// setReverseMessages([newMessage, ...reverseMessages]);

			const collectionReff = doc(database, 'authors', authorInfo.ID);

			updateDoc(collectionReff, {
				feedBack: arrayUnion(newMessage)
			})
				.then(setMessageInput({ val: '', isValid: true }))
				// .then(setLastLimit(10))
				.catch((error) => {
					console.log(error.message);
				});

				setTimeout(() => {
					dispatch(fetchAuthorsData());
				}, 700);
				setTimeout(() => {
					setLoading(false);
				}, 1100);
		}
	};

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={
						switchBtn
							? `Kunden-Feedback ${authorInfo && authorInfo.title} | Reviews`
							: `Customer Feedback ${authorInfo && authorInfo.title} | Reviews`
					}
				/>
				<title>
					{switchBtn
						? `${authorInfo && authorInfo.title} | Reviews`
						: `${authorInfo && authorInfo.title} | Reviews`}
				</title>
			</Helmet>
			<section className="authors-reviews">
				<span className="sr-only">
					{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}
				</span>
				<h1 className='title authors-reviews__title'>Reviews</h1>
				{authorInfo && authorInfo.feedBack.length > 0 ? (
					<>
						<ul className="reviews__list">
							{authorsDataStatus === Status.SUCCESS && !loading
								? authorInfo &&
								  authorInfo.feedBack
										.slice(limitStart, limitLast)
										.map((item, i) => {
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
										...new Array(authorInfo.feedBack.length).slice(
											limitStart,
											limitLast,
										),
								  ].map((_, i) => <ReviewsSkeleton key={i} />)}
						</ul>
						<Pagination
							pageChange={onCurrentPage}
							pageCount={dataLength}
							dataSelected={dataSelected}
						/>
						<form className="reviews__form" onSubmit={(e) => addReview(e)}>
							<TextareaForm
								id="message"
								textareaValue={messageInput}
								setTextareaValue={setMessageInput}
								type="text"
								placeholder="Type Your Comment"
								name="textarea-message"
								message="The Text field should not be empty!"
								labelName="Review"
								styleArea={{
									height: '150px',
									marginBottom: messageInput.isValid ? '25px' : '0px',
									width: '99.5%',
									padding: '15px 30px 15px 15px',
								}}
							/>
							<button className="reviews__btn btn btn--red" type="submit">
							Leave a review
							</button>
						</form>
					</>
				) : loading ? (
					[
						...new Array(
							authorInfo !== undefined
								? authorInfo && authorInfo.feedBack.length
								: 10,
						).slice(limitStart, limitLast),
					].map((_, i) => <ReviewsSkeleton key={i} />)
				) : (
					<PaintingAttention
						title="No reviews"
						attention1="We are very sorry!"
						attention2="This author has no reviews yet."
						marginTop="-60px"
					/>
				)}
			</section>
		</>
	);
});

export default AboutAuthorReviews;
