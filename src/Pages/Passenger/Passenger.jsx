import React, { useEffect, useState } from "react";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Passenger = () => {
  const [tableData, setTableData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");

  useEffect(() => {
    fetch(
      `https://dignitylimo.com/users/assets/json/useralltrips.php?passenger_email=${email}&passenger_phonenumber=${phoneNumber}`
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

    const handleCancel = () => {
      setSelectedItem(null);
    };

    const showDetailModal = (record) => {
      setSelectedItem(record);
    };

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
      title: <p className="text-center">Origin</p>,
      dataIndex: "trip_origin",
      key: "trip_origin",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Destination</p>,
      dataIndex: "trip_destination",
      key: "trip_destination",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Trip Date</p>,
      dataIndex: "trip_date",
      key: "trip_date",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Trip Time</p>,
      dataIndex: "trip_time",
      key: "trip_time",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">Luxury Service</p>,
      dataIndex: "trip_luxury_service",
      key: "trip_luxury_service",
      render: (item) => (
        <div className="flex items-center justify-center">{item}</div>
      ),
    },
    {
      title: <p className="text-center">State</p>,
      dataIndex: "state",
      key: "state",
      render: (stateSymbol, record) => {
        let state, color;
        switch (stateSymbol) {
          case "w":
            state = "Waiting";
            color = "blue";
            break;
          case "a":
            state = "Accepted";
            color = "yellow";
            break;
          case "f":
            state = "Regected";
            color = "red";
            break;
          case "s":
            state = "Success";
            color = "green";
            break;
          default:
            state = "Undefined";
            color = "black";
        }
        return (
          <div className="flex items-center justify-center">
            <Tag color={color} key={state}>
              {state.toUpperCase()}
            </Tag>
            <DocumentMagnifyingGlassIcon
              className="w-6"
              onClick={() => showDetailModal(record.id)}
            />
            <Modal
              width="100%"
              open={selectedItem === record.id}
              onOk={() => {
                setSelectedItem(null);
                console.log(record);
              }}
              onCancel={handleCancel}
              closable={false}
            >
              <h3 className="text-lg font-bold mb-2"> Trip Details: </h3>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Name : {record.passenger_name}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                E-mail : {record.passenger_email}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Phone Number : {record.passenger_phonenumber}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Origin : {record.trip_origin}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Destination : {record.trip_destination}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Trip Expense : {record.trip_expenses}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Number of Bags : {record.number_of_passenger_bags}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Number of Passengers : {record.number_of_passengers}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Luxury Service : {record.trip_luxury_service}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">
                Description : {record.trip_description}
              </p>
            </Modal>
          </div>
        );
      },
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
export default Passenger;
