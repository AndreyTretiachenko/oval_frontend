import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { List, message, Typography } from "antd";
import OrdersItem from "./OrdersItem";
import { useGetOrdersQuery, useGetGoogleOauthTokenMutation } from "../api";

function Orders() {
  const { data = [], isLoading, error } = useGetOrdersQuery();
  const [getGoogleOauthToken] = useGetGoogleOauthTokenMutation();
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState(
    JSON.parse(localStorage.getItem("refresh_token"))
  );
  const getToken = async () => {
    await getGoogleOauthToken(
      `refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${process.env.REACT_APP_GOOGLE_SECRET_KEY}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&grant_type=refresh_token`
    )
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response));
        setToken(JSON.parse(localStorage.getItem("token")));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <div>
        <List
          size="small"
          pagination={{
            pageSize: 9,
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
    </>
  );
}

export default Orders;
