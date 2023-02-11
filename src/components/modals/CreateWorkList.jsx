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
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Content, Header } from "antd/es/layout/layout";
import { setWorklist } from "../../features/workListSlice";
import { useGetWorkQuery, useGetWorksQuery } from "../../api";

function CreateWorkList({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isOpenAddWork, setIsOpenAddWork] = useState(false);
  const [workData, setWorkData] = useState({ id: 0, price: 0, name: "" });
  const { data: works = [] } = useGetWorksQuery();
  const { data: work = [] } = useGetWorkQuery();
  const handleCancel = () => {
    dispatch(updateModals({ modal: 2 }));
  };
  const handleCancelAddWork = () => {
    setIsOpenAddWork(false);
    setWorkData({ id: 0, price: 0, name: "" });
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
        width={"50%"}
        title="Создание сметы на работы"
        closable={false}
        maskClosable={false}
        onOk={() => {}}
        onCancel={handleCancel}>
        <Layout>
          <Header style={{ backgroundColor: "whitesmoke" }}></Header>
          <Content>
            <Table></Table>
            <Button onClick={() => setIsOpenAddWork(true)}>Добавить</Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        open={isOpenAddWork}
        title="Создание работы"
        closable={false}
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
              <InputNumber defaultValue={1} />
            </Form.Item>
            <Form.Item label="Цена" name="price">
              <Input />
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </>
  );
}

export default CreateWorkList;
