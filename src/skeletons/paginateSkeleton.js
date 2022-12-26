import React from 'react';
import ContentLoader from 'react-content-loader';

const PaginateSkeleton = () => (
	<ContentLoader
		speed={2}
		width={300}
		height={130}
		viewBox="0 0 300 130"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="75" rx="0" ry="0" width="300" height="55" />
	</ContentLoader>
);

export default PaginateSkeleton;
