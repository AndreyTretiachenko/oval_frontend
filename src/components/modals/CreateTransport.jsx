import React from "react";
import { Modal, Layout, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { useAddTransportMutation } from "../../api";

const { Header, Content } = Layout;

function CreateTransport({ open }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [addTransport] = useAddTransportMutation();
  const formValue = useSelector((state) => state.createOrder);

  const handleCancel = () => {
    dispatch(updateModals({ modal: 5 }));
    form.resetFields();
  };

  const handleOk = async () => {
    await addTransport({
      vin: form.getFieldValue("vin"),
      carNumber: form.getFieldValue("carNumber"),
      brand: form.getFieldValue("brand"),
      model: form.getFieldValue("model"),
      person_id: formValue.person_id || 0,
      company_id: formValue.company_id || 0,
    })
      .unwrap()
      .finally(() => {
        form.resetFields();
        dispatch(updateModals({ modal: 5 }));
      });
  };

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
      onOk={() =>
        form
          .validateFields(["brand", "model", "vin", "carNumber"])
          .then(() => handleOk())
      }>
      <Layout>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          Для создание транспорта неободимо заполнить все поля
        </Header>
        <Content>
          <Form labelCol={{ span: 4 }} form={form}>
            <Form.Item
              label="Марка"
              name="brand"
              rules={[{ required: true, message: "необходимо указать марку" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Модель"
              name="model"
              rules={[
                { required: true, message: "необходимо указать модель" },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="VIN"
              name="vin"
              rules={[
                {
                  required: true,
                  message: "необходимо указать VIN автомобиля",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Гос номер"
              name="carNumber"
              rules={[
                {
                  required: true,
                  message: "необходимо указать гос номер автомобиля",
                },
              ]}>
              <Input />
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
}

export default CreateTransport;
