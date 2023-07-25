import React, { useEffect } from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../actions/userAction";

function VerifyEmail({ match }) {
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(verifyEmail(match.params.token));
		message.success("Email Verified Successfully");
		history.push(`/resetPassword/${match.params.token}`);
		dispatch({ type: "CLEAR_ERRORS" });
	}, []);

	return <>Email Verified Successfully</>;
}

export default VerifyEmail;
