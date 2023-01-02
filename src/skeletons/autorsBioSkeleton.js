import React from 'react';
import ContentLoader from 'react-content-loader';

const AuthorsBioSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1275}
		height={1000}
		viewBox="0 0 1275 1000"
		backgroundColor="#e3e3e3"
		foregroundColor="#d6d1d1"
	>
		<rect x="0" y="60" rx="9" ry="9" width="291" height="400" />

		<rect x="400" y="160" rx="10" ry="10" width="240" height="40" />
		<rect x="400" y="235" rx="10" ry="10" width="240" height="40" />
		<rect x="750" y="140" rx="5" ry="5" width="350" height="20" />
		<rect x="750" y="200" rx="5" ry="5" width="350" height="20" />
		<rect x="750" y="260" rx="5" ry="5" width="350" height="20" />
		<rect x="750" y="320" rx="5" ry="5" width="350" height="20" />
		<rect x="0" y="515" rx="10" ry="10" width="300" height="40" />
		
		<rect x="0" y="635" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="660" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="685" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="710" rx="5" ry="5" width="500" height="15" />

		<rect x="0" y="750" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="775" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="800" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="825" rx="5" ry="5" width="500" height="15" />

		<rect x="0" y="865" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="890" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="915" rx="5" ry="5" width="1270" height="15" />
		<rect x="0" y="940" rx="5" ry="5" width="500" height="15" />
	</ContentLoader>
);

export default AuthorsBioSkeleton;
