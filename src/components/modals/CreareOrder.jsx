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
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import {
  useAddOrderMutation,
  useGetClientQuery,
  useGetPersonQuery,
  useGetWorkQuery,
} from "../../api";
import { Content, Header } from "antd/es/layout/layout";

const { TextArea } = Input;
const { Panel } = Collapse;

function CreareOrder({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const { data: clients = [], isLoading: isClientLoading } =
    useGetClientQuery();
  const { data: person = [], isLoading: isPersonLoading } = useGetPersonQuery();
  const { data: company = [], isLoading: isCompanyLoading } =
    useGetPersonQuery();
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
          <Form labelCol={{ span: 3 }} form={form}>
            <Form.Item
              label="Клиент"
              name="client"
              rules={[
                { required: true, message: "Выберите клинета из списка!" },
              ]}>
              <Select
                style={{ width: 300 }}
                value={formValue.client_id}
                onChange={(value) =>
                  setFormValue({
                    ...formValue,
                    client_id: value,
                  })
                }
                options={clients?.map((client) => {
                  return {
                    value: client?.company[0]?.id || client?.persons[0]?.id,
                    label:
                      client?.company[0]?.name ||
                      client?.persons[0]?.firstName +
                        "" +
                        client?.persons[0]?.lastName,
                  };
                })}
              />
            </Form.Item>
            <Form.Item label="Список работ" name="works">
              <Collapse>
                <Panel header="Список работ" key="1"></Panel>
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
