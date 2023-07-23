import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className='PageNotFound'>
			<p>Page Not Found </p>
			<Link to='/login'>Home</Link>
		</div>
	);
};

export default NotFound;
