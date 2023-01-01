import { memo } from 'react';

import PaintingCard from '../../../components/PaintingCard/PaintingCard';
import Pagination from '../../../components/Pagination/Pagination';

const SinglePaintingGallerySection = memo((props) => {
	const {
		switchBtn,
		author,
		setDataSelected,
		setLimitLast,
		limitLast,
		limitStart,
		dataLength,
		dataSelected,
		paintings,
		sectionClassName,
		sectionAn,
		sectionDe,
		title
	} = props;

	const onCurrentPage = (data) => {
		let currentPage = data.selected + 1;
		setDataSelected(currentPage);

		if (data.isNext) {
			setLimitLast(limitLast + 6);
		} else if (data.isPrevious) {
			setLimitLast(limitLast - 6);
		}
	};

	return (
		<section className={sectionClassName}>
			<div className="container">
				<h2 className={`title ${title}`}>{switchBtn ? sectionDe : sectionAn}</h2>
				<ul className="gallery__list cards-list">
					{author &&
						paintings &&
						paintings.slice(limitStart, limitLast).map((work, i) => {
							return (
								<PaintingCard key={i} switchBtn={switchBtn} paintingInfo={work} />
							);
						})}
				</ul>
				{dataLength > 1 && (
					<Pagination
						pageChange={onCurrentPage}
						pageCount={dataLength}
						dataSelected={dataSelected}
					/>
				)}
			</div>
		</section>
	);
});

export default SinglePaintingGallerySection;
