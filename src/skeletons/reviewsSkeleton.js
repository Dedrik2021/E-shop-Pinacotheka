import React from 'react';
import ContentLoader from 'react-content-loader';

const ReviewsSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			width={1295}
			height={200}
			viewBox="0 0 1295 200"
			backgroundColor="#b3b2b2"
			foregroundColor="#f2eeee"
		>
			<circle cx="75" cy="80" r="70" />
			<rect x="200" y="0" rx="5" ry="5" width="242" height="20" />
			<rect x="200" y="50" rx="5" ry="5" width="1050" height="15" />
			<rect x="200" y="75" rx="5" ry="5" width="1050" height="15" />
			<rect x="200" y="100" rx="5" ry="5" width="1050" height="15" />
			<rect x="200" y="125" rx="5" ry="5" width="382" height="15" />
		</ContentLoader>
	);
};

export default ReviewsSkeleton;
