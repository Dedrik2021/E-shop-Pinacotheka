import { memo } from 'react';

import AuthorInfoCard from './AuthorInfoCard/AuthorInfoCard';
import AboutPaintingInfo from '../../../../components/AboutPaintingInfo/AboutPaintingInfo';
import Logo from '../../../../UI/logo/Logo';

import logo from '../../../../assets/images/logo.svg';

const SinglePaintingAuthorInfoList = memo(({ filterBtn, painting, author, switchBtn }) => {
	const authorInfo = () => {
		return (
			<div>
				{author !== undefined &&
					author.info.map((item, i) => {
						return <p key={i}>{item}</p>;
					})}
			</div>
		);
	};

	return (
		<ul className="creations-details__list">
			<li className={`creations-details__item  ${filterBtn === 0 ? 'active' : ''}`}>
				<AuthorInfoCard {...author} />
				{authorInfo()}
			</li>
			<li className={`creations-details__item  ${filterBtn === 1 ? 'active' : ''}`}>
                <AboutPaintingInfo
                    switchBtn={switchBtn}
                    blockInfo={painting}
                />
				{authorInfo()}
			</li>
			<li className={`creations-details__item  ${filterBtn === 2 ? 'active' : ''}`}>
				<Logo img={logo} width="180" height="50" />
				{authorInfo()}
			</li>
			<li className={`creations-details__item  ${filterBtn === 3 ? 'active' : ''}`}>
				<Logo img={logo} width="180" height="50" />
				{authorInfo()}
			</li>
		</ul>
	);
});

export default SinglePaintingAuthorInfoList;
