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
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Content, Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { setDefaulWorkList, setWorklist } from "../../features/workListSlice";
import { useGetUnitQuery, useGetWorkQuery } from "../../api";
import uuid from "react-uuid";
import { setCreateOrderValue } from "../../features/createOrderSlice";

function CreateWorkList({ open }) {
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
              setWorklist(
                [...workListData].filter((item) => item.id_item !== id)
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
  const [isOpenAddWork, setIsOpenAddWork] = useState(false);
  const [workData, setWorkData] = useState({
    id: 0,
    price: 0,
    name: "",
    count: 1,
    sum: 0,
  });
  const workListData = useSelector((state) => state.worklist.data);
  const { data: work = [] } = useGetWorkQuery();
  const { data: unit = [] } = useGetUnitQuery();

  const handleCancel = () => {
    dispatch(updateModals({ modal: 2 }));
    dispatch(setDefaulWorkList());
    form.resetFields();
  };

  const handleOk = () => {
    dispatch(setCreateOrderValue({ ...formValue, worklist: workListData }));
    form.resetFields();
    dispatch(updateModals({ modal: 2 }));
  };

  const handleOkCreateWork = () => {
    const id_uuid = uuid();
    setIsOpenAddWork(false);
    dispatch(
      setWorklist([
        ...workListData,
        {
          ...workData,
          id_item: id_uuid,
          sum: workData.count * workData.price,
          actions: id_uuid,
        },
      ])
    );
    form.resetFields();
    setWorkData({ id: 0, price: 0, name: "", count: 1, sum: 0 });
  };

  const handleCancelAddWork = () => {
    setIsOpenAddWork(false);
    setWorkData({ id: 0, price: 0, name: "", count: 1, sum: 0 });
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      price: workData?.price,
    });
  }, [workData]);
  return (
    <>
      <Modal
        open={open}
        centered
        width={"50%"}
        title="Создание сметы на работы"
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
              dataSource={workListData}
              pagination={{
                pageSize: 5,
              }}
            />
            <Button
              onClick={() => setIsOpenAddWork(true)}
              icon={<PlusOutlined />}>
              Добавить
            </Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        open={isOpenAddWork}
        title="Создание работы"
        closable={false}
        centered
        cancelText="отмена"
        okText="создать"
        onOk={() => form.validateFields().then((values) => handleOkCreateWork)}
        onCancel={handleCancelAddWork}
        maskClosable={false}>
        <Header style={{ backgroundColor: "whitesmoke" }}></Header>
        <Content>
          <Form labelCol={{ span: 5 }} form={form} autoComplete="off">
            <Form.Item
              label="Работа"
              name="work"
              rules={[
                {
                  required: true,
                  message: "необходимо выбрать наименование работы",
                },
              ]}>
              <Space>
                <Select
                  style={{ width: 250 }}
                  onChange={(value) => {
                    form.setFieldValue("work", value);
                    setWorkData((prev) => {
                      return {
                        ...prev,
                        id: work.find((item) => value === item.id).id,
                        price: work.find((item) => value === item.id).price,
                        name: work.find((item) => value === item.id).name,
                      };
                    });
                  }}
                  options={work.map((item) => {
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
                        modal: 6,
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
                  message: "необходимо выбрать ед измерения работы",
                },
              ]}>
              <Select
                onChange={(value) => {
                  form.setFieldValue("unit", value);
                  setWorkData({
                    ...workData,
                    unit: value,
                  });
                }}
                options={unit.map((item) => {
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
                  message: "необходимо указать количество работы",
                },
              ]}>
              <InputNumber
                min={1}
                max={1000}
                defaultValue={1}
                onChange={(value) => {
                  form.setFieldValue("count", value);
                  setWorkData({
                    ...workData,
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
                  message: "необходимо указать цену работы",
                },
              ]}>
              <Input
                onChange={(e) => {
                  form.setFieldValue("price", e.target.value);
                  setWorkData({ ...workData, price: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </>
  );
}

export default CreateWorkList;
