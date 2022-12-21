import React from 'react';
import ContentLoader from 'react-content-loader';

const UserInfoSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1160}
		height={600}
		viewBox="0 0 1160 600"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="0" rx="20" ry="20" width="290" height="400" />
		<rect x="360" y="70" rx="5" ry="5" width="350" height="23" />
		<rect x="805" y="70" rx="5" ry="5" width="350" height="23" />
		<rect x="360" y="150" rx="5" ry="5" width="350" height="23" />
		<rect x="805" y="150" rx="5" ry="5" width="350" height="23" />
		<rect x="360" y="235" rx="5" ry="5" width="350" height="23" />
		<rect x="805" y="235" rx="5" ry="5" width="350" height="23" />
		<rect x="360" y="320" rx="5" ry="5" width="350" height="23" />
		<rect x="805" y="320" rx="5" ry="5" width="350" height="23" />
		<rect x="0" y="480" rx="10" ry="10" width="285" height="44" />
	</ContentLoader>
);

export default UserInfoSkeleton;
