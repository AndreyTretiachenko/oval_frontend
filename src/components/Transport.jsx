import React from "react";
import { useGetTransportQuery } from "../api";
import { Table } from "antd";

const columns = [
  {
    title: "Номер",
    dataIndex: "id",
  },
  {
    title: "Бренд",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Модель",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "VIN",
    dataIndex: "vin",
    key: "vin",
  },
  {
    title: "Номер автомобиля",
    dataIndex: "carNumber",
    key: "carNumber",
  },
];

function Transport() {
  const { data: transports = [], isLoading: isLoadingTransport } =
    useGetTransportQuery();
  return (
    <>
      <Table
        columns={columns}
        dataSource={transports}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default Transport;
