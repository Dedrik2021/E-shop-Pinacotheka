import { memo, useEffect, useState } from 'react';

import GalleryFilter from './GalleryFilter/GalleryFilter';
import PaintingCard from '../PaintingCard/PaintingCard';
import Pagination from '../Pagination/Pagination';

import './gallery.scss';

const Gallery = memo(({ switchBtn, gallery }) => {
	const [filterBtn, setFilterBtn] = useState(0);
	const [dataSelected, setDataSelected] = useState(1);
	const [authorsDataLength, setAuthorsDataLength] = useState(0)

	const [limitLast, setLimitLast] = useState(18)
	const [limitStart, setLimitStart] = useState(18)
	const works = []

	const paintingsInfo = gallery.map(item => item.works)
	
	for (const i of paintingsInfo) {
		works.push(...i);
	}

	useEffect(() => {
		setAuthorsDataLength(Math.ceil(works.length / 18))
		setLimitLast(18 * dataSelected)
		setLimitStart(limitLast - 18)
	}, [dataSelected, limitLast, works])

	const onCurrentPage = (authorsData) => {
		setFilterBtn(0)
		let currentPage = authorsData.selected + 1
		setDataSelected(currentPage);
		
		if (authorsData.isNext) {
			setLimitLast(limitLast + 18)
		} else if (authorsData.isPrevious) {
			setLimitLast(limitLast - 18)
		}
	};

	const filterWorks = () => {
		switch (filterBtn) {
			case 0:
				return works.filter(work => work.category === filterBtn)
			case 1:
				return works.filter(work => work.category === filterBtn)
			case 2:
				return works.filter(work => work.category === filterBtn)
			case 3:
				return works.filter(work => work.category === filterBtn)
			case 4:
				return works.filter(work => work.category === filterBtn)
			default:
				return works
		}
	};

	const paintings = filterWorks().length > 0 ? filterWorks() : works.slice(limitStart, limitLast)

	return (
		<section className={`gallery`}>
			<h2 className="sr-only">{switchBtn ? 'Autoren Produkte' : 'Author Products'}</h2>
			<div className="container">
				<div className="gallery__content">
					<GalleryFilter
						switchBtn={switchBtn}
						filterBtn={filterBtn}
						clickOnFilterBtn={setFilterBtn}
					/>
					<PaintingCard 
						switchBtn={switchBtn} 
						paintingsInfo={paintings} 
					/>
					<Pagination 
						pageChange={onCurrentPage} 
						pageCount={authorsDataLength} 
						dataSelected={dataSelected}
					/>
				</div>
			</div>
		</section>
	);
});

export default Gallery;
