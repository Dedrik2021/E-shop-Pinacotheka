import React from 'react';
import ContentLoader from 'react-content-loader';

const HeaderSearchListSkeleton = ({filteredBySearchLength}) => (
	<ContentLoader
		speed={2}
		width={filteredBySearchLength <= 7 ? 550 : 528}
		height={65}
		viewBox={`0 0 ${filteredBySearchLength <= 8 ? '550' : '528'} 65`}
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="0" rx="5" ry="5" width={filteredBySearchLength <= 8 ? 550 : 528} height="65" />
	</ContentLoader>
);

export default HeaderSearchListSkeleton;
