import { memo } from 'react';

import './aboutPaintingInfo.scss'

const AboutPaintingInfo = memo(({ switchBtn, blockInfo, info }) => {
	const blockItems = [
		{ title: switchBtn ? 'Autor' : 'Author' },
		{ title: switchBtn ? 'Stil' : 'Style' },
		{ title: switchBtn ? 'Segeltuch' : 'Sailcloth' },
	];

	const infoBlock = [
		{ title: switchBtn ? 'Standort' : 'Location' },
		{ title: switchBtn ? 'Verkäufer' : 'Seller' },
		{ title: switchBtn ? 'Beschaffenheit' : 'Texture' },
		{ title: switchBtn ? 'Material' : 'Material' },
		{ title: switchBtn ? 'Methode der Erstellung' : 'Method of creation' },
		{ title: switchBtn ? 'Bewerteter Wert' : 'Assessed value' },
		{ title: switchBtn ? 'Jahre der Schöpfung' : 'Years of creation' },
		{ title: switchBtn ? 'Datum hinzugefügt' : 'Date added' },
	];

	const getBlockItems = (info, blockInfo) => {
		if (info) {
			return (
				<div className='block-section'>
					<ul className="block">
						{blockItems.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span className="block__author-item">{item.title}:</span>
								</li>
							);
						})}
					</ul>
					<ul className="block">
						{info.cardInfo.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span key={i} className="block__author-item block__author-item--thing">
										{item}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			);
		} else {
			return (
				<div className='block-section'>
					<ul className="block">
						{infoBlock.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span className="block__author-item">{item.title}:</span>
								</li>
							);
						})}
					</ul>
					<ul className="block">
						{blockInfo && blockInfo.aboutCard.map((item, i) => {
							return (
								<li className="block__item" key={i}>
									<span key={i} className="block__author-item block__author-item--thing">
										{item}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}
	};

    return getBlockItems(info, blockInfo)
});

export default AboutPaintingInfo;
