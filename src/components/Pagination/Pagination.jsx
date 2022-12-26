import { memo } from 'react';
import ReactPaginate from 'react-paginate';

import './pagination.scss'

const Pagination = memo(({ pageChange, pageCount, dataSelected }) => {
	return (
		<ReactPaginate
			onClick={pageChange}
			onPageChange={pageChange}
			pageCount={pageCount}
			marginPagesDisplayed={2}
			pageRangeDisplayed={3}
			breakLabel="..."
			nextLabel="Next"
			previousLabel="Prev"
			containerClassName={'pagination__list'}
			pageClassName={'pagination__item'}
			pageLinkClassName={'pagination__btn pagination__btn--num btn--universal btn'}
			previousClassName={`pagination__btn btn btn--red pagination__btn--prev
                ${dataSelected === 1 ? 'pagination--style' : ''}`}
			nextClassName={`pagination__btn btn btn--red pagination__btn--next
                ${dataSelected === pageCount ? 'pagination--style' : ''}`}
			breakLinkClassName={'pagination__btn pagination__btn--num btn--universal btn'}
			activeClassName={ `pagination__btn--active` }
			
		/>
	);
});

export default Pagination;
