import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1705}
		height={680}
		viewBox="0 0 1705 680"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="10" rx="15" ry="15" width="947" height="425" />
		<rect x="1000" y="10" rx="15" ry="15" width="665" height="425" />
		<rect x="20" y="460" rx="5" ry="5" width="500" height="20" />
		<rect x="1020" y="460" rx="5" ry="5" width="500" height="20" />
		<rect x="20" y="500" rx="5" ry="5" width="120" height="10" />
		<rect x="1020" y="500" rx="5" ry="5" width="120" height="10" />
		<rect x="20" y="540" rx="5" ry="5" width="910" height="15" />
		<rect x="1020" y="540" rx="5" ry="5" width="630" height="15" />
		<rect x="20" y="565" rx="5" ry="5" width="910" height="15" />
		<rect x="1020" y="565" rx="5" ry="5" width="630" height="15" />
		<rect x="20" y="590" rx="5" ry="5" width="800" height="15" />
		<rect x="1020" y="590" rx="5" ry="5" width="550" height="15" />
	</ContentLoader>
);

export default NewsSkeleton;
