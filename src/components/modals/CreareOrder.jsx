import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Layout,
  Modal,
  Radio,
  Space,
  Divider,
  message,
  Input,
  Select,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import {
  useAddMateriallistMutation,
  useAddMaterialsMutation,
  useAddOrderMutation,
  useAddWorkListMutation,
  useAddWorksMutation,
  useGetCompanyQuery,
  useGetPersonQuery,
  useGetWorkQuery,
} from "../../api";
import { Content, Header } from "antd/es/layout/layout";
import { setDefaulWorkList } from "../../features/workListSlice";
import {
  setCreateOrderValue,
  setDefaultCreateOrderValue,
} from "../../features/createOrderSlice";
import { setDefaulMaterialList } from "../../features/materialListSlice";

const { TextArea } = Input;

function CreareOrder({ open }) {
  const [formOrder] = Form.useForm();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const [addWorkList] = useAddWorkListMutation();
  const [addWorks] = useAddWorksMutation();
  const [addMateriallist] = useAddMateriallistMutation();
  const [addMaterials] = useAddMaterialsMutation();
  const { data: person = [], isLoading: isPersonLoading } = useGetPersonQuery();
  const { data: company = [], isLoading: isCompanyLoading } =
    useGetCompanyQuery();
  const formValue = useSelector((state) => state.createOrder);
  const [typeListClient, setTypeListClient] = useState("company");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { Text } = Typography;

  const handleCreateOrder = async () => {
    setIsLoading(true);
    await addOrder({
      uid: uuid(),
      person_id: formValue.person_id || null,
      company_id: formValue.company_id || null,
      comment: formValue.comment || null,
      transport_id: formValue.transport_id || null,
    })
      .unwrap()
      .then((res) => {
        if (res.status === "successful") {
          addWorkList({ order_id: res.order })
            .unwrap()
            .then((res) => {
              if (res.status === "successful")
                formValue?.worklist?.map((work) =>
                  addWorks({
                    count: work.count,
                    id_worklist: res.workList,
                    id_work: work.id,
                  }).unwrap()
                );
            })
            .catch((err) => {
              console.log(err);
              if (err)
                messageApi.open({
                  type: "error",
                  content: `ошибка создания сметы к заказу`,
                });
            })
            .finally((res) => {
              setIsLoading(false);
              dispatch(updateModals({ modal: 1 }));
              dispatch(setDefaulWorkList());
              dispatch(setDefaulMaterialList());
              dispatch(setDefaultCreateOrderValue());
              formOrder.resetFields();
              messageApi.open({
                type: "success",
                content: `заказ успешно создан`,
              });
            });
          addMateriallist({ order_id: res.order })
            .unwrap()
            .then((res) => {
              if (res.status === "successful")
                formValue?.materiallist?.map((material) => {
                  addMaterials({
                    count: material.count,
                    material_id: material.id,
                    materiallist_id: res.materialList,
                  }).unwrap();
                });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err)
          messageApi.open({
            type: "error",
            content: `ошибка создания заказа`,
          });
      });
  };

  const handleCancel = () => {
    dispatch(setDefaulWorkList());
    dispatch(setDefaulMaterialList());
    dispatch(updateModals({ modal: 1 }));
    dispatch(setDefaultCreateOrderValue());
    formOrder.resetFields();
  };

  const onChangeType = ({ target: { value } }) => {
    setTypeListClient(value);
    dispatch(
      setCreateOrderValue({
        ...formValue,
        client_id: 0,
        company_id: 0,
        person_id: 0,
      })
    );
    formOrder.resetFields(["transport", "client"]);
    formOrder.setFieldsValue({
      client: "",
    });
  };

  const sumWorks = () => {
    let sum = 0;
    formValue.worklist.map((item) => (sum = sum + item.count * item.price));
    return sum;
  };

  const sumMaterial = () => {
    let sum = 0;
    formValue.materiallist.map((item) => (sum = sum + item.count * item.price));
    return sum;
  };

  return (
    <>
      {contextHolder}
      <Modal
        width={"70%"}
        title="Создание заказ-наряда"
        closable={false}
        maskClosable={false}
        open={open}
        okText="Cоздать"
        onOk={() =>
          formOrder
            .validateFields(["client", "transport"])
            .then(() => handleCreateOrder())
            .catch((info) => console.log(info))
        }
        okButtonProps={{ loading: isLoading }}
        cancelText="Отмена"
        onCancel={handleCancel}>
        <Layout>
          <Header style={{ backgroundColor: "whitesmoke" }}>
            Для создание заказа неободимо заполнить все поля
          </Header>
          <Content>
            <Form
              labelCol={{ span: 4 }}
              form={formOrder}
              initialValues={{ type: "company" }}>
              <Form.Item label="Тип клиента" name="type">
                <Radio.Group
                  options={[
                    { label: "юр.лицо", value: "company" },
                    { label: "физ.лицо", value: "fl" },
                  ]}
                  value={typeListClient}
                  defaultValue={0}
                  onChange={onChangeType}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
              <Form.Item
                label="Клиент"
                name="client"
                rules={[
                  { required: true, message: "необходимо выбрать клиента" },
                ]}>
                <Space>
                  <Select
                    showSearch
                    clearIcon
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    loading={
                      typeListClient === "company"
                        ? isCompanyLoading
                        : isPersonLoading
                    }
                    style={{ width: 300 }}
                    onChange={(value) => {
                      formOrder.setFieldValue("client", value);
                      formOrder.resetFields(["transport"]);
                      typeListClient === "company"
                        ? dispatch(
                            setCreateOrderValue({
                              ...formValue,
                              company_id: value,
                            })
                          )
                        : dispatch(
                            setCreateOrderValue({
                              ...formValue,
                              person_id: value,
                            })
                          );
                    }}
                    options={
                      typeListClient === "company"
                        ? company?.map((item) => {
                            return { label: item.name, value: item.id };
                          })
                        : person?.map((per) => {
                            return {
                              label: per.firstName + " " + per.lastName,
                              value: per.id,
                            };
                          })
                    }
                  />
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      dispatch(
                        updateModals({
                          modal: 3,
                        })
                      )
                    }
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="transport"
                label="Транспорт"
                rules={[
                  {
                    required: true,
                    message: "необходимо выбрать транспорт",
                  },
                ]}>
                <Space>
                  <Select
                    showSearch
                    clearIcon
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: 400 }}
                    onChange={(value) => {
                      formOrder.setFieldValue("transport", value);
                      dispatch(
                        setCreateOrderValue({
                          ...formValue,
                          transport_id: Number(value),
                        })
                      );
                    }}
                    options={
                      typeListClient === "company"
                        ? company
                            .find((item) => item.id === formValue.company_id)
                            ?.transports?.map((item) => {
                              return {
                                label:
                                  "Марка: " +
                                  item.brand +
                                  ", " +
                                  "Модель: " +
                                  item.model +
                                  ", " +
                                  "VIN: " +
                                  item.vin +
                                  ", " +
                                  "Гос номер: " +
                                  item.carNumber,
                                value: item.id,
                              };
                            })
                        : person
                            .find((item) => item.id === formValue.person_id)
                            ?.transports?.map((item) => {
                              return {
                                label:
                                  "Марка: " +
                                  item.brand +
                                  ", " +
                                  "Модель: " +
                                  item.model +
                                  ", " +
                                  "VIN: " +
                                  item.vin +
                                  ", " +
                                  "Гос номер: " +
                                  item.carNumber,
                                value: item.id,
                              };
                            })
                    }
                  />
                  <Button
                    disabled={
                      formValue.person_id !== 0 || formValue.company_id !== 0
                        ? false
                        : true
                    }
                    type="primary"
                    size="small"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      dispatch(
                        updateModals({
                          modal: 5,
                        })
                      )
                    }
                  />
                </Space>
              </Form.Item>
              <Form.Item label="Список работ" name="works">
                <Button
                  onClick={() =>
                    dispatch(
                      updateModals({
                        modal: 2,
                      })
                    )
                  }>
                  открыть
                </Button>
                <span style={{ marginLeft: 10 }}>
                  работы на сумму: {sumWorks()} рублей
                </span>
              </Form.Item>
              <Form.Item label="Список материалов" name="materials">
                <Button
                  onClick={() =>
                    dispatch(
                      updateModals({
                        modal: 4,
                      })
                    )
                  }>
                  открыть
                </Button>
                <span style={{ marginLeft: 10 }}>
                  материалы на сумму: {sumMaterial()} рублей
                </span>
              </Form.Item>
              <Divider />
              <Form.Item label="Итого сумма" name="resultSumOrder">
                <Text type="success" strong>
                  {sumMaterial() + sumWorks()} рублей
                </Text>
              </Form.Item>
              <Form.Item label="Комментарий" name="comment">
                <TextArea
                  rows={4}
                  placeholder="ваш комментарий по заказу"
                  maxLength={50}
                  showCount
                  value={formValue.comment}
                  onChange={(e) =>
                    dispatch(
                      setCreateOrderValue({
                        ...formValue,
                        comment: e.target.value,
                      })
                    )
                  }
                />
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Modal>
    </>
  );
}

export default CreareOrder;
