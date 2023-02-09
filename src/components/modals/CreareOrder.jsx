import React, { useState } from "react";
import {
  Button,
  Form,
  Layout,
  Modal,
  Space,
  Input,
  Select,
  Collapse,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import {
  useAddOrderMutation,
  useGetClientQuery,
  useGetCompanyQuery,
  useGetWorkQuery,
} from "../../api";
import { Content, Header } from "antd/es/layout/layout";

const { TextArea } = Input;
const { Panel } = Collapse;

function CreareOrder({ open }) {
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const { data: clients = [], isLoading: isClientLoading } =
    useGetClientQuery();
  const { data: company = [], isLoading: isCompanyLoading } =
    useGetCompanyQuery();
  const { data: works = [], isLoading: isLoadingWork } = useGetWorkQuery();
  const [isModalOpen, setIsModalOpen] = useState(open);
  const [formValue, setFormValue] = useState({
    uid: "",
    client_id: 0,
    company_id: 0,
  });

  const handleOk = async () => {
    await addOrder({
      uid: formValue.uid,
      client_id: formValue.client_id,
      company_id: formValue.company_id,
    }).unwrap();
    setFormValue({
      uid: "",
      client_id: 0,
      company_id: 0,
    });
    dispatch(updateModals({ modal: "", keyModal: 0 }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(updateModals({ modal: "", keyModal: 0 }));
  };

  return (
    <Modal
      width={"70%"}
      title="Создание заказа"
      closable={false}
      maskClosable={false}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}>
      <Layout>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          Для создание заказа неободимо заполнить все поля
        </Header>
        <Content>
          <Form autoComplete={false} labelCol={{ span: 3 }}>
            <Form.Item
              label="Клиент"
              name="client"
              rules={[
                { required: true, message: "Выберите клинета из списка!" },
              ]}>
              <Select
                style={{ width: 120 }}
                value={formValue.client_id}
                onChange={(value) =>
                  setFormValue({
                    ...formValue,
                    client_id: value,
                  })
                }
                options={clients?.map((client) => {
                  return { value: client.id, label: client.uid };
                })}
              />
            </Form.Item>
            <Form.Item label="Список работ" name="works">
              <Collapse>
                <Panel header="Список работ" key="1">
                  <Form.List name="WorksList">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, "first"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing first name",
                                },
                              ]}>
                              <Select
                                loading={isLoadingWork}
                                options={works?.map((work) => {
                                  return { value: work.id, label: work.name };
                                })}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "last"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing last name",
                                },
                              ]}>
                              <Input placeholder="Last Name" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Panel>
              </Collapse>
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
              />
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
}

export default CreareOrder;
