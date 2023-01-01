import { memo } from 'react';

import SinglePaintingAuthorInfoBtns from './SinglePaintingAuthorInfoBtns/SinglePaintingAuthorInfoBtns';
import SinglePaintingAuthorInfoList from './SinglePaintingAuthorInfoList/SinglePaintingAuthorInfoList';

import './singlePaintingAuthorInfo.scss'

const SinglePaintingAuthorInfo = memo((props) => {
    const {filterBtn, setFilterBtn, switchBtn, painting, author} = props

	return (
		<section className="creations-details__tabs">
			<h2 className="sr-only">Besonderheiten</h2>
			<SinglePaintingAuthorInfoBtns
				filterBtn={filterBtn}
				setFilterBtn={setFilterBtn}
				switchBtn={switchBtn}
			/>
			<SinglePaintingAuthorInfoList
                painting={painting}
                filterBtn={filterBtn}
                author={author}
                switchBtn={switchBtn}
            />
		</section>
	);
})

export default SinglePaintingAuthorInfo;
