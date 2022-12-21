import React from 'react';
import ContentLoader from 'react-content-loader';

const UserAuthSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			width={270}
			height={40}
			viewBox="0 0 270 40"
			backgroundColor="#b3b2b2"
			foregroundColor="#f2eeee"
		>
			<rect x="0" y="0" rx="100" ry="100" width="40" height="40" />
			<rect x="50" y="0" rx="10" ry="10" width="220" height="40" />
		</ContentLoader>
	);
};

export default UserAuthSkeleton;
