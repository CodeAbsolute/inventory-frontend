import { useState, useEffect } from "react";
import "./styles.css";
import Loader from "../Layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import MetaData from "../../MetaData";
import { Button, Form, Input, message as messageAlert } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
	const dispatch = useDispatch();

	const { error, message, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const [email, setEmail] = useState("");

	const forgotPasswordSubmit = () => {
		const myForm = new FormData();
		myForm.set("email", email);

		dispatch(forgotPassword(myForm));
	};

	useEffect(() => {
		if (error) {
			messageAlert.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			messageAlert.success(message);
		}
	}, [dispatch, error, messageAlert, message]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title='Forgot Password' />
					<div className='forgot-password-form-container'>
						<h1 className='title'>Forgot Password</h1>

						<Form
							name='forgot-password-form'
							className='forgot-password-form'
							onFinish={forgotPasswordSubmit}>
							<Form.Item
								name='email'
								className='forgot-password-form-input'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								rules={[
									{
										required: true,
										type: "email",
										message: "The input is not valid E-mail!"
									}
								]}>
								<Input
									prefix={<UserOutlined className='site-form-item-icon' />}
									placeholder='Enter your email'
								/>
							</Form.Item>

							<Button
								type='primary'
								htmlType='submit'
								className='forgot-password-form-btn'>
								Send Email
							</Button>
						</Form>
					</div>
				</>
			)}
		</>
	);
};

export default ForgotPassword;
