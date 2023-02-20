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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import {
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

const { TextArea } = Input;

function CreareOrder({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const [addWorkList] = useAddWorkListMutation();
  const [addWorks] = useAddWorksMutation();
  const { data: person = [], isLoading: isPersonLoading } = useGetPersonQuery();
  const { data: company = [], isLoading: isCompanyLoading } =
    useGetCompanyQuery();
  const worklist = useSelector((state) => state.worklist.data);
  const formValue = useSelector((state) => state.createOrder);
  const [typeListClient, setTypeListClient] = useState("company");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreateOrder = async () => {
    setIsLoading(true);
    await addOrder({
      uid: uuid(),
      person_id: formValue.person_id || null,
      company_id: formValue.company_id || null,
      comment: formValue.comment || null,
    })
      .unwrap()
      .then((res) => {
        if (res.status === "successful")
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
              dispatch(setDefaultCreateOrderValue());
              form.resetFields();
              messageApi.open({
                type: "success",
                content: `заказ успешно создан`,
              });
            });
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
    dispatch(updateModals({ modal: 1 }));
    dispatch(setDefaultCreateOrderValue());
    form.resetFields();
  };

  const onChangeType = ({ target: { value } }) => {
    setTypeListClient(value);
    dispatch(
      setCreateOrderValue({ ...formValue, client_id: 0, company_id: 0 })
    );
    form.setFieldsValue({
      client: "",
    });
  };

  const sumWorks = () => {
    let sum = 0;
    formValue.worklist.map((item) => (sum = sum + item.count * item.price));
    return sum;
  };

  return (
    <>
      {contextHolder}
      <Modal
        width={"70%"}
        title="Создание заказа"
        closable={false}
        maskClosable={false}
        open={open}
        okText="создать"
        onOk={handleCreateOrder}
        okButtonProps={{ loading: isLoading }}
        cancelText="отмена"
        onCancel={handleCancel}>
        <Layout>
          <Header style={{ backgroundColor: "whitesmoke" }}>
            Для создание заказа неободимо заполнить все поля
          </Header>
          <Content>
            <Form labelCol={{ span: 4 }} form={form}>
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
              <Form.Item label="Клиент" name="client">
                <Space>
                  <Select
                    showSearch
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
                  cмета на сумму: {sumWorks()} рублей
                </span>
              </Form.Item>
              <Form.Item label="Список материалов" name="materials">
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
              </Form.Item>
              <Form.Item
                label="Комментарий"
                name="comment"
                rules={[
                  { required: true, message: "Выберите клинета из списка!" },
                ]}>
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
