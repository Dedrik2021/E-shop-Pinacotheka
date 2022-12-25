import React from 'react';
import ContentLoader from 'react-content-loader';

const AuthorsSkeleton = () => (
	<ContentLoader
		speed={2}
		width={835}
		height={250}
		viewBox="0 0 835 250"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="20" y="20" rx="10" ry="10" width="170" height="210" />
		<rect x="230" y="35" rx="5" ry="5" width="230" height="20" />
		<rect x="245" y="70" rx="5" ry="5" width="100" height="10" />
		<rect x="245" y="95" rx="5" ry="5" width="100" height="15" />
		<rect x="230" y="135" rx="10" ry="10" width="92" height="92" />
		<rect x="330" y="135" rx="10" ry="10" width="92" height="92" />
		<rect x="430" y="135" rx="10" ry="10" width="92" height="92" />
		<rect x="530" y="135" rx="10" ry="10" width="92" height="92" />
		<rect x="630" y="135" rx="10" ry="10" width="92" height="92" />
	</ContentLoader>
);

export default AuthorsSkeleton;
