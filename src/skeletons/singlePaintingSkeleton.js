import React from 'react';
import ContentLoader from 'react-content-loader';

const SinglePaintingSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1705}
		height={800}
		viewBox="0 0 1705 800"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="51" y="137" rx="0" ry="0" width="0" height="22" />
		<rect x="150" y="290" rx="0" ry="0" width="1" height="0" />
        <rect x="0" y="50" rx="5" ry="5" width="300" height="15" />
		<rect x="200" y="155" rx="20" ry="20" width="830" height="550" />
		<rect x="1120" y="160" rx="5" ry="5" width="140" height="20" />
		<rect x="1120" y="220" rx="5" ry="5" width="300" height="35" />
		<rect x="1120" y="280" rx="5" ry="5" width="300" height="25" />
		<rect x="1120" y="330" rx="5" ry="5" width="300" height="40" />
		<rect x="1120" y="395" rx="5" ry="5" width="100" height="25" />
		<rect x="1120" y="445" rx="5" ry="5" width="70" height="25" />
		<rect x="1120" y="495" rx="5" ry="5" width="130" height="25" />
		<rect x="1350" y="395" rx="5" ry="5" width="120" height="25" />
		<rect x="1390" y="445" rx="5" ry="5" width="80" height="25" />
		<rect x="1390" y="495" rx="5" ry="5" width="80" height="25" />
		<rect x="1120" y="560" rx="10" ry="10" width="160" height="70" />
		<rect x="1370" y="610" rx="5" ry="5" width="100" height="20" />
		<rect x="1120" y="650" rx="10" ry="10" width="300" height="60" />
	</ContentLoader>
);

export default SinglePaintingSkeleton;
