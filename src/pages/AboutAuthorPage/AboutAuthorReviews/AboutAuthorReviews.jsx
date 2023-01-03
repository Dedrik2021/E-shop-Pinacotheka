import React, { memo, useState, useMemo, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import MessageCard from '../../../components/MessageCard/MessageCard';
import PaintingAttention from '../../../components/PaintingAttention/PaintingAttention';
import Pagination from '../../../components/Pagination/Pagination';
import ReviewsSkeleton from '../../../skeletons/reviewsSkeleton';

import { database } from '../../../firebase/firebaseConfig';
import { Status } from '../../../utils/status/status';

import './aboutAuthorReviews.scss';

const AboutAuthorReviews = memo((props) => {
	const {authorInfo, switchBtn, authorsDataStatus, setDataSelected, setLimitLast, limitLast, limitStart, dataSelected, dataLength, loading} = props

	const auth = getAuth();
	const dispatch = useDispatch();

	const [deleteItem, setDeleteItem] = useState(false);
	const [itemId, setItemId] = useState();

	const onUserLink = (userInfo) => {
		const docToUpdate = doc(database, 'showUserInfo', 'IezwG0ZPPzWGDNIxTiUI');
		updateDoc(docToUpdate, {
			user: userInfo,
		}).catch((err) => {
			alert(err.message);
		});
	};

	const onDeleteMessage = (id) => {
		const collectionReff = doc(database, 'authors', authorInfo.ID);
		const docToDelete = authorInfo.feedBack.find((item) => item.id == id);

		if (window.confirm('Do you want to delite this message? Are you sure?')) {
			updateDoc(collectionReff, {
				feedBack: arrayRemove(docToDelete),
			});
		}
	};

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 10);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 10);
		}
	};

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={
						switchBtn
							? `Kunden-Feedback ${authorInfo.title}`
							: `Customer Feedback ${authorInfo.title}`
					}
				/>
				<title>
					{switchBtn
						? `Kunden-Feedback ${authorInfo.title}`
						: `Customer Feedback ${authorInfo.title}`}
				</title>
			</Helmet>
			<section className="authors-reviews">
				<span className="sr-only">
					{switchBtn ? 'Kunden-Feedback' : 'Customer Feedback'}
				</span>
				{authorInfo.feedBack.length > 0 ? (
					<>
						<ul className="reviews__list">
							{authorsDataStatus === Status.SUCCESS
								? authorInfo &&
								authorInfo.feedBack.slice(limitStart, limitLast).map((item, i) => {
										return (
											<MessageCard
												key={i}
												message={item}
												switchBtn={switchBtn}
												setItemId={setItemId}
												itemId={itemId}
											/>
										);
								})
								: [...new Array(authorInfo.feedBack.length).slice(limitStart, limitLast)].map((_, i) => (
										<ReviewsSkeleton key={i} />
								))}
						</ul>
						<Pagination
							pageChange={onCurrentPage}
							pageCount={dataLength}
							dataSelected={dataSelected}
						/>
					</>
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
