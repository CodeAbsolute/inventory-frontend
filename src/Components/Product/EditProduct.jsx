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
	getAllCategories,
	getAllProducts,
	getProductDetails,
	updateProduct
} from "../../actions/productAction";
import TextArea from "antd/es/input/TextArea";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../Layouts/Loader/Loader";

const EditProductModal = ({ showModal, closeModal, productId }) => {
	const { Option } = Select;
	const dispatch = useDispatch();

	const { categories } = useSelector((state) => state.categories);
	const { product, loading } = useSelector((state) => state.productDetails);
	const { isUpdated } = useSelector((state) => state.product);

	const [selectedProduct, setSelectedProduct] = useState({});
	const [confirmLoading, setConfirmLoading] = useState(false);
	useEffect(() => {
		dispatch(getAllCategories());
		// console.log("useEffect categories: ", categories);
	}, []);

	const props = {
		listType: "picture",
		beforeUpload: (file) => {
			return false;
		},
		multiple: true,

		accept: "image/jpg, image/jpeg, image/png",

		fileList: selectedProduct.images,
		maxCount: 4
	};
	// console.log("selectedProduct: ", selectedProduct);
	useEffect(() => {
		dispatch(getProductDetails(productId));
		// console.log("useEffect product details: ", product);
	}, [productId]);
	// console.log("product: ", product);
	useEffect(() => {
		const defaultFileList = product?.images?.map((image, i) => {
			// console.log("image: ", image);
			return {
				uid: image?.id,
				name: `${image?.path}`.slice(9), // for removing products/ from the path
				status: "done",
				url: "http://localhost:8000/" + image?.path
			};
		});
		const productObj = {};
		productObj.name = product?.name;
		productObj.desc = product?.description;
		productObj.price = product?.price;
		productObj.categoryId = product?.category_id;
		productObj.inStock = product?.in_stock;
		productObj.images = defaultFileList;
		productObj.userId = product?.user_id;
		setSelectedProduct(productObj);
	}, [product]);

	const handleOk = (values) => {
		setConfirmLoading(true);
		onFinish(values);
		setTimeout(() => {
			closeModal();
			setConfirmLoading(false);
		}, 2000);
	};

	const onFinish = () => {
		// console.log("Received values of form: ", selectedProduct);
		const myForm = new FormData();
		myForm.set("name", selectedProduct.name);
		myForm.set("description", selectedProduct.desc);
		myForm.set("price", selectedProduct.price);
		myForm.set("category_id", +selectedProduct.categoryId);
		myForm.set("in_stock", selectedProduct.inStock);
		myForm.set("user_id", selectedProduct.userId);
		const onlyDeleteSelectedImagesArray = [];
		const saveImagesArray = [];

		for (let i = 0; i < selectedProduct.images.length; i++) {
			if (images[i].originFileObj) {
				myForm.append("images[]", images[i].originFileObj);
			} else {
				saveImagesArray.push(images[i].uid);
			}
		}
		// console.log("saveImagesArray: ", saveImagesArray);
		for (let i = 0; i < product.images.length; i++) {
			// console.log("product.images[i].id: ", product.images[i].id);
			const image = saveImagesArray.find(
				(imageId) => imageId === product.images[i].id
			);
			if (!image) onlyDeleteSelectedImagesArray.push(product.images[i].id);
		}
		// console.log(
		// 	"onlyDeleteSelectedImagesArray: ",
		// 	onlyDeleteSelectedImagesArray
		// );
		myForm.append(
			"onlyDeleteSelectedImagesArray",
			JSON.stringify(onlyDeleteSelectedImagesArray)
		);
		// console.log("myForm: ", myForm);
		dispatch(updateProduct(productId, myForm));
		if (isUpdated) message.success("Product Updated Successfully", 2000);
		dispatch({ type: UPDATE_PRODUCT_RESET });
		dispatch(getAllProducts());
	};
	const { name, desc, price, categoryId, inStock, images } = selectedProduct;

	return (
		<>
			<Modal
				title='Edit Product'
				maskClosable={false}
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
				{loading ? (
					<Loader />
				) : (
					<>
						<Form
							encType='multipart/form-data'
							name='editProduct'
							style={{ padding: "2vmax", width: "100%" }}
							onFinish={onFinish}>
							<Form.Item
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
								<Input
									name='name'
									onChange={(e) =>
										setSelectedProduct((prev) => ({
											...prev,
											name: e.target.value
										}))
									}
									placeholder='Enter Product Name'
									value={name}
								/>
							</Form.Item>

							<Form.Item
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
									name='description'
									onChange={(e) =>
										setSelectedProduct((prev) => ({
											...prev,
											desc: e.target.value
										}))
									}
									value={desc}
									placeholder='Product Description'
									autoSize={{ minRows: 2, maxRows: 6 }}
								/>
							</Form.Item>

							<Form.Item
								rules={[
									{
										required: true
									}
								]}>
								<InputNumber
									name='price'
									value={price}
									onChange={(value) => {
										if (value < 100)
											message.error("Price must be greater than 100");
										return setSelectedProduct((prev) => ({
											...prev,
											price: value
										}));
									}}
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
									placeholder='Please select a category'
									name='categoryId'
									value={categories[categoryId - 1]?.name}
									onChange={(e) =>
										setSelectedProduct((prev) => ({
											...prev,
											categoryId: e
										}))
									}>
									{categories.map((category) => (
										<Option key={category.name}>
											{`${category.name}`.charAt(0).toUpperCase() +
												`${category.name}`.slice(1)}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item label='In Stock ?'>
								<Radio.Group
									name='inStock'
									onChange={(e) =>
										setSelectedProduct((prev) => ({
											...prev,
											inStock: e.target.value
										}))
									}
									value={inStock}
									buttonStyle='solid'>
									<Radio.Button value={1}>Yes</Radio.Button>
									<Radio.Button value={0}>No</Radio.Button>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Upload
									{...props}
									className='upload-list-inline'
									name='images[]'
									onChange={(e) =>
										setSelectedProduct((prev) => ({
											...prev,
											images: e.fileList
										}))
									}>
									<Button icon={<UploadOutlined />}>
										Upload Product Images
									</Button>
								</Upload>
							</Form.Item>
						</Form>
					</>
				)}
			</Modal>
		</>
	);
};

export default EditProductModal;
