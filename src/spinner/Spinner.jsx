import img from '../assets/images/loading-png.gif';

const Spinner = () => {
	return <img src={img} style={{width: '100%', height: '100%', objectFit: 'contain', position: 'relative', padding: '130px 130px'}} alt="Spinner" />;
};

export default Spinner;
