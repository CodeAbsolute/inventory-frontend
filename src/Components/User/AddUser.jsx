import { useEffect, useState } from "react";
import {
	ContactsOutlined,
	LockOutlined,
	MailOutlined,
	UserOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import "./styles.css";
import MetaData from "../../MetaData";
import { addNewUser, getAllUsers } from "../../actions/userAction";

const AddUser = ({ showModal, closeModal }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);

	const dispatch = useDispatch();
	const { success, message } = useSelector((state) => state.addUser);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phone: ""
	});

	const handleOk = (e) => {
		if (success) {
			message.success("User Added Successfully");
		}

		setConfirmLoading(true);
		setTimeout(() => {
			closeModal();
			setConfirmLoading(false);
		}, 2000);
		onFinish(values);
	};

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
		const myForm = new FormData();
		myForm.set("name", values.name);
		myForm.set("email", values.email);
		myForm.set("password", values.password);
		myForm.set("phone", +values.phone);
		dispatch(addNewUser(myForm));
		dispatch(getAllUsers());
	};

	return (
		<>
			{/* <MetaData title={"Add User"} /> */}
			<Modal
				title='Add User'
				open={showModal}
				centered
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={closeModal}
				footer={[
					<Button key='cancel' onClick={closeModal}>
						Cancel
					</Button>,
					<Button
						key='submit'
						type='primary'
						htmlType='submit'
						loading={confirmLoading}
						onClick={handleOk}>
						Add
					</Button>
				]}>
				<Form
					name='addUser'
					className='add-user-form'
					initialValues={{
						remember: true,
						prefix: "91"
					}}
					onFinish={onFinish}>
					<Form.Item
						name='name'
						value={values.name}
						onChange={(e) => setValues({ ...values, name: e.target.value })}
						rules={[
							{
								required: true,
								message: "Please input your Name!"
							},
							{
								message: "Name must be minimum of 10 characters.",
								min: 10,
								max: 100
							}
						]}>
						<Input
							prefix={
								<UserOutlined
									className='site-form-item-icon'
									style={{ marginRight: "10px" }}
								/>
							}
							placeholder='Enter your name'
						/>
					</Form.Item>
					<Form.Item
						name='email'
						value={values.email}
						onChange={(e) => setValues({ ...values, email: e.target.value })}
						rules={[
							{
								required: true,
								type: "email",
								message: "The input is not valid E-mail!"
							}
						]}>
						<Input
							prefix={
								<MailOutlined
									className='site-form-item-icon'
									style={{ marginRight: "10px" }}
								/>
							}
							placeholder='Enter your email address'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						value={values.password}
						onChange={(e) => setValues({ ...values, password: e.target.value })}
						rules={[
							{
								required: true,
								message: "Please input your Password!"
							},
							{
								min: 6,
								message: "Password must be minimum of 6 characters."
							},
							{
								max: 12,
								message: "Password must be maximum of 12 characters."
							}
						]}>
						<Input
							prefix={
								<LockOutlined
									className='site-form-item-icon'
									style={{ marginRight: "10px" }}
								/>
							}
							type='password'
							placeholder='Enter Password'
						/>
					</Form.Item>
					<Form.Item
						name='phone'
						value={values.phone}
						onChange={(e) => setValues({ ...values, phone: e.target.value })}
						rules={[
							{
								required: true,
								message: "Phone number must be of 10 digits!"
							}
						]}>
						<InputNumber
							prefix={
								<ContactsOutlined
									className='site-form-item-icon'
									style={{ marginRight: "10px" }}
								/>
							}
							// addonBefore={prefixSelector}
							style={{
								width: "100%"
							}}
							placeholder='Enter your phone number'
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddUser;
