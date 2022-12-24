import { memo, useEffect, useState, useMemo } from 'react';

import GallerySkeleton from '../../skeletons/gallerySkeleton';
import GalleryFilter from './GalleryFilter/GalleryFilter';
import PaintingCard from '../PaintingCard/PaintingCard';
import Pagination from '../Pagination/Pagination';

import './gallery.scss';

const Gallery = memo(({ switchBtn, gallery }) => {
	const [filterBtn, setFilterBtn] = useState(0);
	const [dataSelected, setDataSelected] = useState(1);
	const [authorsDataLength, setAuthorsDataLength] = useState(0);
	const [limitLast, setLimitLast] = useState(18);
	const [limitStart, setLimitStart] = useState(18);
	const [loading, setLoading] = useState(false);
	const works = [];

	const paintingsInfo = gallery.map((item) => item.works);

	for (const i of paintingsInfo) {
		works.push(...i);
	}

	useMemo(() => {
		setLoading(true);
		setLimitLast(18 * dataSelected);
		setLimitStart(limitLast - 18);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [dataSelected, limitLast]);

	useEffect(() => {
		setAuthorsDataLength(Math.ceil(works.length / 18));
	}, [works]);

	const onCurrentPage = (authorsData) => {
		setFilterBtn(0);
		let currentPage = authorsData.selected + 1;
		setDataSelected(currentPage);

		if (authorsData.isNext) {
			setLimitLast(limitLast + 18);
		} else if (authorsData.isPrevious) {
			setLimitLast(limitLast - 18);
		}
	};

	const clickOnFilterBtn = (id) => {
		setLoading(true) 
		setFilterBtn(id)
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}

	const filterWorks = () => {
		switch (filterBtn) {
			case 0:
				return works.filter((work) => work.category === filterBtn);
			case 1:
				return works.filter((work) => work.category === filterBtn);
			case 2:
				return works.filter((work) => work.category === filterBtn);
			case 3:
				return works.filter((work) => work.category === filterBtn);
			case 4:
				return works.filter((work) => work.category === filterBtn);
			default:
				return works;
		}
	};

	const paintings = filterWorks().length > 0 ? filterWorks() : works.slice(limitStart, limitLast);

	return (
		<section className={`gallery`}>
			<h2 className="sr-only">{switchBtn ? 'Autoren Produkte' : 'Author Products'}</h2>
			<div className="container">
				<GalleryFilter
					switchBtn={switchBtn}
					filterBtn={filterBtn}
					clickOnFilterBtn={clickOnFilterBtn}
				/>
				<div 
					className="gallery__content" 
					style={{height: filterBtn > 0 && '1250px', 
					overflow: filterBtn > 0 && 'auto',
					borderBottom: filterBtn > 0 && '43px solid #EDEDED',
					boxShadow: filterBtn > 0 && '0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
					borderTop: '20px solid #EDEDED',
					borderRadius: '20px'
					}} 
					>
					{!loading ? (
						<>
							<PaintingCard
								switchBtn={switchBtn}
								paintingsInfo={paintings}
							/>
						</>
					) : (
						<div className="container" style={{ height: '1195px', marginBottom: '101px' }}>
							{[...new Array(18)].map((_, i) => (
								<GallerySkeleton key={i} />
							))}
						</div>
					)}
				</div>
				{filterBtn < 1 && (
					<Pagination
					pageChange={onCurrentPage}
					pageCount={authorsDataLength}
					dataSelected={dataSelected}
				/>
				)}
			</div>
		</section>
	);
});

export default Gallery;
