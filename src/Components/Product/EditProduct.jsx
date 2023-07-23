import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Upload,
	message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
	clearErrors,
	getAllCategories,
	getAllProducts,
	getProductDetails,
	updateProduct
} from "../../actions/productAction";
import TextArea from "antd/es/input/TextArea";
import MetaData from "../../MetaData";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const EditProduct = ({ history, match }) => {
	const productId = match.params.id;
	// console.log("edit product: ", productId);

	const { Option } = Select;
	const dispatch = useDispatch();
	const [oldFileList, setOldFileList] = useState([]);

	const { categories, error: categoriesError } = useSelector(
		(state) => state.categories
	);
	const { error: productDetailsErrors, product } = useSelector(
		(state) => state.productDetails
	);
	const {
		loading,
		error: updateError,
		isUpdated
	} = useSelector((state) => state.product);

	const [selectedProduct, setSelectedProduct] = useState({});

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

	useEffect(() => {
		dispatch(getProductDetails(productId));
		// console.log("useEffect product details: ", product);
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllCategories());
		// console.log("useEffect categories: ", categories);
	}, []);

	useEffect(() => {
		const defaultFileList = product?.images?.map((image, i) => {
			return {
				uid: i,
				name: `${image?.path}`.slice(9), // for removing products/ from the path
				status: "done",
				url: "http://localhost:8000/" + product.images[0]?.path
			};
		});
		const productObj = {};
		productObj.name = product.name;
		productObj.desc = product.description;
		productObj.price = product.price;
		productObj.categoryId = product.category_id;
		productObj.inStock = product.in_stock;
		productObj.images = defaultFileList;
		productObj.userId = product.user_id;
		setSelectedProduct(productObj);
		setOldFileList(productObj.images);
	}, [product]);

	useEffect(() => {
		if (productDetailsErrors || categoriesError || updateError) {
			message.error(productDetailsErrors || categoriesError || updateError);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			message.success("Product Updated Successfully");
			history.push("/products");
			dispatch({ type: UPDATE_PRODUCT_RESET });
		}
	}, [productDetailsErrors, categoriesError, updateError, isUpdated, history]);

	const onFinish = () => {
		// console.log("Received values of form: ", selectedProduct);
		const myForm = new FormData();

		myForm.set("name", selectedProduct.name);
		myForm.set("description", selectedProduct.desc);
		myForm.set("price", selectedProduct.price);
		myForm.set("category_id", +selectedProduct.categoryId);
		myForm.set("in_stock", selectedProduct.inStock);
		myForm.set("user_id", selectedProduct.userId);
		for (let i = 0; i < selectedProduct.images.length; i++) {
			if (images[i].originFileObj) {
				myForm.append("images[]", images[i].originFileObj);
			} else {
				myForm.append("old_images[]", images[i]);
			}
		}
		// console.log("myForm: ", myForm);
		dispatch(updateProduct(productId, myForm));
		message.success("Product Updated Successfully", 2000);
		history.push("/products");
	};
	const { name, desc, price, categoryId, inStock, images } = selectedProduct;
	// console.log("selectedProduct: ", selectedProduct);
	return (
		<>
			<MetaData title={"Update Product"} />

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
							setSelectedProduct((prev) => ({ ...prev, name: e.target.value }))
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
							message: "Product Description must be maximum of 1000 characters."
						}
					]}>
					<TextArea
						name='description'
						onChange={(e) =>
							setSelectedProduct((prev) => ({ ...prev, desc: e.target.value }))
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
							if (value < 100) message.error("Price must be greater than 100");
							return setSelectedProduct((prev) => ({ ...prev, price: value }));
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
							setSelectedProduct((prev) => ({ ...prev, images: e.fileList }))
						}>
						<Button icon={<UploadOutlined />}>Upload Product Images</Button>
					</Upload>
				</Form.Item>

				<Form.Item>
					<Button>
						<Link to='/products'>Cancel</Link>
					</Button>
					<Button type='primary' htmlType='submit'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
export default EditProduct;
