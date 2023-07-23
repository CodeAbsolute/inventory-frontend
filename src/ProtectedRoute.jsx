import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { loading, isAuthenticated } = useSelector((state) => state.user);

	return (
		<>
			{loading === false && (
				<Route
					{...rest}
					render={(props) => {
						if (isAuthenticated === false) {
							return <Redirect to='/login' />;
						}
						return <Component {...props} />;
					}}
				/>
			)}
		</>
	);
};

export default ProtectedRoute;
