import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import SinglePaintingDetails from './SinglePaintingDetails/SinglePaintingDetails';
import SinglePaintingAuthorInfo from './SinglePaintingAuthorInfo/SinglePaintingAuthorInfo';
import SinglePaintingGallerySection from './SinglePaintingGallerySection/SinglePaintingGallerySection';

import SinglePaintingSkeleton from '../../skeletons/singlePaintingSkeleton';

import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';
import { Status } from '../../utils/status/status';

import { realDb } from '../../firebase/firebaseConfig';

import './singlePaintingPage.scss';

const SinglePaintingPage = () => {
	const { id } = useParams();
	const auth = getAuth();
	const dispatch = useDispatch();
	const [filterBtn, setFilterBtn] = useState(0);
	const [authorsEmailId, setAuthorsEmailId] = useState('');

	const [authorsWorksDataSelected, setAuthorsWorksDataSelected] = useState(1);
	const [authorsWorksDataLength, setAuthorsWorksDataLength] = useState(0);
	const [authorsWorksLimitLast, setAuthorsWorksLimitLast] = useState(6);
	const [authorsWorksLimitStart, setAuthorsWorksLimitStart] = useState(6);

	const [authorsSimilarWorksDataSelected, setAuthorsSimilarWorksDataSelected] = useState(1);
	const [authorsSimilarWorksDataLength, setAuthorsSimilarWorksDataLength] = useState(0);
	const [authorsSimilarWorksLimitLast, setAuthorsSimilarWorksLimitLast] = useState(6);
	const [authorsSimilarWorksLimitStart, setAuthorsSimilarWorksLimitStart] = useState(6);

	const [watchedWorksByAuthorsDataSelected, setWatchedWorksByAuthorsDataSelected] = useState(1);
	const [watchedWorksByAuthorsDataLength, setWatchedWorksByAuthorsDataLength] = useState(0);
	const [watchedWorksByAuthorsLimitLast, setWatchedWorksByAuthorsLimitLast] = useState(6);
	const [watchedWorksByAuthorsLimitStart, setWatchedWorksByAuthorsLimitStart] = useState(6);

	const [loading, setLoading] = useState(false);

	const { authorsData, authorsDataStatus, paintingWatched } = useSelector(
		(state) => state.authorsSlice,
	);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	useEffect(() => {
		window.scroll(0, 0);
		onValue(ref(realDb, 'singlePainting'), (snapshot) => {
			if (snapshot.exists()) {
				setAuthorsEmailId(Object.values(snapshot.val()));
			}
		});
	}, []);

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 22);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	const foundInterestingAuthorsWorks = () => {
		const works = [];
		const paintingsInfo = authorsData.map((item) => item.works);
		for (const i of paintingsInfo) {
			works.push(...i);
		}
		const similarPaintings = works.filter((work) => work.category === painting.category);
		return { similarPaintings };
	};

	const foundPainting = () => {
		const foundAuthor = authorsData.find((author) => author.emailId === authorsEmailId[0]);
		const searchPainting =
			foundAuthor !== undefined && foundAuthor.works.find((work) => work.id == id);
		return searchPainting !== undefined && { searchPainting, foundAuthor };
	};
	const painting = foundPainting().searchPainting;
	const author = foundPainting().foundAuthor;

	useMemo(() => {
		setLoading(true);
		setAuthorsWorksLimitLast(6 * authorsWorksDataSelected);
		setAuthorsWorksLimitStart(authorsWorksLimitLast - 6);

		setAuthorsSimilarWorksLimitLast(6 * authorsSimilarWorksDataSelected);
		setAuthorsSimilarWorksLimitStart(authorsSimilarWorksLimitLast - 6);

		setWatchedWorksByAuthorsLimitLast(6);
		setWatchedWorksByAuthorsLimitStart(0);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [
		authorsWorksDataSelected,
		authorsWorksLimitLast,
		authorsSimilarWorksDataSelected,
		authorsSimilarWorksLimitLast,
	]);

	useEffect(() => {
		setAuthorsWorksDataLength(Math.ceil(author !== undefined && author.works.length / 6));
		setAuthorsSimilarWorksDataLength(
			Math.ceil(
				author !== undefined && foundInterestingAuthorsWorks().similarPaintings.length / 6,
			),
		);
	}, [author, paintingWatched]);

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? 'Details das Bildes' : 'Details the picture'}
				/>
				<title>{switchBtn ? 'Details das Bildes' : 'Details the picture'}</title>
			</Helmet>
			<div className={`creations-details`}>
				<div className="container">
					<BreadCrumbs />
					{authorsDataStatus === Status.LOADING || authorsDataStatus === Status.ERROR ? (
						<SinglePaintingSkeleton />
					) : (
						<SinglePaintingDetails switchBtn={switchBtn} painting={painting} />
					)}

					<SinglePaintingAuthorInfo
						filterBtn={filterBtn}
						setFilterBtn={setFilterBtn}
						switchBtn={switchBtn}
						painting={painting}
						author={author}
					/>

					<SinglePaintingGallerySection
						switchBtn={switchBtn}
						paintings={author !== undefined && author.works}
						setDataSelected={setAuthorsWorksDataSelected}
						setLimitLast={setAuthorsWorksLimitLast}
						limitLast={authorsWorksLimitLast}
						limitStart={authorsWorksLimitStart}
						dataLength={authorsWorksDataLength}
						dataSelected={authorsWorksDataSelected}
						author={author}
						sectionClassName={'others-creation'}
						sectionAn={'other works by the author'}
						sectionDe={'andere Werke das Autors'}
						title={'others-creation__title'}
					/>
				</div>
				<SinglePaintingGallerySection
					switchBtn={switchBtn}
					author={author}
					paintings={foundInterestingAuthorsWorks().similarPaintings}
					setDataSelected={setAuthorsSimilarWorksDataSelected}
					setLimitLast={setAuthorsSimilarWorksLimitLast}
					limitLast={authorsSimilarWorksLimitLast}
					limitStart={authorsSimilarWorksLimitStart}
					dataLength={authorsSimilarWorksDataLength}
					dataSelected={authorsSimilarWorksDataSelected}
					sectionClassName={'similar-paintings'}
					sectionAn={'Paintings with similar themes'}
					sectionDe={'Gemälde mit ähnlichen Themen'}
					title={'similar-paintings__title'}
				/>
				{paintingWatched.length > 0 && (
					<SinglePaintingGallerySection
						switchBtn={switchBtn}
						paintings={paintingWatched}
						setDataSelected={setWatchedWorksByAuthorsDataSelected}
						setLimitLast={setWatchedWorksByAuthorsLimitLast}
						limitLast={watchedWorksByAuthorsLimitLast}
						limitStart={watchedWorksByAuthorsLimitStart}
						dataLength={watchedWorksByAuthorsDataLength}
						dataSelected={watchedWorksByAuthorsDataSelected}
						author={author}
						sectionClassName={'recent-watched'}
						sectionAn={'recently you watched'}
						sectionDe={'vor kurzem hast du zugeschaut'}
						title={'recent-watched__title'}
					/>
				)}
			</div>
		</>
	);
};

export default SinglePaintingPage;
