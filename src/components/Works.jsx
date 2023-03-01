import React from "react";
import { useGetWorkQuery } from "../api";
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

function Works() {
  const { data: works = [], isLoading: isLoadingWorks } = useGetWorkQuery();
  return (
    <>
      <Table
        bordered
        size="small"
        loading={isLoadingWorks}
        columns={columns}
        dataSource={works}
        pagination={{ pageSize: 9 }}
      />
    </>
  );
}

export default Works;
