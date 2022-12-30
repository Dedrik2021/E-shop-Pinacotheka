import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsBlockSkeleton = ({breadCrumbsTitle}) => (
	
	<ContentLoader
		speed={2}
		width={breadCrumbsTitle === 'News' ? 555 : 415}
		height={breadCrumbsTitle === 'News' ? 780 : 630}
		viewBox={breadCrumbsTitle === 'News' ? '0 0 555 780' : '0 0 415 630'}
		backgroundColor="#b3b2b2"
		foregroundColor="#f2eeee"
	>
		<rect x="0" y="10" rx="10" ry="10" 
			width={breadCrumbsTitle === 'News' ? 520 : 390} 
			height={breadCrumbsTitle === 'News' ? 425 : 250} />

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 460 : 290} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 460 : 90} 
			height={breadCrumbsTitle === 'News' ? 20 : 10}
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 500 : 325} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 140 : 315} 
			height={breadCrumbsTitle === 'News' ? 12 : 15} 
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 540 : 365} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 490 : 360} 
			height={breadCrumbsTitle === 'News' ? 15 : 10}
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 565 : 385} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 490 : 360} 
			height={breadCrumbsTitle === 'News' ? 15 : 10} 
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 590 : 405}
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 490 : 360} 
			height={breadCrumbsTitle === 'News' ? 15 : 10}
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 615 : 425} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 490 : 360}
			height={breadCrumbsTitle === 'News' ? 15 : 10}
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 640 : 425} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 490 : 360}
			height={breadCrumbsTitle === 'News' ? 15 : 10}
		/>

		<rect 
			x="15" 
			y={breadCrumbsTitle === 'News' ? 665 : 425} 
			rx="5" 
			ry="5" 
			width={breadCrumbsTitle === 'News' ? 300 : 360}
			height={breadCrumbsTitle === 'News' ? 15 : 10}
		/>
	</ContentLoader>
);

export default NewsBlockSkeleton
