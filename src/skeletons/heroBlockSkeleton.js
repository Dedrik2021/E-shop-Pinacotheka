import React from 'react';
import ContentLoader from 'react-content-loader';

const HeroBlockSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1885}
		height={1130}
		viewBox="0 0 1885 1130"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="240" y="320" rx="10" ry="10" width="330" height="80" />
		<rect x="240" y="450" rx="5" ry="5" width="150" height="20" />
		<rect x="240" y="495" rx="5" ry="5" width="200" height="15" />
		<rect x="240" y="525" rx="5" ry="5" width="300" height="15" />
		<rect x="240" y="625" rx="10" ry="10" width="215" height="60" />
		<rect x="240" y="725" rx="50" ry="50" width="40" height="40" />
		<rect x="290" y="725" rx="50" ry="50" width="40" height="40" />
		<rect x="610" y="220" rx="10" ry="10" width="1035" height="540" />
		<rect x="1770" y="220" rx="10" ry="10" width="110" height="540" />
	</ContentLoader>
);

export default HeroBlockSkeleton;
