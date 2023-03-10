import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

import Hero from '../components/Hero/Hero';
import Gallery from '../components/Gallery/Gallery';
import Description from '../components/Description/Description';
import News from '../components/News/News';
import Authors from '../components/Authors/Authors';

import HeroBlockSkeleton from '../skeletons/heroBlockSkeleton';
import GallerySkeleton from '../skeletons/gallerySkeleton';
import NewsBlockSkeleton from '../skeletons/newsBlockSkeleton';
import AuthorsBlockSkeleton from '../skeletons/authorsBlockSkeleton';

import { setBreadCrumbsTitle } from '../redux/slices/breadCrumbsSlice';

import { Status } from '../utils/status/status';

const HomePage = () => {
	const dispatch = useDispatch()
	const { authorsData, authorsDataStatus } = useSelector((state) => state.authorsSlice);
	const { newsData, newsDataStatus } = useSelector((state) => state.newsSlice);
	const paintingsInfo = authorsData.filter((item) => item.works.length !== 0);
	const foundUser = useSelector(state => state.usersSlice.foundUser)

	const breadCrumbsTitle = useSelector((state) => state.breadCrumbsSlice.breadCrumbsTitle);
	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

	useEffect(() => {
		dispatch(setBreadCrumbsTitle(''));
		const pathName = window.location.pathname.substring(1, 8);
		const name = pathName.split('/');
		dispatch(setBreadCrumbsTitle(name));
	}, [dispatch]);


	return (
		<>
			<Helmet>
				<meta
					name="description"
					content={switchBtn ? 'Pinacotheka onlineshop' : 'Pinacotheka E-shop'}
				/>
				<title>{switchBtn ? 'Pinacotheka onlineshop' : 'Pinacotheka E-shop'}</title>
			</Helmet>
			{authorsDataStatus === Status.SUCCESS ? (
				<Hero switchBtn={switchBtn} paintingsInfo={paintingsInfo} />
			) : (
				<div className="container container--lg">
					<HeroBlockSkeleton />
				</div>
			)}
			{authorsDataStatus === Status.SUCCESS ? (
				<Gallery switchBtn={switchBtn} gallery={paintingsInfo} authorsData={authorsData} />
			) : (
				<div className="container" style={{marginBottom: '100px'}}>
					{[...new Array(18)].map((_, i) => (
						<GallerySkeleton key={i} />
					))}
				</div>
			)}
			<Description />
			{newsDataStatus === Status.SUCCESS ? (
				<News switchBtn={switchBtn} newsData={newsData} />
			) : (
				<div className="container">
					{[...new Array(4)].map((_, i) => (
						<NewsBlockSkeleton key={i} />
					))}
				</div>
			)}

            {authorsDataStatus === Status.SUCCESS ? (
                <Authors 
                    authorsData={authorsData} 
                    switchBtn={switchBtn}   
					foundUser={foundUser} 
                />
            ) : (
                <div className="container">
					{[...new Array(12)].map((_, i) => (
						<AuthorsBlockSkeleton key={i} />
					))}
				</div>
            )}
		</>
	);
};

export default HomePage;
