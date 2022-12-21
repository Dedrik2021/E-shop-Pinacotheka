import { memo } from 'react';

const Logo = memo(({img, width, height, styles}) => {
	return <img src={img} alt="logo" style={styles} width={width} height={height} />;
})

export default Logo;
