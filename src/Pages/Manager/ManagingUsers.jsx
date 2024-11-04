import React, { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";

const ManagingUsers = () => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    fetch(
    `https://dignitylimo.com/users/assets/json/allusers.php`
    )
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        console.log("Response Data:", data.data);
        setTableData(data.data);
        console.log(tableData);
      })
      .catch((error) => {
        console.log("Error Massage:", error.message);
      });
  }, []);


  const columns = [
    {
      title: <p className="text-center">ID</p>,
      dataIndex: "id",
      key: "id",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">First Name</p>,
      dataIndex: "first_name",
      key: "first_name",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Last Name </p>,
      dataIndex: "last_name",
      key: "last_name",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Phone Number</p>,
      dataIndex: "phone_number",
      key: "phone_number",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Email</p>,
      dataIndex: "email",
      key: "email",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Password</p>,
      dataIndex: "password",
      key: "password",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },

  ];
  return (
    <div>
      <h1 className="text-3xl p-4 mb-4 border-b-2">Your Trips </h1>
      <ConfigProvider
        theme={{
          token: {
            colorTextHeading: "white",
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          className="min-w-0 w-full table-fixed overflow-x-auto"
        />
      </ConfigProvider>
    </div>
  );
};
export default ManagingUsers;
