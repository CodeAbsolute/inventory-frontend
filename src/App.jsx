import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Login from "./Components/User/Login";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import UserListingTable from "./Components/User/UserListingTable";
import ProductListings from "./Components/Product/ProductListings";
import ProductTable from "./Components/Product/ProductTable";
import ProductDetails from "./Components/Product/ProductDetails";
import NotFound from "./Components/Layouts/Not Found/NotFound";
import VerifyEmail from "./Components/User/VerifyEmail";
import EditProduct from "./Components/Product/EditProduct";
// import Table from "./Components/User/Table";
// import ProductCard from "./Components/Product/ProductCard";

function App() {
	const { isAuthenticated } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// console.log("App.js user: ", user);
	useEffect(() => {
		// console.log("useeffect called");
		dispatch(loadUser());
	}, []);

	// const isAuthenticated = true;
	return (
		<Router>
			{isAuthenticated && <Header />}
			<Switch>
				{/* <Route exact path='/table' component={Table} /> */}
				<Route exact path='/login' component={Login} />
				<Route exact path='/forgotPassword' component={ForgotPassword} />
				<Route exact path='/resetPassword/:token' component={ResetPassword} />
				<Route exact path='/verifyEmail/:token' component={VerifyEmail} />
				<ProtectedRoute exact path='/users' component={UserListingTable} />
				{/* <ProtectedRoute exact path='/products' component={ProductTable} /> */}
				<ProtectedRoute exact path='/products' component={ProductListings} />
				<ProtectedRoute
					exact
					path='/product/update/:id'
					component={EditProduct}
				/>
				{/* <ProtectedRoute exact path='/product/:id' component={ProductDetails} /> */}

				<Route component={NotFound} />
			</Switch>
			{isAuthenticated && <Footer />}
		</Router>
	);
}

export default App;
