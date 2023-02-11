import React from "react";
import Orders from "./components/Orders";
import { Layout } from "antd";
import Navigate from "./components/Navigate";
import { useDispatch, useSelector } from "react-redux";
import Clients from "./components/Clients";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import Modals from "./components/Modals";
import { updateModals } from "./features/modalsSlice";

const { Header, Content, Footer } = Layout;

const renderSwitch = (keyAction) => {
  switch (keyAction) {
    default:
      return <Orders />;
    case "1":
      return <Orders />;
    case "2":
      return <Clients />;
  }
};

function App() {
  const dispatch = useDispatch();
  const { header, keyAction } = useSelector((state) => state.navigate);

  return (
    <>
      <Layout style={{ height: "", margin: 0 }}>
        <Modals />
        <Navigate />
        <Layout className="site-layout">
          <Header
            style={{
              paddingLeft: "30px",
              background: "white",
            }}>
            {header}
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
                              modal: "Создать заказ",
                              keyModal: 1,
                            })
                          )
                        }>
                        заказ
                      </a>
                    ),
                  },
                  { key: 2, label: <a href="/#addClient">клиента</a> },
                  { key: 3, label: <a href="/#addOrder">оплату</a> },
                  {
                    key: 4,
                    label: <a href="/#addClient">транспорт</a>,
                  },
                  { key: 5, label: <a href="/#addOrder">компанию</a> },
                  { key: 6, label: <a href="/#addClient">физлицо</a> },
                  { key: 7, label: <a href="/#addOrder">работу</a> },
                  { key: 8, label: <a href="/#addClient">материал</a> },
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
