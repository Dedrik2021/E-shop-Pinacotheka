import React from 'react';
import ContentLoader from 'react-content-loader';

const GallerySkeleton = ({widthCard, imgWidth, paddingLeftPrice, paddingTopPrice, heightCard}) => (
	<ContentLoader
		speed={2}
		width={widthCard ? widthCard : 270}
		height={heightCard ? heightCard : 393}
		viewBox={`0 0 ${widthCard ? widthCard : 270} ${heightCard ? heightCard : 393}`}
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="10" y="10" rx="10" ry="10" width={imgWidth ? imgWidth : 255} height="293" />
		<rect x="15" y="310" rx="5" ry="5" width="240" height="20" />
		<rect x="15" y="345" rx="5" ry="5" width="171" height="15" />
		<rect x="15" y="370" rx="5" ry="5" width="156" height="15" />
		<rect x={paddingLeftPrice ? paddingLeftPrice : 190} y={paddingTopPrice ? paddingTopPrice : 365} rx="5" ry="5" width="70" height="20" />
	</ContentLoader>
);

export default GallerySkeleton;
