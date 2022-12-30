import React from 'react';
import ContentLoader from 'react-content-loader';

const SingleNewsSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1705}
		height={1000}
		viewBox="0 0 1705 1000"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="210" y="0" rx="10" ry="10" width="1250" height="550" />
		<rect x="210" y="580" rx="5" ry="5" width="400" height="15" />
		<rect x="210" y="620" rx="5" ry="5" width="800" height="20" />
		<rect x="210" y="680" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="705" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="730" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="755" rx="5" ry="5" width="900" height="15" />

		<rect x="210" y="800" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="825" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="850" rx="5" ry="5" width="1300" height="15" />
		<rect x="210" y="875" rx="5" ry="5" width="700" height="15" />
		
	</ContentLoader>
);

export default SingleNewsSkeleton;
