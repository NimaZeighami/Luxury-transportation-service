import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, ConfigProvider, Input, Modal, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

const Manager = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [tripExpenses, setTripExpenses] = useState(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  useEffect(() => {
    fetch("https://dignitylimo.com/users/assets/json/wait.php")
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
  }, []);

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const ShowAddingDriverModal = (record) => {
    setSelectedItem(record);
  };

const columns = [
  {
    title: <p className="text-center text-xs sm:text-sm">ID</p>,
    dataIndex: "id",
    key: "id",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Phone Number</p>,
    dataIndex: "passenger_phonenumber",
    key: "passenger_phonenumber",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Origin</p>,
    dataIndex: "trip_origin",
    key: "trip_origin",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Destination</p>,
    dataIndex: "trip_destination",
    key: "trip_destination",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Trip Date</p>,
    dataIndex: "trip_date",
    key: "trip_date",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Trip Time</p>,
    dataIndex: "trip_time",
    key: "trip_time",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Luxury Service</p>,
    dataIndex: "trip_luxury_service",
    key: "trip_luxury_service",
    render: (item) => (
      <div className="flex items-center justify-center text-xs sm:text-sm">
        {item}
      </div>
    ),
  },
  {
    title: <p className="text-center text-xs sm:text-sm">State</p>,
    dataIndex: "state",
    key: "state",
    render: (stateSymbol, record) => {
      let state, color;
      switch (stateSymbol) {
        case "w":
          state = "Waiting";
          color = "orange";
          break;
        case "a":
          state = "Accepted";
          color = "blue";
          break;
        case "f":
          state = "Failed";
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
        <div className="flex items-center justify-center space-x-2">
          <Tag color={color} key={state}>
            {state.toUpperCase()}
          </Tag>
          <DocumentMagnifyingGlassIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => showDetailModal(record.id)}
          />
          <Modal
            width="90%"
            open={selectedItemDetail === record.id}
            onOk={() => setSelectedItemDetail(null)}
            onCancel={handleCancelDetailModal}
            closable={false}
          >
            <h3 className="text-lg font-bold mb-2">Trip Details:</h3>
            <div className="space-y-2">
              <p className="border-2 p-2 rounded-md border-gray-400">
                Name: {record.passenger_name}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                E-mail: {record.passenger_email}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Phone Number: {record.passenger_phonenumber}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Origin: {record.trip_origin}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Destination: {record.trip_destination}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Trip Expense: {record.trip_expenses}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Number of Bags: {record.number_of_passenger_bags}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Number of Passengers: {record.number_of_passengers}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Luxury Service: {record.trip_luxury_service}
              </p>
              <p className="border-2 p-2 rounded-md border-gray-400">
                Description: {record.trip_description}
              </p>
            </div>
          </Modal>
        </div>
      );
    },
  },
  {
    title: <p className="text-center text-xs sm:text-sm">Operation</p>,
    dataIndex: "Operation",
    key: "operation",
    render: (_, record) => {
      return (
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
          <button
            onClick={() => {
              fetch("https://dignitylimo.com/users/requests.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  action: "fail_trip",
                  id: record.id,
                }),
              });
              setTableData((data) =>
                data.filter((data) => data.id !== record.id)
              );
            }}
            className="text-red-500 focus:outline-none"
            aria-label="Fail Trip"
          >
            ❌
          </button>
          <button
            className="text-green-500 py-1 px-2 border rounded border-green-500 focus:outline-none"
            onClick={() => ShowAddingDriverModal(record.id)}
          >
            Add Driver
          </button>
          <Modal
            width="90%"
            open={selectedItem === record.id}
            onOk={() => {
              fetch("https://dignitylimo.com/users/requests.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  action: "setdriver",
                  id: record.id,
                  driver_id: driverId,
                  trip_expenses: tripExpenses,
                }),
              });
              setTableData((data) =>
                data.filter((data) => data.id !== record.id)
              );
              setSelectedItem(null);
            }}
            onCancel={handleCancel}
            closable={false}
          >
            <h3 className="text-xl">Add Trip Information:</h3>
            <div className="mt-4 space-y-2">
              <div>
                <h4 className="text-lg">Driver ID:</h4>
                <Input
                  className="my-1"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  placeholder="Enter Driver ID"
                />
              </div>
              <div>
                <h4 className="text-lg">Trip Expense:</h4>
                <Input
                  className="my-1"
                  value={tripExpenses}
                  onChange={(e) => setTripExpenses(e.target.value)}
                  placeholder="Enter Trip Expense"
                />
              </div>
            </div>
          </Modal>
        </div>
      );
    },
  },
];

  const handleCancelDetailModal = () => {
    setSelectedItemDetail(null);
  };

  const showDetailModal = (record) => {
    setSelectedItemDetail(record);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Button color="danger" variant="solid" size="large">
          <a href="manager/trips-history">Trips History →</a>
        </Button>
      </div>
      <h1 className="text-3xl p-4 mb-4 border-b-2">Your Waiting Trips</h1>
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

export default Manager;
