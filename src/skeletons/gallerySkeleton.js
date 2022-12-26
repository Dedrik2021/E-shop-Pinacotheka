import React from 'react';
import ContentLoader from 'react-content-loader';

const GallerySkeleton = () => (
	<ContentLoader
		speed={2}
		width={270}
		height={393}
		viewBox="0 0 270 393"
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="10" y="10" rx="10" ry="10" width="255" height="293" />
		<rect x="15" y="310" rx="5" ry="5" width="240" height="20" />
		<rect x="15" y="345" rx="5" ry="5" width="171" height="15" />
		<rect x="15" y="370" rx="5" ry="5" width="156" height="15" />
		<rect x="190" y="365" rx="5" ry="5" width="70" height="20" />
	</ContentLoader>
);

export default GallerySkeleton;
