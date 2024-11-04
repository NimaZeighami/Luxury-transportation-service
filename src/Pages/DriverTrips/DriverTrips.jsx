import React, { useEffect, useState } from "react";
import { ConfigProvider, Input, Modal, Table, Tag } from "antd";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Driver = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const driverId = localStorage.getItem("driverId");

  useEffect(() => {
    fetch(
      `https://dignitylimo.com/users/assets/json/driveralltrips.php?driver_id=${driverId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data.data);
      })
      .catch((error) => {
        console.log("Error Message:", error.message);
      });
  }, [driverId]);

  const handleFinish = (id) => {
    fetch("https://dignitylimo.com/users/requests.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "finish_trip",
        id: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Update the state after a successful finish operation
        setTableData((prevData) =>
          prevData.map((item) => {
            if (item.id === id) {
              return { ...item, state: "s", finished: true }; // Mark as finished
            }
            return item;
          })
        );
      })
      .catch((error) => {
        console.log("Error Message:", error.message);
      });
  };

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
      title: <p className="text-center">State</p>,
      dataIndex: "state",
      key: "state",
      render: (stateSymbol) => {
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
            state = "Rejected";
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
          </div>
        );
      },
    },
    {
      title: <p className="text-center">Operation</p>,
      dataIndex: "Operation",
      key: "5",
      render: (_, record) => {
        return (
          <div className="flex justify-center items-center">
            {record.state === "s" ? (
              <span className="text-green-500">FINISHED</span>
            ) : record.finished ? (
              <span className="text-green-500">FINISHED</span>
            ) : (
              <button
                className="ml-2 bg-green-500 text-white px-2 mx-1 border rounded"
                onClick={() => handleFinish(record.id)}
              >
                FINISH
              </button>
            )} 
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
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Name : {record.passenger_name}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">E-mail : {record.passenger_email}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Phone Number : {record.passenger_phonenumber}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Origin : {record.trip_origin}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Destination : {record.trip_destination}</p>
              {/* <p className="border-2 p-2 rounded-md border-gray-400 my-2">Trip Expense : {record.trip_expenses}</p> */}
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Number of Bags : {record.number_of_passenger_bags}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Number of Passengers : {record.number_of_passengers}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Luxury Service : {record.trip_luxury_service}</p>
              <p className="border-2 p-2 rounded-md border-gray-400 my-2">Description : {record.trip_description}</p>
            </Modal>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl p-4 mb-4 border-b-2">Your Trips</h1>
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

export default Driver;
