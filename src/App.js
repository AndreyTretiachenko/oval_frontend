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
import Works from "./components/Works";
import Materials from "./components/Materials";
import CreateClient from "./components/modals/CreateClient";
import CreateMaterialList from "./components/modals/CreateMaterialList";
import CreateTransport from "./components/modals/CreateTransport";
import CreateWork from "./components/modals/CreateWork";

import GoogleButton from "./components/GoogleButton";
import { useGetGoogleOauthTokenMutation } from "./api";
import CreateMaterial from "./components/modals/CreateMaterial";

const { Header, Content, Footer } = Layout;

const renderSwitch = (keyAction) => {
  switch (keyAction) {
    default:
      return <Orders />;
    case "1":
      return <Orders />;
    case "2":
      return <Clients />;
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
  const [refreshToken, setRefreshToken] = useState(JSON.parse(localStorage.getItem("refresh_token")));
  const modals = useSelector((state) => state.modals);
  const [getGoogleOauthToken] = useGetGoogleOauthTokenMutation();

  //control access_token Google API for valid and change refresh_token on new access_token if necessary
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

  const GoogleSetToken = async () => {
    await getToken();
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("refresh_token") &&
      localStorage.getItem("refresh_token") !== null
    ) {
      setRefreshToken(JSON.parse(localStorage.getItem("refresh_token")));
      setToken(JSON.parse(localStorage.getItem("token")));
    } else {
      GoogleSetToken();
    }
  }, []);

  return (
    <>
      <Layout style={{ height: "", margin: 0 }}>
        <CreareOrder open={modals?.find((item) => item.modal === 1).open} />
        <CreateWorkList open={modals?.find((item) => item.modal === 2).open} />
        <CreateClient open={modals?.find((item) => item.modal === 3).open} />
        <CreateMaterialList open={modals?.find((item) => item.modal === 4).open} />
        <CreateTransport open={modals?.find((item) => item.modal === 5).open} />
        <CreateWork open={modals?.find((item) => item.modal === 6).open} />
        <CreateMaterial open={modals?.find((item) => item.modal === 7).open} />
        <Navigate />
        <Layout className="site-layout">
          <Header
            style={{
              paddingLeft: "30px",
              height: "10vh",
              background: "white",
            }}>
            {header}
            <GoogleButton />
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
                  {
                    key: 8,

                    label: (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        onClick={() =>
                          dispatch(
                            updateModals({
                              modal: 7,
                            })
                          )
                        }>
                        материал
                      </a>
                    ),
                  },
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
              height: "5vh",
              textAlign: "center",
            }}>
            created by Andrey Tretiachenko © 2023
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
