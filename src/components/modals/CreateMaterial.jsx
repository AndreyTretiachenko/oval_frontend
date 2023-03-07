import React from "react";
import { Modal, Form, InputNumber, Layout, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { useAddMaterialMutation } from "../../api";

const { Content } = Layout;

function CreateMaterial({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addMaterial] = useAddMaterialMutation();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Modal
        title="Создание нового материала"
        width={"50%"}
        open={open}
        okText="Создать"
        cancelText="Отмена"
        onOk={() => {
          form.validateFields(["name", "price"]).then(async () => {
            await addMaterial({
              name: form.getFieldValue("name"),
              price: form.getFieldValue("price"),
            })
              .unwrap()
              .then((res) => {
                if (res.status === "successful") {
                  messageApi.open({
                    type: "success",
                    content: `материал добавлен`,
                    duration: 1.5,
                  });
                  form.resetFields();
                  dispatch(updateModals({ modal: 7 }));
                } else {
                  messageApi.open({
                    type: "error",
                    content: `ошибка добавления материала`,
                    duration: 1.5,
                  });
                }
              })
              .finally(() => {
                form.resetFields();
              });
          });
        }}
        onCancel={() => {
          dispatch(updateModals({ modal: 7 }));
        }}>
        <Layout style={{ backgroundColor: "white" }}>
          <Content style={{ backgroundColor: "white", marginTop: 20 }}>
            <Form form={form} labelCol={{ span: 5 }}>
              <Form.Item
                name="name"
                label="Наименование"
                rules={[
                  {
                    required: true,
                    message: "необходимо указать наименование материала",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="Цена"
                rules={[
                  {
                    required: true,
                    message: "необходимо указать цену материала",
                  },
                ]}>
                <InputNumber step={0.1} />
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Modal>
    </>
  );
}

export default CreateMaterial;
