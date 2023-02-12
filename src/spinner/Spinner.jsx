import img from '../assets/images/loading-png.gif';

const Spinner = ({styleProps}) => {
	return <img src={img} style={styleProps} alt="Spinner" />;
};

export default Spinner;
