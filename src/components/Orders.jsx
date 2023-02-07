import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { List, message, Typography } from "antd";
import OrdersItem from "./OrdersItem";
import { useGetOrdersQuery } from "../api";

function Orders() {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Заказы загружены успешно",
    });
  };
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();

  return (
    <div>
      {contextHolder}
      <List
        size="small"
        pagination={{
          pageSize: 6,
        }}
        bordered
        loading={isLoading}
        dataSource={orders}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <OrdersItem item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Orders;
