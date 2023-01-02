import React from 'react';
import ContentLoader from 'react-content-loader';

const SinglePaintingSkeleton = () => (
	<ContentLoader
		speed={2}
		width={1705}
		height={695}
		viewBox="0 0 1705 695"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="220" y="0" rx="20" ry="20" width="800" height="550" />
		<rect x="1110" y="20" rx="5" ry="5" width="140" height="20" />
		<rect x="1110" y="70" rx="5" ry="5" width="300" height="35" />
		<rect x="1110" y="130" rx="5" ry="5" width="300" height="20" />
		<rect x="1110" y="175" rx="5" ry="5" width="350" height="40" />
		<rect x="1110" y="245" rx="5" ry="5" width="100" height="20" />
		<rect x="1110" y="285" rx="5" ry="5" width="70" height="20" />
		<rect x="1110" y="325" rx="5" ry="5" width="130" height="20" />
		<rect x="1350" y="245" rx="5" ry="5" width="120" height="20" />
		<rect x="1390" y="285" rx="5" ry="5" width="80" height="20" />
		<rect x="1390" y="325" rx="5" ry="5" width="80" height="20" />
		<rect x="1110" y="390" rx="10" ry="10" width="160" height="50" />
		<rect x="1350" y="420" rx="5" ry="5" width="120" height="20" />
		<rect x="1110" y="480" rx="10" ry="10" width="200" height="55" />
	</ContentLoader>
);

export default SinglePaintingSkeleton;
