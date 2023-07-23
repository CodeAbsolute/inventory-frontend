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
	NEW_PRODUCT_RESET,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_RESET,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_RESET,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	CLEAR_ERRORS
} from "../constants/productConstants";

export const categoriesReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case ALL_CATEGORY_REQUEST:
			return {
				loading: true,
				categories: []
			};
		case ALL_CATEGORY_SUCCESS:
			return {
				loading: false,
				categories: action.payload.categories,
				categoriesCount: action.payload.count
			};

		case ALL_CATEGORY_FAIL:
			return {
				loading: false,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case ALL_PRODUCT_REQUEST:
			return {
				loading: true,
				products: []
			};
		case ALL_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				productsCount: action.payload.count
			};

		case ALL_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const newProductReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case NEW_PRODUCT_REQUEST:
			return {
				...state,
				loading: true
			};
		case NEW_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				product: action.payload.product
			};
		case NEW_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case NEW_PRODUCT_RESET:
			return {
				...state,
				success: false
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
// update and delete product
export const productReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PRODUCT_REQUEST:
		case UPDATE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true
			};
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload
			};

		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload
			};
		case DELETE_PRODUCT_FAIL:
		case UPDATE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false
			};
		case UPDATE_PRODUCT_RESET:
			return {
				...state,
				isUpdated: false
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
