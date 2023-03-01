import React from "react";
import { Modal, Form, InputNumber, Layout, Input, message } from "antd";
import { FrownFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { useAddWorkMutation } from "../../api";

const { Content } = Layout;

function CreateWork({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addWork] = useAddWorkMutation();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Modal
        title="Создание новой работы"
        width={"50%"}
        open={open}
        okText="Создать"
        cancelText="Отмена"
        onOk={() => {
          form.validateFields(["name", "price"]).then(async () => {
            await addWork({
              name: form.getFieldValue("name"),
              price: form.getFieldValue("price"),
            })
              .unwrap()
              .then((res) => {
                if (res.status === "successful") {
                  messageApi.open({
                    type: "success",
                    content: `работа добавлена`,
                    duration: 1.5,
                  });
                  form.resetFields();
                  dispatch(updateModals({ modal: 6 }));
                } else {
                  messageApi.open({
                    type: "error",
                    content: `ошибка добавления работы`,
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
          dispatch(updateModals({ modal: 6 }));
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
                    message: "необходимо указать наименование работы",
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
                    message: "необходимо указать цену работы",
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

export default CreateWork;
