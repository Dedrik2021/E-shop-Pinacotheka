import { memo, useState } from 'react';
import Helmet from 'react-helmet';

import unknownImage from '../../../assets/images/unknow-photo.png';

import './authorsBio.scss';

const AuthorsBio = memo((props) => {
	const { authorInfo, switchBtn, dispatch, setAboutAuthorSwitchContentBtn } = props;

	const elTel = authorInfo ? authorInfo.tel.substring(1) : '';
	const phone = elTel.replace(/\s+/g, '');

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={
						switchBtn
							? `Informationen über ${authorInfo.title}`
							: `Information about ${authorInfo.title}`
					}
				/>
				<title>
					{switchBtn
						? `Informationen über ${authorInfo.title}`
						: `Information about ${authorInfo.title}`}
				</title>
			</Helmet>
			<section className="authors-bio">
				<h1 className="sr-only">
					{switchBtn ? 'Biographie das Autors' : 'Biography of the author'}
				</h1>
				<div className="authors-bio__content">
					<div className="authors-bio__inner">
						<div className="authors-bio__img-wrapper">
							<div className="authors-bio__img-box">
								<img
									className="authors-bio__img"
									src={
										authorInfo && authorInfo.image !== ''
											? authorInfo.image
											: authorInfo && unknownImage
									}
									alt={authorInfo && authorInfo.title}
								/>
								<img
									className="authors-bio__img authors-bio__img--blur"
									src={
										authorInfo && authorInfo.image !== ''
											? authorInfo.image
											: authorInfo && unknownImage
									}
									alt={authorInfo && authorInfo.title}
								/>
							</div>
							<button
								type="button"
								className="authors-bio__btn btn btn--universal btn--red"
								// onClick={() => dispatch(setModal(true))}
							>
								{switchBtn ? 'Feedback hinterlassen' : 'Leave feedback'}
							</button>
						</div>
						<div className="authors-bio__content-box">
							<span className="authors-bio__author-name">{authorInfo && authorInfo.title}</span>
							<div className="authors-bio__box">
								<div className="authors-bio__box-wrapper">
									<span className="authors-bio__name">
										{authorInfo ? authorInfo.name : '-- -- -- --'}
									</span>
									<span className="authors-bio__span">
										<button
											type="button"
											className="authors-bio__btn btn btn--red btn--universal"
											onClick={() =>
												dispatch(setAboutAuthorSwitchContentBtn(2))
											}
										>
											<span>{switchBtn ? 'Bewertungen' : 'Review'}: </span>
											<span>{authorInfo && authorInfo.feedBack.length}</span>
										</button>
									</span>
									<span className="authors-bio__span">
										<button
											type="button"
											className=" authors-bio__btn btn btn--red btn--universal"
											onClick={() =>
												dispatch(setAboutAuthorSwitchContentBtn(1))
											}
										>
											<span>
												{switchBtn ? 'Gesamtarbeiten' : 'Overall works'}:{' '}
											</span>
											<span>{authorInfo && authorInfo.works.length}</span>
										</button>
									</span>
								</div>
								<div className="authors-bio__box-wrapper">
									<span className="authors-bio__item">
										<a className="authors-bio__link" href={`tel: ${phone}`}>
											<span>Tel:</span>
											{authorInfo ? authorInfo.tel : '-//--//--//--'}
										</a>
									</span>
									<span className="authors-bio__item">
										<a
											className="authors-bio__link"
											href={`mailto:${authorInfo && authorInfo.mail}`}
										>
											<span>Email:</span>
											{authorInfo ? authorInfo.mail : '-//--//--//--'}
										</a>
									</span>
									<span className="authors-bio__item">
										<a
											className="authors-bio__link"
											href={authorInfo && authorInfo.facebook}
										>
											<span>Facebook:</span>
											{authorInfo && authorInfo.facebook !== ''
												? authorInfo.facebook
												: '-//--//--//--'}
										</a>
									</span>
									<span className="authors-bio__item">
										<a
											className="authors-bio__link"
											href={authorInfo && authorInfo.insta}
										>
											<span>Instagram:</span>
											{authorInfo && authorInfo.insta !== ''
												? authorInfo.insta
												: '-//--//--//--'}
										</a>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="authors-bio__wrapper">
						<blockquote>
							<p>{`${authorInfo && authorInfo.quote && authorInfo.quote}`}</p>
							<cite>{authorInfo && authorInfo.quote && authorInfo.name}</cite>
						</blockquote>
						{authorInfo && authorInfo.info.length > 0 && (
							<h2 className="title">{switchBtn ? 'Über mich' : 'About me'}</h2>
						)}
						{authorInfo &&
							authorInfo.info.map((item, i) => {
								return <p key={i}>{item}</p>;
							})}
					</div>
				</div>
			</section>
		</>
	);
});

export default AuthorsBio;
