import './social.scss'

const Social = () => {

    const socialNet = [
		{ id: 0, title: 'Google', src: 'https://www.google.de/', classItem: 'social__link--google' },
		{ id: 1, title: 'Facebook', src: 'https://www.facebook.com/', classItem: 'social__link--facebook' },
		{ id: 2, title: 'Twitter', src: 'https://twitter.com/tweeter', classItem: 'social__link--twitter'},
		{ id: 3, title: 'Instagram', src: 'https://www.instagram.com/?hl=de', classItem: 'social__link--instagram' },
	];

	return (
		<ul className="social">
			{socialNet.map(({ id, title, src, classItem }) => (
				<li key={id} className="social__item">
					<a className={`social__link ${classItem}`} target="_blank" href={src}>
						<span className="sr-only">{title}</span>
					</a>
				</li>
			))}
		</ul>
	);
};

export default Social;