import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	Radio,
	Select,
	Upload,
	message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
	clearErrors,
	createProduct,
	getAllCategories,
	getAllProducts
} from "../../actions/productAction";
import TextArea from "antd/es/input/TextArea";

const AddProduct = ({ showModal, closeModal }) => {
	const { Option } = Select;
	const dispatch = useDispatch();
	const [fileList, setFileList] = useState([]);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const { success } = useSelector((state) => state.addUser);
	const { categories, error } = useSelector((state) => state.categories);

	const { user } = useSelector((state) => state.user);
	const [values, setValues] = useState({
		name: "",
		in_stock: "",
		category_id: "Select Category",
		user_id: user.id ? user.id : "",
		description: "",
		price: "",
		images: ""
	});

	// console.log("user: ", user.id);
	const in_stock_options = [
		{
			label: "Yes",
			value: true
		},
		{
			label: "No",
			value: false
		}
	];

	const props = {
		listType: "picture",
		multiple: true,
		accept: "image/jpg, image/jpeg, image/png",
		beforeUpload: (file, filesArray) => {
			if (fileList.length > 4) {
				message.error("You can only upload 4 images");
				return false;
			}
			const allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];
			let count = 0;
			let files = filesArray.filter((file) => {
				const isAllowed = allowedExtensions.includes(file.type);
				!isAllowed && count++;
				return isAllowed;
			});

			if (count > 0) {
				setFileList([]);
				message.error(`Image must be a jpg, jpeg or png file`);
				return false;
			}

			setFileList(files);
			return isAllowed || Upload.LIST_IGNORE;
		},
		maxCount: 4
	};

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}
		// dispatch(loadUser());
		dispatch(getAllCategories());
	}, []);

	const handleOk = (e) => {
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
		myForm.set("description", values.description);
		myForm.set("price", values.price);
		myForm.set("category_id", +values.category_id);
		myForm.set("in_stock", values.in_stock ? 1 : 0);
		myForm.set("user_id", values.user_id);
		for (let i = 0; i < values.images.length; i++) {
			myForm.append("images[]", values.images[i].originFileObj);
		}
		dispatch(createProduct(myForm));
		if (success) message.success("Product Added Successfully");
		dispatch(getAllProducts());
	};

	return (
		<>
			<Modal
				title='Add Product'
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
						Submit
					</Button>
				]}>
				<Form
					encType='multipart/form-data'
					name='addProduct'
					style={{ padding: "2vmax", width: "100%" }}
					onFinish={onFinish}>
					<Form.Item
						name='name'
						value={values.name}
						onChange={(e) => {
							return setValues({ ...values, name: e.target.value });
						}}
						rules={[
							{
								required: true,
								message: "Enter Product Name!"
							},
							{
								min: 10,
								max: 100,
								message: "Product Name must be minimum of 10 characters."
							}
						]}>
						<Input placeholder='Enter Product Name' />
					</Form.Item>
					<Form.Item
						name='description'
						value={values.description}
						onChange={(e) =>
							setValues({ ...values, description: e.target.value })
						}
						rules={[
							{
								required: true,
								message: "Enter Product Description!"
							},
							{
								max: 1000,
								message:
									"Product Description must be maximum of 1000 characters."
							}
						]}>
						<TextArea
							placeholder='Product Description'
							autoSize={{ minRows: 2, maxRows: 6 }}
						/>
					</Form.Item>
					<Form.Item
						name='price'
						value={values.price}
						onChange={(e) => {
							if (e.target.value < 100)
								message.error("Price must be greater than 100");

							return setValues({ ...values, price: e.target.value });
						}}
						rules={[
							{
								required: true
							}
						]}>
						<InputNumber
							style={{ width: "100%" }}
							min={100}
							max={1000000000000}
							width='100%'
							placeholder='Enter Product Price'
							minLength={2}
						/>
					</Form.Item>
					<Form.Item
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please select your product category!"
							}
						]}>
						<Select
							name='category'
							placeholder='Please select a category'
							value={values.category_id}
							onChange={(value) => {
								console.log(value);
								return setValues({ ...values, category_id: value });
							}}>
							{categories?.map((category) => (
								<Option key={category.id}>
									{`${category.name}`.charAt(0).toUpperCase() +
										`${category.name}`.slice(1)}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name='in_stock' label='In Stock ?' required>
						<Radio.Group
							options={in_stock_options}
							onChange={(e) =>
								setValues({ ...values, in_stock: e.target.value })
							}
							value={values.in_stock}
							optionType='button'
							buttonStyle='solid'
						/>
					</Form.Item>
					<Upload
						{...props}
						name='images[]'
						onChange={(e) => {
							// console.log(e);
							if (e.fileList.length > 4) {
								message.error("You can only upload 4 images");
								return false;
							}
							setValues({ ...values, images: e.fileList });
						}}>
						<Button icon={<UploadOutlined />}>Upload Product Images</Button>
					</Upload>
				</Form>
			</Modal>
		</>
	);
};
export default AddProduct;
