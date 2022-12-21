import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Hero from "../components/Hero/Hero";
import Gallery from '../components/Gallery/Gallery';

import HeroBlockSkeleton from "../skeletons/heroBlockSkeleton";
import GallerySkeleton from '../skeletons/gallerySkeleton'

import { Status } from "../utils/status/status";

const Home = () => {
    const {authorsData, authorsDataStatus} = useSelector((state) => state.authorsSlice);
    const paintingsInfo = authorsData.filter(item => item.works.length !== 0 )

	const switchLanguageBtn = useSelector((state) => state.langBtnsSlice.switchLanguageBtn);
	const switchBtn = switchLanguageBtn[0] === 0;

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
                <Hero 
                    switchBtn={switchBtn}
                    paintingsInfo={paintingsInfo}
                />
                ) : (
                    <HeroBlockSkeleton/>
                )
            }
            {authorsDataStatus === Status.SUCCESS ? (
                <>

                <Gallery 
                    paintingsInfo={paintingsInfo}
                    switchBtn={switchBtn}
                />
                <div className="container">
                        {[...new Array(18)].map((_, i) => <GallerySkeleton key={i} />)}
                    </div>
                </>
                ) : (
                    <div className="container">
                        {[...new Array(18)].map((_, i) => <GallerySkeleton key={i} />)}
                    </div>
                )
            }
        </>
    );
}

export default Home;