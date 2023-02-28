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
  useAddMaterialsMutation,
  useAddWorksMutation,
  useDeleteMaterialsMutation,
  useDeleteWorksMutation,
  useGetMaterialQuery,
  useGetUnitQuery,
  useGetWorkQuery,
} from "../../api";
import { useState } from "react";

const { Content } = Layout;

function UpdateMaterialList({ open, data }) {
  const dispatch = useDispatch();
  const [deleteMaterial] = useDeleteMaterialsMutation();
  const [addMaterial] = useAddMaterialsMutation();
  const { data: material = [] } = useGetMaterialQuery();
  const { data: unit = [] } = useGetUnitQuery();
  const [isOpenAddMaterial, setIsOpenAddMaterial] = useState(false);
  const handleCancel = () => {
    dispatch(updateModals({ modal: 7 }));
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  return (
    <>
      {contextHolder}
      <Modal
        title="Редактироваине списка материалов"
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
                        await deleteMaterial({ id: id })
                          .unwrap()
                          .catch((er) => {
                            if (er)
                              messageApi.open({
                                type: "error",
                                content: `ошибка при удалении материала`,
                              });
                          })
                          .finally(
                            messageApi.open({
                              type: "success",
                              content: `материал успешно удалена`,
                            })
                          );
                      }}>
                      удалить
                    </a>
                  ),
                },
              ]}
              dataSource={data.materialList[0].materials.map((material) => ({
                name: material.material.name,
                count: material.count,
                price: material.material.price,
                id: material.id,
                unit: material.unit.name,
                actions: material.id,
              }))}
            />
            <Button onClick={() => setIsOpenAddMaterial(true)}>добавить</Button>
          </Content>
        </Layout>
      </Modal>
      <Modal
        open={isOpenAddMaterial}
        title="Создание материала"
        closable={false}
        centered
        onOk={async () => {
          await addMaterial({
            count: Number(form.getFieldValue("count")),
            materiallist_id: data.materialList[0].id,
            material_id: Number(form.getFieldValue("material")),
            unit_id: Number(form.getFieldValue("unit")),
          });
          setIsOpenAddMaterial(false);
          form.resetFields();
        }}
        onCancel={() => {
          setIsOpenAddMaterial(false);
          form.resetFields();
        }}
        maskClosable={false}>
        <Content>
          <Form labelCol={{ span: 6 }} form={form}>
            <Form.Item label="Материал" name="material" autoComplete="off">
              <Select
                options={material.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                onChange={(value) => {
                  material.map((item) => {
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

export default UpdateMaterialList;
