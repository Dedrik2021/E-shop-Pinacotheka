import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { setBreadCrumbsTitle } from '../../redux/slices/breadCrumbsSlice';

import { realDb } from '../../firebase/firebaseConfig';

// import PaintingCartInfo from '../components/PaintingCartInfo';
// import PaintingCardBtns from '../components/PaintingCardBtns';
// import PaintingDetailsList from '../components/PaintingDetailsList';
// import SinglePaintingSkeleton from '../../skeletons/singlePaintingSkeleton';
// import {
// 	fetchAuthorInfo,
// 	fetchSinglePainting,
// } from '../../redux/slices/authorsInfosSlice';
// import { setAuthorInfoBtn } from '../../redux/slices/filtersSlice';
// import { database } from '../../firebase/firebaseConfig';

const SinglePaintingPage = () => {
	const {id} = useParams()
	const auth = getAuth()
	const dispatch = useDispatch();
	const [filterBtn, setFilterBtn] = useState(0);
	const [authorEmailId, setAuthorEmailId] = useState('')
	const authorsData = useSelector((state) => state.authorsSlice.authorsData);
    const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	useEffect(() => {
		onValue(ref(realDb, 'singlePainting'), (snapshot) => {
			if (snapshot.exists()) {
				setAuthorEmailId(Object.values(snapshot.val()))
			}
		});
	}, []);

	const foundPainting = () => {
		const foundAuthor = authorsData.find(author => author.emailId === authorEmailId[0])
		const searchPainting = foundAuthor !== undefined && foundAuthor.works.find(work => work.id == id)
		return searchPainting !== undefined && {searchPainting, foundAuthor}
	}
	const painting = foundPainting().searchPainting
	console.log(painting);

	// const [users, setUsers] = useState([])
	// const [authors, setAuthors] = useState([])
	// const [oneLike, setOneLike] = useState()
	// const { singlePainting } = useSelector((state) => state.authorsInfos);
	// const { authorsStatus, modal, authors, singlePainting} = useSelector(state => state.authorsInfos)
	// const {users, foundUser} = useSelector(state => state.user)
	// const authorInfo = authors.find(item => item.id == id)
	// const foundUser = users !== undefined && users.find(item => item.emailId == auth.currentUser.email) 
	// // const foundUser = auth.currentUser && users.find(item => item.emailId == auth.currentUser.email)
	// const authorCli = auth.currentUser && authors.find(item => item.emailId == auth.currentUser.email)
	// const userCli = foundUser !== undefined ? foundUser : authorCli
	// const switchLanguageBtn = useSelector((state) => state.filters.switchLanguageBtn);
	// const switchBtn = switchLanguageBtn[0] === 0
	// const authorsCollectionRef = collection(database, 'authors')
	// const usersCollectionRef = collection(database, 'users')

	// useEffect(() => {
	// 	getDocs(authorsCollectionRef).then((response) => {
	// 		const data = response.docs.map((item) => {
	// 			return { ...item.data(), ID: item.id };
	// 		})
	// 		setAuthors(data)
	// 	});
	// }, [authors])

	// useEffect(() => {
	// 	getDocs(usersCollectionRef).then((response) => {
	// 		const data = response.docs.map((item) => {
	// 			return { ...item.data(), ID: item.id };
	// 		})
	// 		setUsers(data)
	// 	});
	// }, [users])

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 22);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// 	dispatch(fetchSinglePainting());
	// 	dispatch(fetchAuthorInfo({ authorId: id }));
	// }, []);

	// if (authorsStatus === 'loading' || authorsStatus === 'error') {
	// 	return (
	// 		<div className="container">
	// 			<SinglePaintingSkeleton />
	// 		</div>
	// 	);
	// }

	// const elements = authorInfo && authorInfo.works.map((item) => {
	// 	if (item.id === singlePainting.painting) {
	// 		return (
	// 			<div key={item.id}>
	// 				<section className="creations-details__info">
	// 					<h2 className="sr-only">Einzelheiten</h2>
	// 					<PaintingCartInfo 
	// 						{...item} 
	// 						authorInfo={authorInfo} 
	// 						authorId={id} 
	// 						dispatch={dispatch}
	// 						setAuthorInfoBtn={setAuthorInfoBtn}
	// 						userCli={userCli}
	// 						userInfo={foundUser}
	// 						/>
	// 				</section>
	// 				<section className="creations-details__tabs">
	// 					<h2 className="sr-only">Besonderheiten</h2>
	// 					<PaintingCardBtns filterBtn={filterBtn} setFilterBtn={setFilterBtn} />
	// 					<PaintingDetailsList item={item} filterBtn={filterBtn} painting={authorInfo} />
	// 				</section>
	// 			</div>
	// 		);
	// 	}
	// });

	return (
		<>
			<Helmet>
				<meta name="description" content={switchBtn ? 'Details das Bildes' : 'Details the picture'} />
				<title>
					{switchBtn ? 'Details das Bildes' : 'Details the picture'}
				</title>
			</Helmet>
			<div className={`creations-details`}>
				<div className="container">
					<BreadCrumbs />

					{/* {elements} */}

					<section className="others-creation">
						<h2 className="others-creation__title title">
							{switchBtn ? 'andere Werke das Autors' : 'other works by the author'}
						</h2>
						<ul className="others-creation__list cards-list">
							<li className="others-creation__item">
								{/* @@include('./parts/components/_painting-card.html', {
                            "creations": false,
                            "gallery": true,
                            "image-url": "images/content/painting-card-1.jpg",
                            "alt": "Timeo danaos et donna fere...",
                            "title": "Timeo danaos et donna fere...",
                            "name": "Carla Sá Fernandes",
                            "material": "Acryl auf Leinwand (50x50zm)",
                            "price": "1 010"
                        }) */}
							</li>
						</ul>
					</section>
				</div>
				<section className="similar-paintings">
					<div className="container">
						<h2 className="similar-paintings__title title">
							{switchBtn ? 'Gemälde mit ähnlichen Themen' : 'Paintings with similar themes'}
						</h2>
						<ul className="similar-paintings__list cards-list">
							<li className="similar-paintings__item">
								{/* @@include('./parts/components/_painting-card.html', {
                            "creations": false,
                            "gallery": true,
                            "image-url": "images/content/painting-card-12.jpg",
                            "alt": "Tableau 2 novembre 16",
                            "title": "Tableau 2 novembre 16",
                            "name": "Marcello Carrozzini",
                            "material": "Acryl auf Leinwand (50x50zm)",
                            "price": "1 510"
                        }) */}
							</li>
						</ul>
					</div>
				</section>
				<section className="recent-watched">
					<div className="container">
						<h2 className="recent-watched__title title">
							{switchBtn ? 'vor kurzem hast du zugeschaut' : 'recently you watched'}
						</h2>
						<ul className="recent-watched__list cards-list">
							<li className="recent-watched__item">
								{/* @@include('./parts/components/_painting-card.html', {
                            "creations": false,
                            "gallery": true,
                            "image-url": "images/content/painting-card-1.jpg",
                            "alt": "Timeo danaos et donna fere...",
                            "title": "Timeo danaos et donna fere...",
                            "name": "Carla Sá Fernandes",
                            "material": "Acryl auf Leinwand (50x50zm)",
                            "price": "1 010"
                        }) */}
							</li>
						</ul>
					</div>
				</section>
			</div>
		</>
	);
};

export default SinglePaintingPage;
