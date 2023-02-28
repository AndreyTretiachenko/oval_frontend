import React, { useRef, useState } from "react";
import {
  Table,
  Button,
  Collapse,
  Divider,
  Descriptions,
  Typography,
  Tabs,
  Form,
  InputNumber,
  Select,
  Layout,
  Modal,
} from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined, EditOutlined } from "@ant-design/icons";
import { OrderPrint } from "./OrderPrint";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../features/modalsSlice";
import {
  useAddWorksMutation,
  useGetMaterialQuery,
  useGetOrdersQuery,
  useGetUnitQuery,
  useGetWorkQuery,
} from "../api";

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Content } = Layout;

function OrdersItem({ item }) {
  const [addWork] = useAddWorksMutation();
  const [form] = Form.useForm();
  const { data: work = [] } = useGetWorkQuery();
  const { data: unit = [] } = useGetUnitQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddWork, setIsOpenAddWork] = useState();
  const printOrder = useRef();
  const dispacth = useDispatch();
  const modals = useSelector((state) => state.modals);
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
    <>
      <div>
        <Collapse ghost key={item.id}>
          <Panel
            key={item.id}
            header={`Заказ-наряд №${item.id} от ${
              item.date_created &&
              new Date(Date.parse(item.date_created)).toLocaleDateString(
                "ru-RU"
              ) +
                " " +
                new Date(Date.parse(item.date_created)).toLocaleTimeString(
                  "ru-RU"
                )
            },
        сумма запчастей: ${sumOrderMaterial()} руб, сумма работ: ${sumOrderWork()} руб, итого по заказу: ${
              sumOrderMaterial() + sumOrderWork()
            }`}>
            <ReactToPrint
              trigger={() => (
                <Button style={{ float: "right" }} icon={<PrinterOutlined />}>
                  распечатать
                </Button>
              )}
              content={() => printOrder.current}
            />
            <OrderPrint r={printOrder} data={item} />
            <Descriptions title="Информация о заказчике" size="small">
              <Descriptions.Item
                label={
                  item.client.type === "company" ? "Название" : "Имя Фамилия"
                }>
                {item.client.type === "company"
                  ? item.client.name
                  : item.client.firstName + " " + item.client.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Вид клиента">
                {item.client.type === "company" ? "юр лицо" : "физ лицо"}
              </Descriptions.Item>

              {item.client.type === "company" ? (
                <>
                  <Descriptions.Item label="ИНН">
                    {item.client.inn}
                  </Descriptions.Item>
                  <Descriptions.Item label="КПП">
                    {item.client.kpp}
                  </Descriptions.Item>
                  <Descriptions.Item label="Адрес">
                    {item.client.adress}
                  </Descriptions.Item>
                </>
              ) : (
                <>
                  <Descriptions.Item label="Телефон">
                    {item.client.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {item.client.email}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
            <Divider />
            <Descriptions title="Информация о транспорте" size="small">
              <Descriptions.Item label="Марка">
                {item.transport?.brand}
              </Descriptions.Item>
              <Descriptions.Item label="Модель">
                {item.transport?.model}
              </Descriptions.Item>
              <Descriptions.Item label="Модификация">
                {item.transport?.modification}
              </Descriptions.Item>
              <Descriptions.Item label="Год выпуска">
                {item.transport?.year}
              </Descriptions.Item>
              <Descriptions.Item label="VIN">
                {item.transport?.vin}
              </Descriptions.Item>
              <Descriptions.Item label="Номер двигателя">
                {item.transport?.engineNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Гос номер">
                {item.transport?.carNumber}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: 1,
                  label: (
                    <>
                      <Text style={{ marginRight: 10 }}>Работа</Text>
                      <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => dispacth(updateModals({ modal: 6 }))}
                      />
                    </>
                  ),
                  children: (
                    <>
                      <Table
                        bordered={true}
                        size="small"
                        loading={isLoading}
                        pagination={{
                          pageSize: 5,
                        }}
                        tableLayout="auto"
                        scroll={{ y: "calc(100vh - 4em)" }}
                        columns={[
                          {
                            title: "Название",
                            dataIndex: "name",
                            key: "name",
                            width: "30%",
                          },
                          {
                            title: "Ед измерения",
                            dataIndex: "unit",
                            key: "unit",
                          },
                          {
                            title: "Количество",
                            dataIndex: "count",
                            key: "count",
                          },
                          { title: "Цена", dataIndex: "price", key: "price" },
                          { title: "стоимость", dataIndex: "sum", key: "sum" },
                        ]}
                        dataSource={item.workList[0]?.work?.map((work) => ({
                          name: work.work.name,
                          count: work.count,
                          price: work.work.price,
                          id: work.id,
                          unit: work.unit.name,
                          sum: work.count * work.work.price,
                        }))}
                      />
                      <Button onClick={() => setIsOpenAddWork(true)}>
                        добавить работу
                      </Button>
                      <Modal
                        open={isOpenAddWork}
                        title="Добавить работу в список"
                        closable={false}
                        centered
                        onOk={async () => {
                          setIsLoading(true);
                          await addWork({
                            count: form.getFieldValue("count"),
                            id_worklist: item.workList[0].id,
                            id_work: form.getFieldValue("work"),
                            unit_id: form.getFieldValue("unit"),
                          })
                            .unwrap()
                            .then(() => setIsOpenAddWork(false))
                            .finally(() => {
                              form.resetFields();
                              setIsLoading(false);
                            });
                        }}
                        onCancel={() => {
                          setIsOpenAddWork(false);
                          form.resetFields();
                        }}
                        maskClosable={false}>
                        <Content>
                          <Form labelCol={{ span: 6 }} form={form}>
                            <Form.Item
                              label="Работа"
                              name="work"
                              autoComplete="off">
                              <Select
                                onChange={(value) => {
                                  form.setFieldValue("count", 1);
                                  work.map((item) => {
                                    if (item.id === value)
                                      form.setFieldValue("price", item.price);
                                  });
                                }}
                                options={work.map((item) => {
                                  return {
                                    value: item.id,
                                    label: item.name,
                                  };
                                })}
                              />
                            </Form.Item>
                            <Form.Item label="Ед измерения" name="unit">
                              <Select
                                options={unit.map((item) => {
                                  return {
                                    label: item.name,
                                    value: item.id,
                                  };
                                })}
                              />
                            </Form.Item>
                            <Form.Item label="Количество" name="count">
                              <InputNumber
                                min={1}
                                max={1000}
                                defaultValue={1}
                              />
                            </Form.Item>
                            <Form.Item label="Цена" name="price">
                              <InputNumber step={0.01} />
                            </Form.Item>
                          </Form>
                        </Content>
                      </Modal>
                    </>
                  ),
                },
                {
                  key: 2,
                  label: (
                    <>
                      <Text style={{ marginRight: 10 }}>Материалы</Text>
                      <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => dispacth(updateModals({ modal: 7 }))}
                      />
                    </>
                  ),
                  children: (
                    <Table
                      bordered={true}
                      pagination={{
                        pageSize: 5,
                      }}
                      size="small"
                      tableLayout="auto"
                      scroll={{ y: "calc(100vh - 4em)" }}
                      columns={[
                        {
                          title: "название",
                          dataIndex: "name",
                          key: "name",
                          width: "30%",
                        },
                        {
                          title: "Ед измерения",
                          dataIndex: "unit",
                          key: "unit",
                        },
                        {
                          title: "количество",
                          dataIndex: "count",
                          key: "count",
                        },
                        { title: "цена", dataIndex: "price", key: "price" },
                        { title: "стоимость", dataIndex: "sum", key: "sum" },
                      ]}
                      dataSource={item?.materialList[0]?.materials?.map(
                        (material) => ({
                          name: material.material.name,
                          count: material.count,
                          price: material.material.price,
                          id: material.id,
                          unit: material.unit.name,
                          sum: material.count * material.material.price,
                        })
                      )}
                    />
                  ),
                },
              ]}
            />
          </Panel>
        </Collapse>
      </div>
    </>
  );
}

export default OrdersItem;
