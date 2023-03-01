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
  message,
} from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { OrderPrint } from "./OrderPrint";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../features/modalsSlice";
import {
  useAddMaterialsMutation,
  useAddWorksMutation,
  useDeleteMaterialsMutation,
  useDeleteWorksMutation,
  useGetMaterialQuery,
  useGetUnitQuery,
  useGetWorkQuery,
} from "../api";

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Content } = Layout;

function OrdersItem({ item }) {
  const [addWork] = useAddWorksMutation();
  const [deleteWork] = useDeleteWorksMutation();
  const [deleteMaterial] = useDeleteMaterialsMutation();
  const [addMaterial] = useAddMaterialsMutation();
  const [formWork] = Form.useForm();
  const [formMaterial] = Form.useForm();
  const { data: work = [] } = useGetWorkQuery();
  const { data: unit = [] } = useGetUnitQuery();
  const { data: material = [] } = useGetMaterialQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddWork, setIsOpenAddWork] = useState();
  const [isOpenAddMaterial, setIsOpenAddMaterial] = useState();
  const printOrder = useRef();
  const dispacth = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

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
      {contextHolder}
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
                        icon={<PlusCircleOutlined />}
                        type="link"
                        onClick={() => setIsOpenAddWork(true)}
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
                            title: "ед измерения",
                            dataIndex: "unit",
                            key: "unit",
                            width: "13%",
                          },
                          {
                            title: "Количество",
                            dataIndex: "count",
                            key: "count",
                            width: "10%",
                          },
                          { title: "Цена", dataIndex: "price", key: "price" },
                          { title: "стоимость", dataIndex: "sum", key: "sum" },
                          {
                            title: "действия",
                            dataIndex: "actions",
                            key: "actions",
                            width: "10%",
                            render: (id) => (
                              // eslint-disable-next-line jsx-a11y/anchor-is-valid
                              <a
                                onClick={async () => {
                                  await deleteWork({
                                    id: id,
                                  }).finally(() => {
                                    messageApi.open({
                                      type: "success",
                                      content: `элемент удален`,
                                      duration: 1.5,
                                    });
                                  });
                                }}>
                                удалить
                              </a>
                            ),
                          },
                        ]}
                        dataSource={item.workList[0]?.work?.map((work) => ({
                          name: work.work.name,
                          count: work.count,
                          price: work.work.price,
                          id: work.id,
                          unit: work.unit.name,
                          sum: work.count * work.work.price,
                          actions: work.id,
                        }))}
                      />
                      <Modal
                        open={isOpenAddWork}
                        title="Добавить работу в список"
                        closable={false}
                        centered
                        okText="Добавить"
                        cancelText="Отменить"
                        onOk={() => {
                          formWork
                            .validateFields(["work", "count", "price", "unit"])
                            .then(async () => {
                              await addWork({
                                count: formWork.getFieldValue("count"),
                                id_worklist: item.workList[0].id,
                                id_work: formWork.getFieldValue("work"),
                                unit_id: formWork.getFieldValue("unit"),
                              })
                                .unwrap()
                                .then((res) => {
                                  if (res.status === "successful") {
                                    setIsOpenAddWork(false);
                                    messageApi.open({
                                      type: "success",
                                      content: `работа добавлена`,
                                      duration: 1.5,
                                    });
                                  } else {
                                    messageApi.open({
                                      type: "error",
                                      content: `ошибка добавления работы`,
                                      duration: 1.5,
                                    });
                                  }
                                })
                                .finally(() => {
                                  formWork.resetFields();
                                  setIsLoading(false);
                                });
                            });
                        }}
                        onCancel={() => {
                          setIsOpenAddWork(false);
                          formWork.resetFields();
                        }}
                        maskClosable={false}>
                        <Content>
                          <Form labelCol={{ span: 6 }} form={formWork}>
                            <Form.Item
                              label="Работа"
                              name="work"
                              autoComplete="off"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо выбрать работу",
                                },
                              ]}>
                              <Select
                                onChange={(value) => {
                                  formWork.setFieldValue("count", 1);
                                  work.map((item) => {
                                    if (item.id === value)
                                      formWork.setFieldValue(
                                        "price",
                                        item.price
                                      );
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
                            <Form.Item
                              label="Ед измерения"
                              name="unit"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо выбрать работу",
                                },
                              ]}>
                              <Select
                                options={unit.map((item) => {
                                  return {
                                    label: item.name,
                                    value: item.id,
                                  };
                                })}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Количество"
                              name="count"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо указать количество",
                                },
                              ]}>
                              <InputNumber
                                min={1}
                                max={1000}
                                defaultValue={1}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Цена"
                              name="price"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо указать цену",
                                },
                              ]}>
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
                        icon={<PlusCircleOutlined />}
                        type="link"
                        onClick={() => {
                          setIsOpenAddMaterial(true);
                        }}
                      />
                    </>
                  ),
                  children: (
                    <>
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
                            title: "eд измерения",
                            dataIndex: "unit",
                            key: "unit",
                            width: "13%",
                          },
                          {
                            title: "количество",
                            dataIndex: "count",
                            key: "count",
                            width: "10%",
                          },
                          { title: "цена", dataIndex: "price", key: "price" },
                          { title: "стоимость", dataIndex: "sum", key: "sum" },
                          {
                            title: "действия",
                            dataIndex: "actions",
                            key: "actions",
                            width: "10%",
                            render: (id) => (
                              // eslint-disable-next-line jsx-a11y/anchor-is-valid
                              <a
                                onClick={async () => {
                                  await deleteMaterial({
                                    id: id,
                                  }).finally(() => {
                                    messageApi.open({
                                      type: "success",
                                      content: `элемент удален`,
                                      duration: 1.5,
                                    });
                                  });
                                }}>
                                удалить
                              </a>
                            ),
                          },
                        ]}
                        dataSource={item?.materialList[0]?.materials?.map(
                          (material) => ({
                            name: material.material.name,
                            count: material.count,
                            price: material.material.price,
                            id: material.id,
                            unit: material.unit.name,
                            sum: material.count * material.material.price,
                            actions: material.id,
                          })
                        )}
                      />
                      <Modal
                        open={isOpenAddMaterial}
                        title="Добавить материал в список"
                        closable={false}
                        centered
                        okText="Добавить"
                        cancelText="Отменить"
                        onOk={() => {
                          formMaterial
                            .validateFields([
                              "material",
                              "count",
                              "unit",
                              "price",
                            ])
                            .then(async (values) => {
                              await addMaterial({
                                count: formMaterial.getFieldValue("count"),
                                materiallist_id: item.materialList[0].id,
                                material_id:
                                  formMaterial.getFieldValue("material"),
                                unit_id: formMaterial.getFieldValue("unit"),
                              })
                                .unwrap()
                                .then((res) => {
                                  if (res.status === "successful")
                                    messageApi.open({
                                      type: "success",
                                      content: `материал добавлен`,
                                      duration: 1.5,
                                    });
                                  else
                                    messageApi.open({
                                      type: "error",
                                      content: `ошибка добавления материала`,
                                      duration: 1.5,
                                    });
                                })
                                .then(() => setIsOpenAddMaterial(false))
                                .finally(() => {
                                  formMaterial.resetFields();
                                });
                            });
                        }}
                        onCancel={() => {
                          setIsOpenAddMaterial(false);
                          formMaterial.resetFields();
                        }}
                        maskClosable={false}>
                        <Content>
                          <Form labelCol={{ span: 6 }} form={formMaterial}>
                            <Form.Item
                              label="Материал"
                              name="material"
                              autoComplete="off"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо выбрать материал",
                                },
                              ]}>
                              <Select
                                onChange={(value) => {
                                  formMaterial.setFieldValue("count", 1);
                                  material.map((item) => {
                                    if (item.id === value)
                                      formMaterial.setFieldValue(
                                        "price",
                                        item.price
                                      );
                                  });
                                }}
                                options={material.map((item) => {
                                  return {
                                    value: item.id,
                                    label: item.name,
                                  };
                                })}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Ед измерения"
                              name="unit"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "необходимо выбрать единицы измерения",
                                },
                              ]}>
                              <Select
                                options={unit.map((item) => {
                                  return {
                                    label: item.name,
                                    value: item.id,
                                  };
                                })}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Количество"
                              name="count"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо указать количество",
                                },
                              ]}>
                              <InputNumber
                                min={1}
                                max={1000}
                                defaultValue={1}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Цена"
                              name="price"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо укащать цену",
                                },
                              ]}>
                              <InputNumber step={0.01} />
                            </Form.Item>
                          </Form>
                        </Content>
                      </Modal>
                    </>
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
