import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllProducts,
	deleteProduct,
	updateProduct
} from "../../actions/productAction";
import Loader from "../Layouts/Loader/Loader";
import MetaData from "../../MetaData";
import AddProduct from "./AddProduct";
import {
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Typography,
	Space,
	Table,
	message,
	Button,
	Upload
} from "antd";

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`
						}
					]}>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};
const ProductTable = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [editingKey, setEditingKey] = useState("");
	const [visible, setVisible] = useState(false);
	const [tableloading, setTableloading] = useState(false);
	const { loading, error, products } = useSelector((state) => state.products);
	const [product, setProduct] = useState({});
	// Adding the key property to the users array
	const originData = products.map((product) => {
		return {
			key: product.id,
			...product
		};
	});
	const defaultFileList = product?.images?.map((image, i) => {
		return {
			uid: i,
			name: `${image?.path}`.slice(9), // for removing products/ from the path
			status: "done",
			url: "http://localhost:8000/" + product.images[0]?.path
		};
	});

	const [data, setData] = useState(originData);
	const isEditing = (record) => record.key === editingKey;

	const edit = (record) => {
		form.setFieldsValue({
			name: "",
			id: "",
			price: "",
			description: "",
			category_id: "",
			user_id: "",
			in_stock: "",
			images: "",
			...record
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			console.log("row: ", row);
			dispatch(updateProduct(key, row));
			dispatch(getAllProducts());
			console.log("products: ", products, "originData: ", originData);
			setData(originData);
			setEditingKey("");
			/*
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row
				});
				setData(newData);
				setEditingKey("");
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("");
			}
			console.log("newData: ", newData);
      */
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const deleteProductFromTable = (id) => {
		// console.log("delete product");
		message.success("Product Deleted Successfully");
		dispatch(deleteProduct(id));
		setTableloading(true);
		dispatch(getAllProducts());
		setTableloading(false);
	};

	const columns = [
		{
			title: "Product Image",
			dataIndex: "images",
			// editable: true,
			key: "images",
			render: (images, record) => {
				const editable = isEditing(record);
				return editable == false ? (
					<img
						src={`http://localhost:8000/${images[0]?.path}`}
						alt='product image'
						style={{ padding: 0, margin: 0, width: "100%", height: "50px" }}
					/>
				) : (
					<Form.Item>
						<Upload
							defaultFileList={defaultFileList}
							listType='picture'
							multiple
							accept='.jpg, .png, .jpeg'
							maxCount={4}>
							Upload Images
						</Upload>
					</Form.Item>
				);
			}
		},
		{
			title: "Product ID",
			dataIndex: "key",
			editable: true,
			key: "key"
		},
		{
			title: "Product Name",
			dataIndex: "name",
			editable: true,
			key: "name"
		},
		{
			title: "Product Description",
			dataIndex: "description",
			editable: true,
			key: "description"
		},
		{
			title: "In Stock",
			dataIndex: "in_stock",
			editable: true,
			key: "in_Stock",
			render: (in_stock) => {
				if (in_stock) {
					return <p>Yes</p>;
				} else {
					return <p>No</p>;
				}
			}
		},
		{
			title: "Category Name",
			dataIndex: "category_id",
			editable: true,
			key: "category_id",
			render: (_, record) => {
				return <p>{record.category.name}</p>;
			}
		},
		{
			title: "Price(₹)",
			dataIndex: "price",
			editable: true,
			key: "price"
		},
		{
			title: "User ID",
			dataIndex: "user_id",
			editable: true,
			key: "user_id"
		},
		{
			title: "Action",
			dataIndex: "edit",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{
								marginRight: 8
							}}>
							Save
						</Typography.Link>
						<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ""}
						onClick={() => edit(record)}>
						Edit
					</Typography.Link>
				);
			}
		},
		{
			title: "Delete",
			dataIndex: "delete",
			key: "action",
			render: (_, record) => (
				<Space size='small'>
					<Popconfirm
						title='Delete this User?'
						description='Are you sure to delete this user?'
						okText='Yes'
						cancelText='No'
						onConfirm={() => deleteProductFromTable(record.key)}>
						<DeleteOutlined style={{ color: "red" }} />
					</Popconfirm>
				</Space>
			)
		}
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		const numberTypeFields = [
			"price",
			"user_id",
			"key",
			"in_stock",
			"category_id"
		];
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: numberTypeFields.includes(col.dataIndex) ? "number" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record)
			})
		};
	});

	/* useEffect called */
	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}
		setTableloading(true);
		dispatch(getAllProducts());
		setTableloading(false);
	}, [dispatch, error]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={"Product Listings"} />
					<div
						className='table-container'
						style={{
							marginTop: "10vh",
							textAlign: "center",
							padding: "50px",
							marginBottom: "1vh"
						}}>
						<Button
							type='primary'
							onClick={() => {
								setVisible(true);
								setTableloading(true);
							}}
							style={{ float: "right" }}>
							Add New Product
						</Button>
						<h1>Product Listings Table</h1>
						<Form form={form} component={false}>
							<Table
								components={{
									body: {
										cell: EditableCell
									}
								}}
								bordered
								dataSource={data}
								columns={mergedColumns}
								rowClassName='editable-row'
								pagination={{
									pageSize: 5,
									position: ["bottomCenter"],
									onChange: cancel
								}}
							/>
						</Form>
					</div>
					<AddProduct
						showModal={visible}
						closeModal={() => {
							setVisible(false);
							setTableloading(false);
						}}
					/>
				</>
			)}
		</>
	);
};
export default ProductTable;
// .editable-row .ant-form-item-explain {
//   position: absolute;
//   top: 100%;
//   font-size: 12px;
// }
