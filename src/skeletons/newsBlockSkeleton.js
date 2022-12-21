import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsBlockSkeleton = () => (
	<ContentLoader
		speed={2}
		width={393}
		height={630}
		viewBox="0 0 393 630"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="15" y="15" rx="10" ry="10" width="360" height="250" />
		<rect x="15" y="290" rx="5" ry="5" width="90" height="10" />
		<rect x="15" y="325" rx="5" ry="5" width="315" height="15" />
		<rect x="15" y="365" rx="5" ry="5" width="360" height="10" />
		<rect x="15" y="385" rx="5" ry="5" width="360" height="10" />
		<rect x="15" y="405" rx="5" ry="5" width="360" height="10" />
		<rect x="15" y="425" rx="5" ry="5" width="360" height="10" />
		<rect x="15" y="445" rx="5" ry="5" width="360" height="10" />
		<rect x="15" y="465" rx="5" ry="5" width="360" height="10" />
	</ContentLoader>
);

export default NewsBlockSkeleton
