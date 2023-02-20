import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Layout,
  Form,
  Button,
  Select,
  Input,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Content, Header } from "antd/es/layout/layout";
import { useGetMaterialQuery } from "../../api";
import {
  setMateriallist,
  setDefaulMaterialList,
} from "../../features/materialListSlice";
import uuid from "react-uuid";
import { setCreateOrderValue } from "../../features/createOrderSlice";

function CreateMaterialList({ open }) {
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
        <a
          onClick={() =>
            dispatch(
              setMateriallist(
                [...materialListData].filter((item) => item.id_item !== id)
              )
            )
          }>
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
    dispatch(
      setCreateOrderValue({ ...formValue, materiallist: materialListData })
    );
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
        open={open}
        centered
        width={"50%"}
        title="Создание сметы на материалы"
        closable={false}
        maskClosable={false}
        cancelText="Удалить"
        okText="Сохранить"
        onCancel={handleCancel}
        onOk={handleOk}>
        <Layout>
          <Header style={{ backgroundColor: "whitesmoke" }}></Header>
          <Content>
            <Table
              columns={columns}
              dataSource={materialListData}
              pagination={{
                pageSize: 5,
              }}
            />
            <Button onClick={() => setIsOpenAddMaterial(true)}>Добавить</Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        open={isOpenAddMaterial}
        title="Создание работы"
        closable={false}
        centered
        onOk={handleOkCreateMaterial}
        onCancel={handleCancelAddMaterial}
        maskClosable={false}>
        <Header style={{ backgroundColor: "whitesmoke" }}></Header>
        <Content>
          <Form labelCol={{ span: 5 }} form={form}>
            <Form.Item label="Работа" name="work">
              <Select
                onChange={(value) => {
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
            </Form.Item>
            <Form.Item label="Количество" name="count">
              <InputNumber
                min={1}
                max={1000}
                defaultValue={1}
                onChange={(value) =>
                  setMaterialData({
                    ...materialData,
                    count: value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Цена" name="price">
              <Input
                onChange={(e) =>
                  setMaterialData({ ...materialData, price: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </>
  );
}

export default CreateMaterialList;
