import React from 'react';
import ContentLoader from 'react-content-loader';

const EditNewsSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1620}
		height={670}
		viewBox="0 0 1620 670"
		backgroundColor="#e3e3e3"
		foregroundColor="#d6d1d1"
	>
		<rect x="85" y="0" rx="20" ry="20" width="700" height="450" />

		<rect x="85" y="500" rx="10" ry="10" width="320" height="40" />
		<rect x="465" y="500" rx="10" ry="10" width="320" height="40" />

		<rect x="890" y="10" rx="10" ry="10" width="720" height="50" />
		<rect x="890" y="70" rx="10" ry="10" width="720" height="50" />
		<rect x="890" y="130" rx="10" ry="10" width="720" height="50" />
		<rect x="890" y="190" rx="10" ry="10" width="720" height="50" />
		<rect x="890" y="270" rx="10" ry="10" width="720" height="180" />

		<rect x="930" y="500" rx="10" ry="10" width="280" height="40" />
		<rect x="1260" y="500" rx="10" ry="10" width="280" height="40" />
		
	</ContentLoader>
);

export default EditNewsSkeleton;
