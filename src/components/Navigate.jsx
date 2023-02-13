import React from "react";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import { updateHeader } from "../features/navigateSlice";
const { Sider } = Layout;

function Navigate() {
  const dispatch = useDispatch();
  const menuItems = [
    { key: "1", label: "Заказы" },
    { key: "3", label: "Оплаты" },

    {
      key: "6",
      label: "Справочники",
      children: [
        { key: "4", label: "Транспорт" },
        { key: "2", label: "Клиенты" },
        { key: "6.1", label: "Работы" },
        { key: "6.2", label: "Материалы" },
      ],
    },
  ];

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
        style={{ backgroundColor: "white", borderRight: "1px solid gray" }}>
        <div
          style={{
            height: 32,
            margin: 16,
            marginBottom: 32,
          }}>
          <img alt="logo" src="logo.png" />
        </div>
        <Menu
          onClick={(e) =>
            dispatch(
              updateHeader({
                header: [
                  menuItems[0],
                  menuItems[1],
                  ...menuItems[2].children,
                ].find((item) => item.key === e.key).label,
                keyAction: e.key,
              })
            )
          }
          theme="light"
          style={{
            paddingRight: "12px",
            paddingLeft: "12px",
          }}
          mode="inline"
          defaultSelectedKeys={["Заказы"]}
          items={menuItems}
        />
      </Sider>
    </>
  );
}

export default Navigate;
