import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';

import { setPaintingWatched, setAboutAuthorSwitchContentBtn } from '../../../redux/modules/authors/authorsSlice';

import { realDb } from '../../../firebase/firebaseConfig';

const AuthorCardContent = memo((props) => {
	const { switchBtn, item, unknowImg, foundUser, user, breadCrumbsTitle } = props;
	const dispatch = useDispatch()
	const { paintingWatched, authorsData } = useSelector((state) => state.authorsSlice);

	const clickOnPainting = (work) => {
		const filteredPainting = paintingWatched.filter(item => item.img !== work.img)
		dispatch(setPaintingWatched([work, ...filteredPainting]))
		const docToUpdates = ref(realDb, `singlePainting`);
		update(docToUpdates, {
			authorEmailId: work.emailId,
		}).catch((err) => {
			alert(err.message);
		});
	}

	const linkToAuthor = 
		user !== null && foundUser !== undefined && foundUser.emailId === item.emailId
			? '/PersonalOffice'
			: `/Authors/AuthorInfo/${item.id}`

	const allAuthorsWorksLink = (emailId) => {
		const author = authorsData.find(el => el.emailId === emailId)
		return author.id
	}

	return (
		<li className="authors__item" style={{ height: breadCrumbsTitle === 'Authors' ? '250px' : '' }}>
			<article className="author-card" style={{ maxWidth: breadCrumbsTitle === 'Authors' ? '825px' : '122px', width: breadCrumbsTitle === 'Authors' && '100%'}}>
				<Link
					className="author-card__img-link"
					to={linkToAuthor}
					onClick={() => dispatch(setAboutAuthorSwitchContentBtn(0))}
				>
					<img
						src={item.image !== '' ? item.image : unknowImg}
						alt={item.title}
						width="122"
						height={breadCrumbsTitle === 'Authors' ? '210' : '125'}
					/>
					<span
						className={`author-card__online ${
							user !== null &&
							foundUser !== undefined &&
							item.emailId === foundUser.emailId &&
							foundUser !== null &&
							item.emailId === foundUser.emailId
								? 'active'
								: ''
						}`}
					></span>
				</Link>
				<div className="author-card__box" style={{ textAlign: 'center', width: '100%' }}>
					<Link
						className="author-card__link"
						to={linkToAuthor}
						onClick={() => dispatch(setAboutAuthorSwitchContentBtn(0))}
					>
						<h2 className="author-card__user">{item.title}</h2>
					</Link>
					{(breadCrumbsTitle === 'Authors' || breadCrumbsTitle === 'Author') && (
						<>
							<div className="author-card__rating">
								<div className="author-card__stars"></div>
								<span>rating</span>
							</div>
							<div className="author-card__wrapper">
								<Link
									className="author-card__portfolio author-card__portfolio--reviews"
									style={{ pointerEvents: item.feedBack.length === 0 && 'none' }}
									onClick={() => dispatch(setAboutAuthorSwitchContentBtn(2))}
									to={linkToAuthor}
								>
									<span>{item.feedBack.length}</span>
								</Link>
								<Link
									className="author-card__portfolio"
									onClick={() => dispatch(setAboutAuthorSwitchContentBtn(1))}
									style={{ pointerEvents: item.works.length === 0 && 'none' }}
									to={linkToAuthor}
								>
									<span>{item.works.length}</span>
								</Link>
							</div>
							<ul className="author-painting">
								{item.works.length > 0 ? (
									item.works.slice(0, 5).map((work) => {
										return (
											<li className="author-painting__item" key={work.id}>
												<Link
													className="author-painting__link"
													to={`/SinglePainting/${work.id}`}
													onClick={() => clickOnPainting(work)}
												>
													<img
														src={work.img}
														alt={work.title}
														height="92"
														width="92"
													/>
												</Link>
											</li>
										);
									})
								) : (
									<p>
										{switchBtn
											? 'Dieser Autor hat noch keine Werke.'
											: 'This author has no works yet.'}
									</p>
								)}
								{item.works.length > 0 && (
									<li className="author-painting__item">
										<Link
											className="author-painting__link"
											onClick={() => dispatch(setAboutAuthorSwitchContentBtn(1))}
											to={`/Authors/AuthorInfo/${allAuthorsWorksLink(item.emailId)}`}
											
										>
											{switchBtn ? 'Alle Werke ansehen' : 'View all works'}
										</Link>
									</li>
								)}
							</ul>
						</>
					)}
				</div>
			</article>
		</li>
	);
});

export default AuthorCardContent;
