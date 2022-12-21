import React from 'react';
import ContentLoader from 'react-content-loader';

const HeroBlockSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1885}
		height={810}
		viewBox="0 0 1885 810"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="255" y="210" rx="10" ry="10" width="330" height="80" />
		<rect x="255" y="340" rx="5" ry="5" width="150" height="20" />
		<rect x="255" y="385" rx="5" ry="5" width="200" height="15" />
		<rect x="255" y="415" rx="5" ry="5" width="300" height="15" />
		<rect x="255" y="510" rx="10" ry="10" width="215" height="55" />
		<rect x="255" y="610" rx="50" ry="50" width="40" height="40" />
		<rect x="305" y="610" rx="50" ry="50" width="40" height="40" />
		<rect x="625" y="110" rx="10" ry="10" width="1035" height="540" />
		<rect x="1785" y="110" rx="10" ry="10" width="110" height="540" />
	</ContentLoader>
);

export default HeroBlockSkeleton;
