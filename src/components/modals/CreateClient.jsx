import React, { useState } from "react";
import { Modal, Layout, Form, Radio, Input } from "antd";
import { useAddCompanyMutation, useAddPersonMutation } from "../../api";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";

const { Header, Content } = Layout;

function CreateClient({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addCompany] = useAddCompanyMutation();
  const [addPerson] = useAddPersonMutation();
  const [formData, setFormData] = useState({
    client_type: "company",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    email: "",
    name: "",
    inn: 0,
    kpp: 0,
  });

  const handleCancel = () => {
    dispatch(updateModals({ modal: 3 }));
    form.resetFields();
    setFormData((prev) => ({
      ...prev,
      client_type: "company",
      firstName: "",
      lastName: "",
      phoneNumber: 0,
      email: "",
      name: "",
      inn: 0,
      kpp: 0,
    }));
  };

  const handleOk = async () => {
    if (formData.client_type === "company") {
      await addCompany({
        name: formData.name,
        inn: Number(formData.inn),
        kpp: formData.kpp,
      }).finally(() => {
        form.resetFields();
        dispatch(updateModals({ modal: 3 }));
      });
    } else {
      await addPerson({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      }).finally(() => {
        form.resetFields();
        dispatch(updateModals({ modal: 3 }));
      });
    }
  };

  return (
    <Modal
      title="Cоздание клиента"
      open={open}
      width={"50%"}
      closable={false}
      maskClosable={false}
      okText="создать"
      cancelText="отмена"
      onCancel={handleCancel}
      onOk={() => {
        if (formData.client_type === "company")
          form.validateFields(["nameFl", "inn"]).then(() => handleOk());
        else
          form
            .validateFields(["firstName", "phoneNumber"])
            .then(() => handleOk());
      }}>
      <Layout>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          Для создание клиента неободимо заполнить все поля
        </Header>
        <Content>
          <Form
            labelCol={{ span: 4 }}
            autoComplete="off"
            form={form}
            initialValues={{ typeClient: "company" }}>
            <Form.Item label="Тип клиента" name="typeClient">
              <Radio.Group
                optionType="button"
                value={formData.client_type}
                onChange={(e) =>
                  setFormData({ ...formData, client_type: e.target.value })
                }
                buttonStyle="solid"
                options={[
                  { label: "юр.лицо", value: "company" },
                  { label: "физ.лицо", value: "fl" },
                ]}
              />
            </Form.Item>
            {formData.client_type === "company" ? (
              <>
                <Form.Item
                  label="Название"
                  name="nameFl"
                  rules={[
                    {
                      required: true,
                      message: "необходимо заполнить название организации",
                    },
                  ]}>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="ИНН"
                  name="inn"
                  rules={[
                    { required: true, message: "необходимо ввести инн" },
                    {
                      pattern: "^([-]?[1-9][0-9]*|0)$",
                      message: "допускает ввод только цифр",
                    },
                  ]}>
                  <Input
                    value={formData.inn}
                    showCount
                    maxLength={12}
                    onChange={(e) =>
                      setFormData({ ...formData, inn: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="КПП"
                  name="kpp"
                  rules={[
                    { required: true, message: "необходимо ввести КПП" },
                    {
                      pattern: "^([-]?[1-9][0-9]*|0)$",
                      message: "допускает ввод только цифр",
                    },
                  ]}>
                  <Input
                    value={formData.kpp}
                    showCount
                    maxLength={9}
                    onChange={(e) =>
                      setFormData({ ...formData, kpp: e.target.value })
                    }
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="Имя"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "необходимо ввести имя клиента",
                    },
                  ]}>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Фамилия" name="lastName">
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Телефон"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "необходимо ввести телефон" },
                    {
                      pattern: "^([-]?[1-9][0-9]*|0)$",
                      message: "допускает ввод только цифр",
                    },
                  ]}>
                  <Input
                    addonBefore=" +7 "
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phoneNumber: Number(e.target.value),
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { type: "email", message: "допускает ввод только цифр" },
                  ]}>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Item>
              </>
            )}
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
}

export default CreateClient;
