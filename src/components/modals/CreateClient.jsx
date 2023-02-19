import React, { useState } from "react";
import { Modal, Layout, Form, Radio, Input } from "antd";
import { useAddCompanyMutation, useAddPersonMutation } from "../../api";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";

const { Header, Content } = Layout;

function CreateClient({ open }) {
  const dispatch = useDispatch();
  const [addCompany] = useAddCompanyMutation();
  const [addPerson] = useAddPersonMutation();
  const [formValue, setFormValue] = useState({
    client_type: "company",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    email: "",
    name: "",
    inn: 0,
  });

  const handleCancel = () => {
    dispatch(updateModals({ modal: 3 }));
    setFormValue({
      client_type: "company",
      firstName: "",
      lastName: "",
      phoneNumber: 0,
      email: "",
      name: "",
      inn: 0,
    });
  };

  const handleOk = async () => {
    if (formValue.client_type === "company")
      await addCompany({
        name: formValue.name,
        inn: Number(formValue.inn),
      }).finally(() => {
        dispatch(updateModals({ modal: 3 }));
        setFormValue({
          client_type: "company",
          firstName: "",
          lastName: "",
          phoneNumber: 0,
          email: "",
          name: "",
          inn: 0,
        });
      });
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
      onOk={handleOk}>
      <Layout>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          Для создание клиента неободимо заполнить все поля
        </Header>
        <Content>
          <Form labelCol={{ span: 4 }}>
            <Form.Item label="тип клиента" name="typeClient">
              <Radio.Group
                optionType="button"
                defaultValue={"company"}
                value={formValue.client_type}
                onChange={(e) =>
                  setFormValue({ ...formValue, client_type: e.target.value })
                }
                buttonStyle="solid"
                options={[
                  { label: "юр.лицо", value: "company" },
                  { label: "физ.лицо", value: "fl" },
                ]}
              />
            </Form.Item>
            {formValue.client_type === "company" ? (
              <>
                <Form.Item label="название" name="nameFl">
                  <Input
                    value={formValue.name}
                    onChange={(e) =>
                      setFormValue({ ...formValue, name: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="ИНН" name="inn">
                  <Input
                    value={formValue.inn}
                    onChange={(e) =>
                      setFormValue({ ...formValue, inn: e.target.value })
                    }
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item label="имя" name="firstName">
                  <Input
                    value={formValue.firstName}
                    onChange={(e) =>
                      setFormValue({ ...formValue, firstName: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="фамилия" name="lastName">
                  <Input
                    value={formValue.lastName}
                    onChange={(e) =>
                      setFormValue({ ...formValue, lastName: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="телефон" name="phoneNumber">
                  <Input
                    value={formValue.phoneNumber}
                    onChange={(e) =>
                      setFormValue({
                        ...formValue,
                        phoneNumber: Number(e.target.value),
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="email" name="email">
                  <Input
                    value={formValue.email}
                    onChange={(e) =>
                      setFormValue({ ...formValue, email: e.target.value })
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
