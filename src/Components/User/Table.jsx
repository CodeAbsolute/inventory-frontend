import React, { useEffect, useState } from "react";
import {
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Table,
	Typography,
	Space
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userAction";
import { getAllProducts, updateProduct } from "../../actions/productAction";

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
const Tablex = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const { error, products } = useSelector((state) => state.products);
	const originData = products.map((product) => {
		return {
			key: product.id,
			...product
		};
	});
	// const [data, setData] = useState(originData);
	const [tableloading, setTableloading] = useState(false);
	const [editingKey, setEditingKey] = useState("");
	const isEditing = (record) => record.key === editingKey;

	const edit = (record) => {
		form.setFieldsValue({
			name: "",
			in_stock: "",
			description: "",
			price: "",
			category_id: "",
			user_id: "",
			images: "",
			...record
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const deleteProduct = () => {
		console.log("delete product");
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row
				});
				// setData(newData);
				dispatch(updateProduct(key, newData[index]));
				dispatch(getAllProducts());
			} else {
				// newData.push(row);
				setData(newData);
			}
			setEditingKey("");
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "Product Image",
			dataIndex: "images",
			editable: true,
			key: "images",
			render: (images) => (
				<img
					src={`http://localhost:8000/${images[0]}`}
					alt='product image'
					style={{ padding: 0, margin: 0, width: "100%", height: "50px" }}
				/>
			)
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
			title: "operation",
			dataIndex: "operation",
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
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space size='small'>
					<Popconfirm
						title='Delete this User?'
						description='Are you sure to delete this user?'
						okText='Yes'
						cancelText='No'>
						<DeleteOutlined style={{ color: "red" }} onClick={deleteProduct} />
					</Popconfirm>
				</Space>
			)
		}
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: ["price", "category_id", "user_id", "in_stock"].includes(
					col.dataIndex
				)
					? "number"
					: "text",
				dataIndex: col.dataIndex,
				title: col.title,
				key: col.key,
				editing: isEditing(record)
			})
		};
	});

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
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell
					}
				}}
				// style={{ position: "absolute", top: "100%", fontSize: "12px" }}
				bordered
				dataSource={data}
				columns={mergedColumns}
				rowClassName='editable-row'
				pagination={{
					onChange: cancel
				}}
			/>
		</Form>
	);
};
export default Tablex;
