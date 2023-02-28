import React from "react";
import {
  Modal,
  Layout,
  Table,
  message,
  Button,
  Form,
  Select,
  Input,
  InputNumber,
} from "antd";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import {
  useAddWorksMutation,
  useDeleteWorksMutation,
  useGetUnitQuery,
  useGetWorkQuery,
} from "../../api";
import { useState } from "react";

const { Content } = Layout;

function UpdateWorksList({ open, data }) {
  const dispatch = useDispatch();
  const [deleteWork] = useDeleteWorksMutation();
  const [addWork] = useAddWorksMutation();
  const { data: work = [] } = useGetWorkQuery();
  const { data: unit = [] } = useGetUnitQuery();
  const [isOpenAddWork, setIsOpenAddWork] = useState(false);
  const handleCancel = () => {
    dispatch(updateModals({ modal: 6 }));
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  return (
    <>
      {contextHolder}
      <Modal
        title="Редактироваине списка работ"
        closable={false}
        width="50%"
        maskClosable={false}
        open={open}
        cancelText="Закрыть"
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}>
        <Layout>
          <Content>
            <Table
              columns={[
                {
                  title: "Название",
                  dataIndex: "name",
                  key: "name",
                  width: "30%",
                },
                {
                  title: "Ед измерения",
                  dataIndex: "unit",
                  key: "unit",
                },
                {
                  title: "Количество",
                  dataIndex: "count",
                  key: "count",
                },
                { title: "Цена", dataIndex: "price", key: "price" },
                {
                  title: "Действия",
                  dataIndex: "actions",
                  key: "actions",
                  render: (id) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      onClick={async () => {
                        await deleteWork({ id: id })
                          .unwrap()
                          .catch((er) => {
                            if (er)
                              messageApi.open({
                                type: "error",
                                content: `ошибка при удалении работы`,
                              });
                          })
                          .finally(
                            messageApi.open({
                              type: "success",
                              content: `работа успешно удалена`,
                            })
                          );
                      }}>
                      удалить
                    </a>
                  ),
                },
              ]}
              dataSource={data.workList[0].work.map((work) => ({
                name: work.work.name,
                count: work.count,
                price: work.work.price,
                id: work.id,
                unit: work.unit.name,
                actions: work.id,
              }))}
            />
            <Button onClick={() => setIsOpenAddWork(true)}>добавить</Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        open={isOpenAddWork}
        title="Создание материала"
        closable={false}
        centered
        onOk={async () => {
          await addWork({
            count: Number(form.getFieldValue("count")),
            id_worklist: data.workList[0].id,
            id_work: Number(form.getFieldValue("work")),
            unit_id: Number(form.getFieldValue("unit")),
          });
          setIsOpenAddWork(false);
          form.resetFields();
        }}
        onCancel={() => {
          setIsOpenAddWork(false);
          form.resetFields();
        }}
        maskClosable={false}>
        <Content>
          <Form labelCol={{ span: 6 }} form={form}>
            <Form.Item label="Работа" name="work" autoComplete="off">
              <Select
                options={work.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                onChange={(value) => {
                  work.map((item) => {
                    if (item.id === value)
                      form.setFieldValue("price", item.price);
                  });
                  form.setFieldValue("count", 1);
                }}
              />
            </Form.Item>
            <Form.Item label="Ед измерения" name="unit">
              <Select
                options={unit.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
              />
            </Form.Item>
            <Form.Item label="Количество" name="count">
              <InputNumber min={1} max={1000} defaultValue={1} />
            </Form.Item>
            <Form.Item label="Цена" name="price">
              <InputNumber step={0.01} />
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </>
  );
}

export default UpdateWorksList;
