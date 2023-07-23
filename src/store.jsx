import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	categoriesReducer,
	newProductReducer,
	productDetailsReducer,
	productReducer,
	productsReducer
} from "./reducers/productReducer";

import {
	allUsersReducer,
	forgotPasswordReducer,
	userDetailsReducer,
	userReducer,
	deleteUserReducer,
	addUserReducer,
	verifyEmailReducer
} from "./reducers/userReducer";

const reducer = combineReducers({
	verifyEmail: verifyEmailReducer, // verify email
	addUser: addUserReducer, // add user
	user: userReducer, // login, logout and load user
	allUsers: allUsersReducer, // all users
	userDetails: userDetailsReducer, // single user details
	deleteUser: deleteUserReducer, // delete user
	forgotPassword: forgotPasswordReducer, // forgot password
	products: productsReducer, // all products
	productDetails: productDetailsReducer, // single product details
	newProduct: newProductReducer, // new product
	product: productReducer, // update and delete product
	categories: categoriesReducer // all categories
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
