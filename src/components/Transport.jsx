import React from "react";
import { useGetTransportQuery } from "../api";
import { Table } from "antd";

const columns = [
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
    title: "Модификация",
    dataIndex: "modification",
    key: "modification",
  },
  {
    title: "Год выпуска",
    dataIndex: "year",
    key: "year",
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
  {
    title: "Номер двигателя",
    dataIndex: "engineNumber",
    key: "engineNumber",
  },
];

const reverseArray = (array) => {
  let a = [];
  for (let i = 0; i < array.length; i++) {
    a[i] = array[array.length - 1 - i];
  }
  return a;
};

function Transport() {
  const { data: transports = [], isLoading: isLoadingTransport } =
    useGetTransportQuery();
  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={reverseArray(transports)}
        pagination={{ pageSize: 9 }}
      />
    </>
  );
}

export default Transport;
