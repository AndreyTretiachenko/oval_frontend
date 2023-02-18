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
import { setWorklist } from "../../features/workListSlice";
import { useGetWorkQuery, useGetWorksQuery } from "../../api";
import uuid from "react-uuid";

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Стоимость",
      dataIndex: "sum",
      key: "sum",
      render: (text) => <a>{text}</a>,
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
  const [isOpenAddWork, setIsOpenAddWork] = useState(false);
  const [workData, setWorkData] = useState({
    id: 0,
    price: 0,
    name: "",
    count: 1,
    sum: 0,
  });
  const workListData = useSelector((state) => state.worklist.data);
  const { data: works = [] } = useGetWorksQuery();
  const { data: work = [] } = useGetWorkQuery();

  const handleCancel = () => {
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
    setWorkData({ id: 0, price: 0, name: "", count: 0, sum: 0 });
  };

  const handleCancelAddWork = () => {
    setIsOpenAddWork(false);
    setWorkData({ id: 0, price: 0, name: "", count: 0, sum: 0 });
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
        cancelButtonProps={{ type: "ghost" }}
        onOk={handleCancel}>
        <Layout>
          <Header style={{ backgroundColor: "whitesmoke" }}></Header>
          <Content>
            <Table
              columns={columns}
              dataSource={workListData}
              pagination={{
                pageSize: 5,
              }}
            />
            <Button onClick={() => setIsOpenAddWork(true)}>Добавить</Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        open={isOpenAddWork}
        title="Создание работы"
        closable={false}
        centered
        onOk={handleOkCreateWork}
        onCancel={handleCancelAddWork}
        maskClosable={false}>
        <Header style={{ backgroundColor: "whitesmoke" }}></Header>
        <Content>
          <Form labelCol={{ span: 5 }} form={form}>
            <Form.Item label="Работа" name="work">
              <Select
                onChange={(value) => {
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
            </Form.Item>
            <Form.Item label="Количество" name="count">
              <InputNumber
                min={1}
                max={1000}
                defaultValue={1}
                onChange={(value) =>
                  setWorkData({
                    ...workData,
                    count: value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Цена" name="price">
              <Input
                onChange={(e) =>
                  setWorkData({ ...workData, price: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </>
  );
}

export default CreateWorkList;
