import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import AddUser from "./AddUser";
import MetaData from "../../MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import { clearErrors, getAllUsers, deleteUser } from "../../actions/userAction";

const UserListingTable = () => {
	const [visible, setVisible] = useState(false);
	const deleteUserFromTable = (id) => {
		message.success("User Deleted Successfully");
		dispatch(deleteUser(id));
		setTableloading(true);
		dispatch(getAllUsers());
		setTableloading(false);
	};

	const dispatch = useDispatch();
	const { error, users, loading } = useSelector((state) => state.allUsers);
	// Adding the key property to the users array
	const data = users.map((user) => {
		return {
			key: user.id,
			...user
		};
	});
	const [tableloading, setTableloading] = useState(false);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Phone Number",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "id",
			render: (_, record) => (
				<Space size='small'>
					<Popconfirm
						title='Delete User?'
						description='Are you sure you want to delete this user?'
						okText='Yes'
						cancelText='No'
						onConfirm={() => deleteUserFromTable(record.key)}>
						<Button type='primary' danger size='small'>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			)
		}
	];

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}
		dispatch(getAllUsers());
		setTableloading(false);
	}, [dispatch, error]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={"Users Listings"} />
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
							Add New User
						</Button>
						<h1>Users Listings Table</h1>
						<Table
							columns={columns}
							dataSource={data}
							bordered={true}
							loading={tableloading}
							scrollToFirstRowOnChange={true}
							pagination={{ pageSize: 5, position: ["bottomCenter"] }}
						/>
						<AddUser
							showModal={visible}
							closeModal={() => {
								setVisible(false);
								setTableloading(false);
							}}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default UserListingTable;
