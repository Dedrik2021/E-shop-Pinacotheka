import { memo, useState } from 'react';

import GalleryFilter from './GalleryFilter/GalleryFilter';
import PaintingCard from '../PaintingCard/PaintingCard';

import './gallery.scss'

const Gallery = memo(({ switchBtn, paintingsInfo }) => {
    const [filterBtn, setFilterBtn] = useState(0)

    const clickOnFilterBtn = (id) => {
        setFilterBtn(id)
    }

	return (
		<section className={`gallery`}>
			<h2 className="sr-only">{switchBtn ? 'Autoren Produkte' : 'Author Products'}</h2>
			<div className="container">
				<div className="gallery__content">
					<GalleryFilter
                        switchBtn={switchBtn}
                        filterBtn={filterBtn}
                        clickOnFilterBtn={clickOnFilterBtn}
                    />
					{/* <ul className="gallery__list cards-list"> */}
                    <PaintingCard
                        switchBtn={switchBtn}
                        paintingsInfo={paintingsInfo}
                    />
						{/* {content} */}
						{/* {errorMessage} */}
					{/* </ul> */}
					{/* <Pagination pageChange={onCurrentPage} pageCount={pageCount} dataSelected={dataSelected}/> */}
				</div>
			</div>
		</section>
	);
});

export default Gallery;
