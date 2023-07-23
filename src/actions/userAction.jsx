import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
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
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	CLEAR_ERRORS,
	ADD_USER_REQUEST,
	ADD_USER_SUCCESS,
	ADD_USER_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL
} from "../constants/userConstants";
import axios from "../axios";

// Login
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const { data } = await axios.post(`/login`, { email, password });
		console.log("data", data);
		// add token to local storage
		localStorage.setItem("token", data.token);

		dispatch({ type: LOGIN_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
	}
};

// add new user
export const addNewUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: ADD_USER_REQUEST });

		const { data } = await axios.post(`/users`, userData);

		dispatch({ type: ADD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		console.log("error:", error);
		dispatch({
			type: ADD_USER_FAIL,
			payload: error.response.data.message
		});
	}
};

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await axios.get(`/user`);

		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		console.log("error:", error);
		dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
	}
};

// Logout User
export const logout = () => async (dispatch) => {
	try {
		await axios.get(`/logout`);
		localStorage.removeItem("token");
		dispatch({ type: LOGOUT_SUCCESS });
	} catch (error) {
		console.log("error:", error.response.data.message);
		dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
	}
};

// Update Password
export const verifyEmail = (token) => async (dispatch) => {
	try {
		dispatch({ type: VERIFY_EMAIL_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.get(`/verifyEmail/${token}`, config);

		dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: VERIFY_EMAIL_FAIL,
			payload: error.response.data.message
		});
	}
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const { data } = await axios.post(`/forgotPassword`, email);
		console.log("data", data);
		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
	} catch (error) {
		console.log("🚀 ~ file: userAction.jsx:121 ~ forgotPassword ~ ̥:", error);
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message
		});
	}
};

// Reset Password
export const resetPassword = (token, formData) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });
		formData.append("_method", "PUT");

		const { data } = await axios.post(`/resetPassword/${token}`, formData);

		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload: error.response.data.message.error
		});
	}
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_USERS_REQUEST });
		const { data } = await axios.get(`/users`);
		console.log("data: ", data);

		dispatch({ type: ALL_USERS_SUCCESS, payload: data.users.reverse() });
	} catch (error) {
		dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
	}
};

// get single User Details
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		const { data } = await axios.get(`/users/${id}`);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
	}
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USER_REQUEST });

		const { data } = await axios.delete(`/users/${id}`);
		console.log("data: ", data);
		dispatch({ type: DELETE_USER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: error.response.data.message
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
