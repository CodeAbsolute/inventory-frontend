import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { loading, isAuthenticated } = useSelector((state) => state.user);
	const history = useHistory();

	return (
		<>
			{loading === false && (
				<Route
					{...rest}
					render={(props) => {
						if (isAuthenticated === false) {
							history.push("/");
						}
						return <Component {...props} />;
					}}
				/>
			)}
		</>
	);
};

export default ProtectedRoute;
