import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { List, message, Typography } from "antd";
import OrdersItem from "./OrdersItem";
import { useGetOrdersQuery } from "../api";

function Orders() {
  const { data = [], isLoading, error } = useGetOrdersQuery();

  return (
    <div>
      <List
        size="small"
        pagination={{
          pageSize: 6,
        }}
        bordered
        loading={isLoading}
        dataSource={!isLoading ? [...data].reverse() : []}
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
