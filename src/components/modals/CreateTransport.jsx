import React from "react";
import { Modal, Layout, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";

const { Header, Content } = Layout;

function CreateTransport({ open }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formValue = useSelector((state) => state.createOrder);

  const handleCancel = () => {
    dispatch(updateModals({ modal: 5 }));
  };

  const handleOk = () => {};

  return (
    <Modal
      title="Cоздание транспорта"
      open={open}
      width={"50%"}
      closable={false}
      maskClosable={false}
      okText="создать"
      cancelText="отмена"
      onCancel={handleCancel}
      onOk={handleOk}>
      <Layout>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          Для создание транспорта неободимо заполнить все поля
        </Header>
        <Content>
          <Form labelCol={{ span: 4 }} form={form}>
            <Form.Item label="Марка" name="brand">
              <Input />
            </Form.Item>
            <Form.Item label="Модель" name="model">
              <Input />
            </Form.Item>
            <Form.Item label="VIN" name="vin">
              <Input />
            </Form.Item>
            <Form.Item label="Гос номер" name="carNumber">
              <Input />
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
}

export default CreateTransport;
