import { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";
import MetaData from "../../MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import { clearErrors, login } from "../../actions/userAction";

const Login = ({ history }) => {
	const dispatch = useDispatch();
	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (isAuthenticated) {
			history.push("/products");
			message.success("Login Successful");
		}
	}, [dispatch, error, history, isAuthenticated]);

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
		dispatch(login(loginEmail, loginPassword));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='login-form-container'>
					<MetaData title={"Login Page"} />
					<h1 className='title'>Login</h1>
					<Form
						name='normal_login'
						className='login-form'
						initialValues={{
							remember: true
						}}
						onFinish={onFinish}>
						<Form.Item
							name='email'
							value={loginEmail}
							onChange={(e) => setLoginEmail(e.target.value)}
							rules={[
								{
									required: true,
									message: "Please input your Username!"
								},
								{
									type: "email",
									message: "The input is not valid E-mail!"
								}
							]}>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='Username'
							/>
						</Form.Item>
						<Form.Item
							name='password'
							value={loginPassword}
							onChange={(e) => setLoginPassword(e.target.value)}
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
						<Form.Item>
							<Link className='login-form-forgot' to='/forgotPassword'>
								Forgot password?
							</Link>
						</Form.Item>

						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'>
								Log in
							</Button>
						</Form.Item>
					</Form>
				</div>
			)}
		</>
	);
};
export default Login;
