import React from "react";
import { Table } from "antd";
import { Collapse } from "antd";
import { Divider } from "antd";
const { Panel } = Collapse;

function OrdersItem({ item }) {
  return (
    <Collapse ghost key={item.id}>
      <Panel
        header={`Заказ клиента №${item.uid} от <дата создания>,
        компания: ${item.company.name}, 
        ИНН: ${item.company.inn}`}
        key={item.id}>
        <div></div>
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
