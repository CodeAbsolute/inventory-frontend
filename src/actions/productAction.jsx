import axios from "axios";

import {
	ALL_CATEGORY_FAIL,
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	CLEAR_ERRORS
} from "../constants/productConstants";

// Get All Products
export const getAllCategories = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_CATEGORY_REQUEST });

		const { data } = await axios.get("/category");

		dispatch({
			type: ALL_CATEGORY_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ALL_CATEGORY_FAIL,
			payload: error.response.data.message
		});
	}
};
// Get All Products
export const getAllProducts = (category) => async (dispatch) => {
	try {
		dispatch({ type: ALL_PRODUCT_REQUEST });

		let link = `/products`;

		if (category) {
			link = `/products?category=${category}`;
		}

		const { data } = await axios.get(link);

		// console.log(`get all products data: ${data}`);
		dispatch({
			type: ALL_PRODUCT_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ALL_PRODUCT_FAIL,
			payload: error.response.data.message
		});
	}
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PRODUCT_REQUEST });

		const { data } = await axios.post(`/products`, productData);
		console.log(`create product data: ${data}`);

		dispatch({
			type: NEW_PRODUCT_SUCCESS,
			payload: data
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: NEW_PRODUCT_FAIL,
			payload: error.response.data.message
		});
	}
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });
		console.log(
			"🚀 ~ file: productAction.jsx:91 ~ updateProduct ~ product̥Data:",
			productData
		);
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};
		productData.set("_method", "PUT");
		const { data } = await axios.post(`/products/${id}`, productData, config);
		console.log(`update product data: ${data}`);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		console.log("update product error:", error);
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload: error.response
		});
	}
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const { data } = await axios.delete(`/products/${id}`);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error.response.data.message
		});
	}
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/products/${id}`);
		console.log(`get product details data: ${data.product}`, data);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.product
		});
	} catch (error) {
		console.log("get product details error", error);
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
