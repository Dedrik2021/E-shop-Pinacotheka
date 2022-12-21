import React from 'react';
import ContentLoader from 'react-content-loader';

const AuthorsBlockSkeleton = () => (
	<ContentLoader
		speed={2}
		width={122}
		height={150}
		viewBox="0 0 122 150"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="0" rx="10" ry="10" width="122" height="125" />
		<rect x="10" y="140" rx="5" ry="5" width="100" height="10" />
	</ContentLoader>
);

export default AuthorsBlockSkeleton;
