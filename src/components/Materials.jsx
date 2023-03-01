import React from "react";
import { useGetMaterialQuery } from "../api";
import { Table } from "antd";

const columns = [
  {
    title: "Номер",
    dataIndex: "id",
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
];

function Materials() {
  const { data: materials = [], isLoading: isLoadingMaterials } =
    useGetMaterialQuery();
  return (
    <>
      <Table
        size="small"
        bordered
        loading={isLoadingMaterials}
        columns={columns}
        dataSource={materials}
        pagination={{ pageSize: 9 }}
      />
    </>
  );
}

export default Materials;
