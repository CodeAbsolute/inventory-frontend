import { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./styles.css";
import MetaData from "../../MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userAction";

const ResetPassword = ({ history, match }) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	const { error, success, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const resetPasswordSubmit = () => {
		const myForm = new FormData();
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("confirmPassword", confirmPassword);
		dispatch(resetPassword(match.params.token, myForm));
	};

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			message.success("Password Updated Successfully");
			history.push("/login");
		}
	}, [error, success]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='reset-password-form-container'>
					<MetaData title={"Reset Password"} />
					<h1 className='title'>Reset Password</h1>
					<Form
						name='reset-password-form'
						className='reset-password-form'
						onFinish={resetPasswordSubmit}>
						<Form.Item
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							rules={[
								{
									required: true,
									message: "Please input your Password!"
								},
								{
									min: 6,
									message: "Password must be minimum 6 characters."
								},
								{
									max: 20,
									message: "Password must be maximum 20 characters."
								}
							]}>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Password'
							/>
						</Form.Item>
						<Form.Item
							name='confirmpassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							rules={[
								{
									required: true,
									message: "Please input your Password!"
								},
								{
									min: 6,
									message: "Password must be minimum 6 characters."
								},
								{
									max: 20,
									message: "Password must be maximum 20 characters."
								},
								{
									validator: (_, value) =>
										value === password
											? Promise.resolve()
											: Promise.reject(
													new Error(
														"The two passwords that you entered do not match!"
													)
											  )
								}
							]}>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Confirm Password'
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='reset-password-form-button'>
								Reset Password
							</Button>
						</Form.Item>
					</Form>
				</div>
			)}
		</>
	);
};
export default ResetPassword;
