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
  DatePicker,
  Input,
  Space,
} from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { OrderPrint } from "./OrderPrint";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../features/modalsSlice";
import {
  useAddGoogleEventMutation,
  useGetGoogleOauthTokenMutation,
  useAddMaterialsMutation,
  useAddWorksMutation,
  useDeleteMaterialsMutation,
  useDeleteWorksMutation,
  useGetMaterialQuery,
  useGetUnitQuery,
  useGetWorkQuery,
  useGetGoogleCalendarColorQuery,
} from "../api";

const { Panel } = Collapse;
const { Text } = Typography;
const { Content } = Layout;
const { RangePicker } = DatePicker;

function OrdersItem({ item }) {
  const dispatch = useDispatch();
  const [addWork] = useAddWorksMutation();
  const [deleteWork] = useDeleteWorksMutation();
  const [deleteMaterial] = useDeleteMaterialsMutation();
  const [addMaterial] = useAddMaterialsMutation();
  const [addGoogleEvent] = useAddGoogleEventMutation();
  const [formWork] = Form.useForm();
  const [formMaterial] = Form.useForm();
  const [formEvent] = Form.useForm();
  const { data: work = [] } = useGetWorkQuery();
  const { data: unit = [] } = useGetUnitQuery();
  const { data: material = [] } = useGetMaterialQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddWork, setIsOpenAddWork] = useState();
  const [isOpenAddMaterial, setIsOpenAddMaterial] = useState();
  const printOrder = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const [token, setToken] = useState();
  const [isAddEventCalendar, setIsAddEventCalendar] = useState(false);
  const [refreshToken, setRefreshToken] = useState(JSON.parse(localStorage.getItem("refresh_token")));
  const [getGoogleOauthToken] = useGetGoogleOauthTokenMutation();
  const { data: CalendarColor = { event: {} } } = useGetGoogleCalendarColorQuery();
  const optionsColor = Object.entries(CalendarColor?.event).map((color) => {
    return {
      label: (
        <div
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: color[1].background,
          }}>
          &nbsp;
        </div>
      ),
      value: color[0],
    };
  });

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

  const sumOrderMaterial = () => {
    let sum = 0;
    item.materialList[0].materials.map((material) => {
      sum = sum + material.count * material.price;
    });
    return sum;
  };

  const sumOrderWork = () => {
    let sum = 0;
    item.workList[0]?.work?.map((work) => {
      sum = sum + work.count * work.price;
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
              new Date(Date.parse(item.date_created)).toLocaleDateString("ru-RU") +
                " " +
                new Date(Date.parse(item.date_created)).toLocaleTimeString("ru-RU")
            },
        ${
          item.client?.type === "company" ? item.client?.name : item.client?.firstName + " " + item.client?.lastName
        }, VIN: ${item.transport?.vin}, итого по заказу: ${sumOrderMaterial() + sumOrderWork()}`}>
            <div>
              <Space>
                <ReactToPrint
                  trigger={() => (
                    <Button style={{ float: "right" }} icon={<PrinterOutlined />}>
                      распечатать
                    </Button>
                  )}
                  content={() => printOrder.current}
                />
                <Button
                  onClick={() => {
                    formEvent.setFieldsValue({
                      summary:
                        item.client.type === "company"
                          ? item.client.name + " " + item.transport?.brand + " " + item.transport?.vin
                          : item.client.firstName +
                            " " +
                            item.client.lastName +
                            " " +
                            item.transport?.brand +
                            " " +
                            item.transport?.vin,
                    });
                    setIsAddEventCalendar(true);
                  }}
                  icon={<PlusCircleOutlined />}
                  style={{ float: "right" }}>
                  событие
                </Button>
                <Button icon={<PlusCircleOutlined />} style={{ float: "right" }}>
                  задачу
                </Button>
              </Space>
            </div>
            <OrderPrint r={printOrder} data={item} />
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: 1,
                  label: (
                    <>
                      <Text style={{ marginRight: 10 }}>информация</Text>
                    </>
                  ),
                  children: (
                    <>
                      <Descriptions title="Информация о заказчике" size="large">
                        <Descriptions.Item label={item.client.type === "company" ? "Название" : "Имя Фамилия"}>
                          {item.client.type === "company"
                            ? item.client.name
                            : item.client.firstName + " " + item.client.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Вид клиента">
                          {item.client.type === "company" ? "юр лицо" : "физ лицо"}
                        </Descriptions.Item>

                        {item.client.type === "company" ? (
                          <>
                            <Descriptions.Item label="ИНН">{item.client.inn}</Descriptions.Item>
                            <Descriptions.Item label="КПП">{item.client.kpp}</Descriptions.Item>
                            <Descriptions.Item label="Адрес">{item.client.adress}</Descriptions.Item>
                          </>
                        ) : (
                          <>
                            <Descriptions.Item label="Телефон">{item.client.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Email">{item.client.email}</Descriptions.Item>
                          </>
                        )}
                      </Descriptions>

                      <Divider />
                      <Descriptions title="Информация о транспорте" size="small">
                        <Descriptions.Item label="Марка">{item.transport?.brand}</Descriptions.Item>
                        <Descriptions.Item label="Модель">{item.transport?.model}</Descriptions.Item>
                        <Descriptions.Item label="Модификация">{item.transport?.modification}</Descriptions.Item>
                        <Descriptions.Item label="Год выпуска">{item.transport?.year}</Descriptions.Item>
                        <Descriptions.Item label="VIN">{item.transport?.vin}</Descriptions.Item>
                        <Descriptions.Item label="Номер двигателя">{item.transport?.engineNumber}</Descriptions.Item>
                        <Descriptions.Item label="Гос номер">{item.transport?.carNumber}</Descriptions.Item>
                      </Descriptions>
                    </>
                  ),
                },
                {
                  key: 2,
                  label: (
                    <>
                      <Text style={{ marginRight: 10 }}>история</Text>
                    </>
                  ),
                  children: (
                    <>
                      <Table
                        columns={[
                          {
                            title: "Действие",
                            dataIndex: "action",
                            key: "action",
                            width: "70%",
                          },
                          {
                            title: "Дата/Время",
                            dataIndex: "date",
                            key: "date",
                            width: "30%",
                          },
                        ]}
                        dataSource={[
                          {
                            action: "заказ создан",
                            date: "2023-23-23",
                          },
                        ]}
                      />
                    </>
                  ),
                },
              ]}
            />

            <Divider />
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: 1,
                  label: (
                    <>
                      <Text style={{ marginRight: 10 }}>Работа</Text>
                      <Button icon={<PlusCircleOutlined />} type="link" onClick={() => setIsOpenAddWork(true)} />
                    </>
                  ),
                  children: (
                    <>
                      <Table
                        bordered={true}
                        size="small"
                        pagination={{
                          pageSize: 5,
                        }}
                        // tableLayout="auto"
                        // scroll={{ y: "calc(100vh - 4em)" }}
                        columns={[
                          {
                            title: "Название",
                            dataIndex: "name",
                            key: "name",
                            width: "30%",
                          },
                          {
                            title: "Ед изм.",
                            dataIndex: "unit",
                            key: "unit",
                            width: "13%",
                          },
                          {
                            title: "Кол-во",
                            dataIndex: "count",
                            key: "count",
                            width: "10%",
                          },
                          { title: "Цена", dataIndex: "price", key: "price" },
                          { title: "Стоимость", dataIndex: "sum", key: "sum" },
                          {
                            title: "Действия",
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
                          price: work.price,
                          id: work.id,
                          unit: work.unit.name,
                          sum: work.count * work.price,
                          actions: work.id,
                        }))}
                      />
                      <Modal
                        title="Создание события в календаре"
                        open={isAddEventCalendar}
                        onCancel={() => {
                          setIsAddEventCalendar(false);
                          formEvent.resetFields();
                        }}
                        onOk={() => {
                          formEvent.validateFields(["DateRange"]).then(async () => {
                            await getToken();
                            await addGoogleEvent(
                              {
                                colorId: formEvent.getFieldValue("colorEvent"),
                                summary: formEvent.getFieldValue("summary"),
                                start: {
                                  dateTime: formEvent.getFieldValue("DateRange")[0].$d.toISOString(),
                                  timeZone: "",
                                },
                                end: {
                                  dateTime: formEvent.getFieldValue("DateRange")[1].$d.toISOString(),
                                  timeZone: "",
                                },
                              },
                              token
                            )
                              .unwrap()
                              .then((response) => {
                                formEvent.resetFields();
                                setIsAddEventCalendar(false);
                                messageApi.open({
                                  type: "success",
                                  content: `событие добавлено в календарь`,
                                  duration: 1.5,
                                });
                              });
                          });
                        }}>
                        <Form form={formEvent} labelCol={{ span: 6 }}>
                          <Form.Item name={"summary"} label="Название">
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name={"DateRange"}
                            label="Дата и время"
                            rules={[
                              {
                                required: true,
                                message: "необходимо выбрать дату и время события",
                              },
                            ]}>
                            <RangePicker
                              format="YYYY-MM-DD HH:mm"
                              showTime={{
                                format: "HH:mm",
                              }}
                            />
                          </Form.Item>
                          <Form.Item name={"colorEvent"} label="Цвет события">
                            <Select
                              options={optionsColor}
                              style={{ width: 70 }}
                              size="small"
                              onChange={(value) => {
                                item = { ...item, colorEvent: value };
                              }}
                            />
                          </Form.Item>
                        </Form>
                      </Modal>
                      <Modal
                        open={isOpenAddWork}
                        title="Добавить работу в список"
                        closable={false}
                        centered
                        okText="Добавить"
                        cancelText="Отменить"
                        onOk={() => {
                          console.log(formWork.getFieldsValue());
                          formWork.validateFields(["work", "count", "price", "unit"]).then(async () => {
                            await addWork({
                              count: formWork.getFieldValue("count"),
                              id_worklist: item.workList[0].id,
                              id_work: formWork.getFieldValue("work"),
                              unit_id: formWork.getFieldValue("unit"),
                              price: formWork.getFieldValue("price"),
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
                              <Space>
                                <Select
                                  style={{ width: 250 }}
                                  onChange={(value) => {
                                    formWork.setFieldValue("count", 1);
                                    formWork.setFieldValue("work", value);
                                    work.map((item) => {
                                      if (item.id === value) formWork.setFieldValue("price", item.price);
                                    });
                                  }}
                                  options={work.map((item) => {
                                    return {
                                      value: item.id,
                                      label: item.name,
                                    };
                                  })}
                                />
                                <Button
                                  type="primary"
                                  size="small"
                                  shape="circle"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    dispatch(
                                      updateModals({
                                        modal: 6,
                                      })
                                    )
                                  }
                                />
                              </Space>
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
                              <InputNumber min={1} max={1000} defaultValue={1} />
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
                        // tableLayout="auto"
                        // scroll={{ y: "calc(100vh - 4em)" }}
                        columns={[
                          {
                            title: "Название",
                            dataIndex: "name",
                            key: "name",
                            width: "30%",
                          },
                          {
                            title: "Ед изм.",
                            dataIndex: "unit",
                            key: "unit",
                            width: "13%",
                          },
                          {
                            title: "Кол-во",
                            dataIndex: "count",
                            key: "count",
                            width: "10%",
                          },
                          { title: "Цена", dataIndex: "price", key: "price" },
                          { title: "Стоимость", dataIndex: "sum", key: "sum" },
                          {
                            title: "Действия",
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
                        dataSource={item?.materialList[0]?.materials?.map((material) => ({
                          name: material.material.name,
                          count: material.count,
                          price: material.price,
                          id: material.id,
                          unit: material.unit.name,
                          sum: material.count * material.price,
                          actions: material.id,
                        }))}
                      />
                      <Modal
                        open={isOpenAddMaterial}
                        title="Добавить материал в список"
                        closable={false}
                        centered
                        okText="Добавить"
                        cancelText="Отменить"
                        onOk={() => {
                          formMaterial.validateFields(["material", "count", "unit", "price"]).then(async (values) => {
                            await addMaterial({
                              count: formMaterial.getFieldValue("count"),
                              materiallist_id: item.materialList[0].id,
                              material_id: formMaterial.getFieldValue("material"),
                              unit_id: formMaterial.getFieldValue("unit"),
                              price: formMaterial.getFieldValue("price"),
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
                              <Space>
                                <Select
                                  style={{ width: 250 }}
                                  onChange={(value) => {
                                    formMaterial.setFieldValue("count", 1);
                                    formMaterial.setFieldValue("material", value);
                                    material.map((item) => {
                                      if (item.id === value) formMaterial.setFieldValue("price", item.price);
                                    });
                                  }}
                                  options={material.map((item) => {
                                    return {
                                      value: item.id,
                                      label: item.name,
                                    };
                                  })}
                                />
                                <Button
                                  type="primary"
                                  size="small"
                                  shape="circle"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    dispatch(
                                      updateModals({
                                        modal: 7,
                                      })
                                    )
                                  }
                                />
                              </Space>
                            </Form.Item>
                            <Form.Item
                              label="Ед измерения"
                              name="unit"
                              rules={[
                                {
                                  required: true,
                                  message: "необходимо выбрать единицы измерения",
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
                              <InputNumber min={1} max={1000} defaultValue={1} />
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
