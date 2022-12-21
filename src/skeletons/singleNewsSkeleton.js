import React from 'react';
import ContentLoader from 'react-content-loader';

const SingleNewsSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1705}
		height={1210}
		viewBox="0 0 1705 1210"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="55" rx="5" ry="5" width="250" height="10" />
		<rect x="0" y="170" rx="10" ry="10" width="170" height="45" />
		<rect x="210" y="270" rx="10" ry="10" width="1300" height="550" />
		<rect x="210" y="900" rx="5" ry="5" width="100" height="10" />
		<rect x="210" y="940" rx="5" ry="5" width="800" height="20" />
		<rect x="210" y="1000" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="1025" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="1050" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="1075" rx="5" ry="5" width="900" height="15" />

		<rect x="210" y="1115" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="1140" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="1165" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="1190" rx="5" ry="5" width="700" height="15" />
		
	</ContentLoader>
);

export default SingleNewsSkeleton;
