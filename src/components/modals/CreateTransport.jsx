import React from "react";
import { Modal, Layout, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { useAddTransportMutation } from "../../api";
import { cars } from "../../dbcars/cars";
import { useState } from "react";

const { Header, Content } = Layout;

function CreateTransport({ open }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [addTransport] = useAddTransportMutation();
  const formValue = useSelector((state) => state.createOrder);
  const [brandSelect, setBrandSelect] = useState();

  const handleCancel = () => {
    dispatch(updateModals({ modal: 5 }));
    form.resetFields();
  };

  const handleOk = async () => {
    await addTransport({
      vin: form.getFieldValue("vin"),
      carNumber: form.getFieldValue("carNumber"),
      brand: form.getFieldValue("brand"),
      model: form.getFieldValue("model").split(",")[0].trim(),
      person_id: formValue.person_id || 0,
      company_id: formValue.company_id || 0,
      year: Number(form.getFieldValue("year")),
      modification: form.getFieldValue("modification"),
      engineNumber: form.getFieldValue("engineNumber"),
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
          <Form labelCol={{ span: 4 }} form={form} autoComplete="off">
            <Form.Item
              label="Марка"
              name="brand"
              rules={[{ required: true, message: "необходимо указать марку" }]}>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cars.map((brand) => {
                  return { label: brand.brand, value: brand.brand };
                })}
                onChange={(value) => {
                  setBrandSelect(value);
                  form.setFieldValue("model");
                }}
              />
            </Form.Item>
            <Form.Item
              label="Модель"
              name="model"
              rules={[
                { required: true, message: "необходимо указать модель" },
              ]}>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={
                  (brandSelect !== "") &
                  (cars.find((item) => item.brand === brandSelect) !==
                    undefined)
                    ? cars
                        .find((item) => item.brand === brandSelect)
                        .modelList?.sort((a, b) => (a.model < b.model ? 1 : -1))
                        .map((model) => {
                          return {
                            label: model.model,
                            value: model.model,
                          };
                        })
                    : []
                }
              />
            </Form.Item>
            <Form.Item
              label="Модификация"
              name="modification"
              rules={[
                {
                  required: true,
                  message: "необходимо указать модификацию автомобиля",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Год выпуска"
              name="year"
              rules={[
                {
                  required: true,
                  message: "необходимо указать год выпуска автомобиля",
                },
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
              <Input maxLength={17} showCount />
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
            <Form.Item label="Номер двигателя" name="engineNumber">
              <Input showCount />
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
}

export default CreateTransport;
