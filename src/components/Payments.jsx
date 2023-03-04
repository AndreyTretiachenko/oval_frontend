// import React from "react";
// import { useGetPaymentsQuery } from "../api";
// import { Table } from "antd";

// const columns = [
//   {
//     title: "Номер",
//     dataIndex: "id",
//   },
//   {
//     title: "Сумма",
//     dataIndex: "sum",
//     key: "sum",
//   },
//   {
//     title: "Метод оплаты",
//     dataIndex: "method",
//     key: "method",
//   },
//   {
//     title: "Тип оплаты",
//     dataIndex: "type",
//     key: "type",
//   },
// ];

// function Payments() {
//   const { data: payments = [], isLoading: isLoadingPayments } =
//     useGetPaymentsQuery();
//   return (
//     <>
//       <Table
//         bordered
//         loading={isLoadingPayments}
//         columns={columns}
//         dataSource={payments}
//         pagination={{ pageSize: 9 }}
//       />
//     </>
//   );
// }

// export default Payments;
