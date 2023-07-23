import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct } from "../../actions/productAction";
import MetaData from "../../MetaData";
import Loader from "../Layouts/Loader/Loader";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductListings = () => {
	// const editProduct = (record) => {
	// 	console.log(record);
	// 	setProduct(record.key);
	// 	setEditing(true);
	// 	setTableloading(true);
	// };

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
			key: "images",
			render: (images) => (
				<img
					src={`http://localhost:8000/${images[0]?.path}`}
					alt='product image'
					style={{ padding: 0, margin: 0, width: "100%", height: "50px" }}
				/>
			)
		},
		{
			title: "Product ID",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Product Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Product Description",
			dataIndex: "description",
			key: "description"
		},
		{
			title: "In Stock",
			dataIndex: "in_stock",
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
			key: "category_id",
			render: (_, record) => {
				return <p>{record.category.name}</p>;
			}
		},
		{
			title: "Price(₹)",
			dataIndex: "price",
			key: "price"
		},
		{
			title: "User ID",
			dataIndex: "user_id",
			key: "user_id"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (_, record) => (
				<Space size='small'>
					<Link to={`/product/update/${record.key}`}>Edit </Link>
					{/* <EditOutlined onClick={() => editProduct(record)} /> */}
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

	// const [editing, setEditing] = useState(false);
	const [visible, setVisible] = useState(false);
	const [tableloading, setTableloading] = useState(false);
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.products);
	// const [product, setProduct] = useState({});
	// Adding the key property to the users array
	const data = products?.reverse()?.map((product) => {
		return {
			key: product.id,
			...product
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
						<Table
							columns={columns}
							dataSource={data}
							bordered={true}
							loading={tableloading}
							scrollToFirstRowOnChange={true}
							pagination={{ pageSize: 5, position: ["bottomCenter"] }}
						/>
					</div>
					<AddProduct
						showModal={visible}
						closeModal={() => {
							setVisible(false);
							setTableloading(false);
						}}
					/>
					{/* <EditProduct
						isEditing={editing}
						productId={product}
						closeModal={() => {
							setEditing(false);
							setTableloading(false);
						}}
					/> */}
				</>
			)}
		</>
	);
};

export default ProductListings;
