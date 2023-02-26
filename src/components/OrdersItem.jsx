import React, { useRef } from "react";
import { Table, Button, Collapse, Divider } from "antd";
import { useGetCompanyQuery, useGetPersonQuery } from "../api";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import { OrderPrint } from "./OrderPrint";

const { Panel } = Collapse;

function OrdersItem({ item }) {
  const printOrder = useRef();

  const sumOrderMaterial = () => {
    let sum = 0;
    item.materialList[0].materials.map((material) => {
      sum = sum + material.count * material.material.price;
    });
    return sum;
  };

  const sumOrderWork = () => {
    let sum = 0;
    item.workList[0]?.work?.map((work) => {
      sum = sum + work.count * work.work.price;
    });
    return sum;
  };

  return (
    <Collapse ghost key={item.id}>
      <Panel
        header={`Заказ клиента №${item.id} от ${
          item.date_created &&
          new Date(Date.parse(item.date_created)).toLocaleDateString("ru-RU") +
            " " +
            new Date(Date.parse(item.date_created)).toLocaleTimeString("ru-RU")
        },
        сумма запчастей: ${sumOrderMaterial()} руб, сумма работ: ${sumOrderWork()} руб, итого по заказу: ${
          sumOrderMaterial() + sumOrderWork()
        }`}
        key={item.id}>
        <ReactToPrint
          trigger={() => (
            <Button icon={<PrinterOutlined />}>заказ-наряд</Button>
          )}
          content={() => printOrder.current}
        />
        <OrderPrint r={printOrder} data={item} />
        <div>
          <span>Информация о заказчике:</span>
          <br />{" "}
          {item.client.type === "company"
            ? item.client.name
            : item.client.firstName + " " + item.client.lastName}
          {item.client.type === "company" ? ", юр лицо" : ", физ лицо"}
          {item.client.type === "company"
            ? ", ИНН: " + item.client.inn + ""
            : ""}
          {item.client.kpp ? ", КПП: " + item.client.kpp : ""}
        </div>
        <div>
          Информация о транспорте:
          <br /> {item.transport?.brand} {item.transport?.model}{" "}
          {item.transport?.vin} {item.transport?.carNumber}{" "}
          {item.transport?.year}
        </div>
        <Divider />
        <div>Смета на работы: #{item.workList[0]?.id}</div>
        <Table
          bordered={true}
          size="small"
          pagination={{
            pageSize: 5,
          }}
          tableLayout="auto"
          scroll={{ y: "calc(100vh - 4em)" }}
          columns={[
            { title: "id", dataIndex: "id", key: "id" },
            { title: "название", dataIndex: "name", key: "name", width: "30%" },
            { title: "количество", dataIndex: "count", key: "count" },
            { title: "цена", dataIndex: "price", key: "price" },
            { title: "стоимость", dataIndex: "sum", key: "sum" },
          ]}
          dataSource={item.workList[0]?.work?.map((work) => ({
            name: work.work.name,
            count: work.count,
            price: work.work.price,
            id: work.id,
            sum: work.count * work.work.price,
          }))}
        />
        <Divider />
        <div>Смета на материалы: #{item.materialList[0]?.id}</div>
        <Table
          bordered={true}
          pagination={{
            pageSize: 5,
          }}
          size="small"
          tableLayout="auto"
          scroll={{ y: "calc(100vh - 4em)" }}
          columns={[
            { title: "id", dataIndex: "id", key: "id" },
            { title: "название", dataIndex: "name", key: "name", width: "30%" },
            { title: "количество", dataIndex: "count", key: "count" },
            { title: "цена", dataIndex: "price", key: "price" },
            { title: "стоимость", dataIndex: "sum", key: "sum" },
          ]}
          dataSource={item?.materialList[0]?.materials?.map((material) => ({
            name: material.material.name,
            count: material.count,
            price: material.material.price,
            id: material.id,
            sum: material.count * material.material.price,
          }))}
        />
      </Panel>
    </Collapse>
  );
}

export default OrdersItem;
