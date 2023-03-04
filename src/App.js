import React, { useEffect, useState } from "react";
import Orders from "./components/Orders";
import { Layout } from "antd";
import Navigate from "./components/Navigate";
import { useDispatch, useSelector } from "react-redux";
import Clients from "./components/Clients";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { updateModals } from "./features/modalsSlice";
import CreareOrder from "./components/modals/CreareOrder";
import CreateWorkList from "./components/modals/CreateWorkList";
import Transport from "./components/Transport";
import Payments from "./components/Payments";
import Works from "./components/Works";
import Materials from "./components/Materials";
import CreateClient from "./components/modals/CreateClient";
import CreateMaterialList from "./components/modals/CreateMaterialList";
import CreateTransport from "./components/modals/CreateTransport";
import CreateWork from "./components/modals/CreateWork";

import GoogleButton from "./components/GoogleButton";
import { useLazyGetGoogleCalendarQuery } from "./api";
import { useGoogleLogin } from "@react-oauth/google";

const { Header, Content, Footer } = Layout;

const renderSwitch = (keyAction) => {
  switch (keyAction) {
    default:
      return <Orders />;
    case "1":
      return <Orders />;
    case "2":
      return <Clients />;
    case "3":
      return <Payments />;
    case "4":
      return <Transport />;
    case "6.1":
      return <Works />;
    case "6.2":
      return <Materials />;
  }
};

function App() {
  const dispatch = useDispatch();
  const { header, keyAction } = useSelector((state) => state.navigate);
  const [token, setToken] = useState();
  const selectOrder = useSelector((state) => state.selectOrder);
  const modals = useSelector((state) => state.modals);
  const [getCalendar] = useLazyGetGoogleCalendarQuery(token);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem("google_token", JSON.stringify(tokenResponse));
    },
  });

  const GoogleCalendarList = async () => {
    if (!getCalendar(token.access_token).isError)
      await getCalendar(token.access_token)
        .unwrap()
        .then((res) => console.log(res));
    else login();
    setToken(JSON.parse(localStorage.getItem("google_token")));
    await getCalendar(token.access_token)
      .unwrap()
      .then((res) => console.log(res));
  };

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("google_token")));
  }, []);

  return (
    <>
      <Layout style={{ height: "", margin: 0 }}>
        <CreareOrder open={modals?.find((item) => item.modal === 1).open} />
        <CreateWorkList open={modals?.find((item) => item.modal === 2).open} />
        <CreateClient open={modals?.find((item) => item.modal === 3).open} />
        <CreateMaterialList
          open={modals?.find((item) => item.modal === 4).open}
        />
        <CreateTransport open={modals?.find((item) => item.modal === 5).open} />
        <CreateWork open={modals?.find((item) => item.modal === 6).open} />
        <Navigate />
        <Layout className="site-layout">
          <Header
            style={{
              paddingLeft: "30px",
              background: "white",
            }}>
            {header}
            <GoogleButton />
            <Button onClick={() => GoogleCalendarList()}>Calendar</Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        onClick={() =>
                          dispatch(
                            updateModals({
                              modal: 1,
                            })
                          )
                        }>
                        заказ-наряд
                      </a>
                    ),
                  },
                  {
                    key: 2,
                    label: (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        onClick={() =>
                          dispatch(
                            updateModals({
                              modal: 3,
                            })
                          )
                        }>
                        клиента
                      </a>
                    ),
                  },
                  { key: 3, label: <a href="/#">оплату</a> },
                  {
                    key: 7,
                    label: (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        onClick={() =>
                          dispatch(
                            updateModals({
                              modal: 6,
                            })
                          )
                        }>
                        работу
                      </a>
                    ),
                  },
                  { key: 8, label: <a href="/#">материал</a> },
                ],
              }}
              placement="bottomRight"
              trigger={["click"]}
              arrow={{
                pointAtCenter: true,
              }}>
              <Button
                type="primary"
                style={{ float: "right", marginTop: 10 }}
                size="large"
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: "24px",
              height: "auto",
              backgroundColor: "white",
            }}>
            {renderSwitch(keyAction)}
          </Content>
          <Footer
            style={{
              padding: 0,
              marginBottom: 0,
              marginTop: 0,
              textAlign: "center",
            }}>
            ©2023 Created by Andrey Tretiachenko
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
