import React, { useEffect, useState } from "react";
import { Modal, Table, Layout, Form, Button, Select, Input, Space, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Content, Header } from "antd/es/layout/layout";
import { useGetMaterialQuery, useGetUnitQuery } from "../../api";
import { PlusOutlined } from "@ant-design/icons";
import { setMateriallist, setDefaulMaterialList } from "../../features/materialListSlice";
import uuid from "react-uuid";
import { setCreateOrderValue } from "../../features/createOrderSlice";

function CreateMaterialList({ open }) {
  const { data: units = [] } = useGetUnitQuery();
  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Ед измерения",
      dataIndex: "unit",
      key: "unit",
      render: (unit) => units.find((item) => item.id === unit).name,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Стоимость",
      dataIndex: "sum",
      key: "sum",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: (id) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => dispatch(setMateriallist([...materialListData].filter((item) => item.id_item !== id)))}>
          удалить
        </a>
      ),
    },
  ];
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formValue = useSelector((state) => state.createOrder);
  const [isOpenAddMaterial, setIsOpenAddMaterial] = useState(false);
  const [materialData, setMaterialData] = useState({
    id: 0,
    price: 0,
    name: "",
    count: 1,
    sum: 0,
  });
  const materialListData = useSelector((state) => state.materiallist.data);
  const { data: material = [] } = useGetMaterialQuery();

  const handleCancel = () => {
    dispatch(updateModals({ modal: 4 }));
    dispatch(setDefaulMaterialList());
    form.resetFields();
  };

  const handleOk = () => {
    dispatch(setCreateOrderValue({ ...formValue, materiallist: materialListData }));
    form.resetFields();
    dispatch(updateModals({ modal: 4 }));
  };

  const handleOkCreateMaterial = () => {
    const id_uuid = uuid();
    setIsOpenAddMaterial(false);
    dispatch(
      setMateriallist([
        ...materialListData,
        {
          ...materialData,
          id_item: id_uuid,
          sum: materialData.count * materialData.price,
          actions: id_uuid,
        },
      ])
    );
    form.resetFields();
    setMaterialData({ id: 0, price: 0, name: "", count: 1, sum: 0 });
  };

  const handleCancelAddMaterial = () => {
    setIsOpenAddMaterial(false);
    setMaterialData({ id: 0, price: 0, name: "", count: 1, sum: 0 });
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      price: materialData?.price,
    });
  }, [materialData]);
  return (
    <>
      <Modal
        destroyOnClose
        open={open}
        centered
        width={"65%"}
        title="Создание сметы на материалы"
        closable={false}
        maskClosable={false}
        cancelText="Очистить"
        okText="Сохранить"
        onCancel={handleCancel}
        onOk={handleOk}>
        <Layout>
          <Content style={{ backgroundColor: "white" }}>
            <Table
              columns={columns}
              dataSource={materialListData}
              pagination={{
                pageSize: 5,
              }}
            />
            <Button onClick={() => setIsOpenAddMaterial(true)} icon={<PlusOutlined />}>
              Добавить
            </Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        destroyOnClose
        open={isOpenAddMaterial}
        destroyOnClose
        title="Создание материала"
        closable={false}
        centered
        width={"50%"}
        cancelText="отмена"
        okText="создать"
        onOk={() => form.validateFields().then((values) => handleOkCreateMaterial)}
        onCancel={handleCancelAddMaterial}
        maskClosable={false}>
        <Content>
          <Form labelCol={{ span: 6 }} form={form}>
            <Form.Item
              label="Материал"
              name="material"
              autoComplete="off"
              rules={[
                {
                  required: true,
                  message: "необходимо выбрать наименование материала",
                },
              ]}>
              <Space>
                <Select
                  style={{ width: 450 }}
                  onChange={(value) => {
                    form.setFieldValue("material", value);
                    form.setFieldValue("count", 1);
                    setMaterialData((prev) => {
                      return {
                        ...prev,
                        id: material.find((item) => value === item.id).id,
                        price: material.find((item) => value === item.id).price,
                        name: material.find((item) => value === item.id).name,
                      };
                    });
                  }}
                  options={material.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                />
                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    dispatch(
                      updateModals({
                        modal: 7,
                      })
                    )
                  }
                />
              </Space>
            </Form.Item>
            <Form.Item
              label="Ед измерения"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "необходимо указать ед измерения материала",
                },
              ]}>
              <Select
                style={{ width: 150 }}
                onChange={(value) => {
                  form.setFieldValue("unit", value);
                  setMaterialData({
                    ...materialData,
                    unit: value,
                  });
                }}
                options={units.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              label="Количество"
              name="count"
              rules={[
                {
                  required: true,
                  message: "необходимо указать количество материала",
                },
              ]}>
              <InputNumber
                min={1}
                max={1000}
                style={{ width: 80 }}
                defaultValue={1}
                onChange={(value) => {
                  form.setFieldValue("count", value);
                  setMaterialData({
                    ...materialData,
                    count: value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Цена"
              name="price"
              rules={[
                {
                  required: true,
                  message: "необходимо указать цену материала",
                },
              ]}>
              <InputNumber
                step={0.01}
                style={{ width: 150 }}
                onChange={(e) => {
                  form.setFieldValue("price", e);
                  setMaterialData({ ...materialData, price: e });
                }}
              />
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </>
  );
}

export default CreateMaterialList;
