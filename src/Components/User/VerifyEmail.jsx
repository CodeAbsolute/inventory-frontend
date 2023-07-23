import React, { useEffect } from "react";
import { Button, message } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../actions/userAction";

function VerifyEmail({ match }) {
	const dispatch = useDispatch();
	// const { message: verifyMessage } = useSelector((state) => state.VerifyEmail);

	useEffect(() => {
		dispatch(verifyEmail(match.params.token));

		dispatch({ type: "CLEAR_ERRORS" });
	}, []);
	return (
		<>
			<div
				style={{
					textAlign: "center",
					marginTop: "100px",
					fontSize: "30px",
					fontWeight: "bold"
				}}>
				{/* {message.success(verifyMessage)} */}
				<Button type='primary'>
					<Link to={`/resetPassword/${match.params.token}`}>
						Reset your Password
					</Link>
				</Button>
			</div>
			<>
				<p>Email Verification Failed</p>
				<h3>Conatact Admin for further details</h3>
			</>
		</>
	);
}

export default VerifyEmail;
