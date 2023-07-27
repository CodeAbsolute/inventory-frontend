import React, { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../actions/userAction";

function VerifyEmail({ history, match }) {
	const dispatch = useDispatch();
	const { success } = useSelector((state) => state.verifyEmail);
	useEffect(() => {
		dispatch(verifyEmail(match.params.token));
		if (success) message.success("Email Verified Successfully");
		history.push(`/resetPassword/${match.params.token}`);
		dispatch({ type: "CLEAR_ERRORS" });
	}, []);

	return <>Email Verified Successfully</>;
}

export default VerifyEmail;
