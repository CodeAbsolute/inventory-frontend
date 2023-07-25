import { useEffect } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const NotFound = () => {
	const { isAuthenticated } = useSelector((state) => state.user);
	console.log("isAuthenticated: ", isAuthenticated);
	const history = useHistory();

	useEffect(() => {
		if (!isAuthenticated) {
			history.push("/login");
		}
	}, []);

	return (
		<div className='PageNotFound'>
			<p>Page Not Found </p>
			<Link to='/users'>Home</Link>
		</div>
	);
};

export default NotFound;
