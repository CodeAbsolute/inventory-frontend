import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	ADD_USER_FAIL,
	ADD_USER_REQUEST,
	ADD_USER_SUCCESS,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	VERIFY_EMAIL_REQUEST,
	VERIFY_EMAIL_SUCCESS,
	VERIFY_EMAIL_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	DELETE_USER_RESET,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	CLEAR_ERRORS,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL
} from "../constants/userConstants";

// Login, Logout, Load User
export const userReducer = (state = { user: {}, token: null }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
				token: null
			};
		case LOGIN_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload
			};

		case LOGOUT_SUCCESS:
			return {
				loading: false,
				user: null,
				isAuthenticated: false,
				token: null
			};
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload
			};

		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload
			};

		case LOGOUT_FAIL:
			return {
				...state,
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

// to add a user
export const addUserReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_USER_REQUEST:
			return {
				...state,
				loading: true
			};

		case ADD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				message: action.payload.message
			};
		case ADD_USER_FAIL:
			return {
				...state,
				loading: false,
				success: false,
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
// to delete a user
export const deleteUserReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_USER_REQUEST:
			return {
				...state,
				loading: true
			};

		case DELETE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload.success,
				message: action.payload.message
			};
		case DELETE_USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};

		case DELETE_USER_RESET:
			return {
				...state,
				isDeleted: false
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
// forgot password and reset password
export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				error: null
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload
			};

		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload
			};

		case FORGOT_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
			return {
				...state,
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

export const verifyEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case VERIFY_EMAIL_REQUEST:
			return {
				...state,
				loading: true,
				success: false
			};
		case VERIFY_EMAIL_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				message: action.payload.message
			};

		case VERIFY_EMAIL_FAIL:
			return {
				...state,
				loading: false,
				success: false,
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
// get all users details
export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return {
				...state,
				loading: true
			};
		case ALL_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload
			};

		case ALL_USERS_FAIL:
			return {
				...state,
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

// get single user details
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true
			};
		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload
			};

		case USER_DETAILS_FAIL:
			return {
				...state,
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
