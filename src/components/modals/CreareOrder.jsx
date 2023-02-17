import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Layout,
  Modal,
  Radio,
  Space,
  Input,
  Select,
  Collapse,
} from "antd";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import {
  useAddOrderMutation,
  useAddWorkListMutation,
  useAddWorksMutation,
  useGetCompanyQuery,
  useGetPersonQuery,
  useGetWorkQuery,
} from "../../api";
import { Content, Header } from "antd/es/layout/layout";

const { TextArea } = Input;
const { Panel } = Collapse;

function CreareOrder({ open }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const [addWorkList] = useAddWorkListMutation();
  const [addWorks] = useAddWorksMutation();
  const { data: person = [], isLoading: isPersonLoading } = useGetPersonQuery();
  const { data: company = [], isLoading: isCompanyLoading } =
    useGetCompanyQuery();
  const { data: works = [], isLoading: isLoadingWork } = useGetWorkQuery();
  const worklist = useSelector((state) => state.worklist.data);
  const [formValue, setFormValue] = useState({
    uid: "",
    client_id: 0,
    company_id: 0,
    comment: "",
    worklist: [],
  });
  const [typeListClient, setTypeListClient] = useState("company");

  useEffect(() => {
    setFormValue({ ...formValue, worklist: worklist });
  }, [worklist]);

  const handleCreateOrder = async () => {
    await addOrder({
      uid: uuid(),
      person_id: formValue.person_id || null,
      company_id: formValue.company_id || null,
      comment: formValue.comment || null,
    })
      .unwrap()
      .then((res) => {
        if (res.status === "successful")
          addWorkList({ order_id: res.order })
            .unwrap()
            .then((res) => {
              if (res.status === "successful")
                formValue?.worklist?.map((work) =>
                  addWorks({
                    count: work.count,
                    id_worklist: res.workList,
                    id_work: work.id,
                  }).unwrap()
                );
            })
            .finally(() => {
              dispatch(updateModals({ modal: 1 }));
              setFormValue({
                uid: "",
                client_id: 0,
                company_id: 0,
                comment: "",
                worklist: [],
              });
            });
      })
      .catch(console.log("error response"));
  };

  const handleCancel = () => {
    dispatch(updateModals({ modal: 1 }));
  };

  const onChangeType = ({ target: { value } }) => {
    setTypeListClient(value);
    form.setFieldsValue({
      client: "",
    });
  };

  return (
    <Modal
      width={"70%"}
      title="Создание заказа"
      closable={false}
      maskClosable={false}
      open={open}
      onOk={handleCreateOrder}
      onCancel={handleCancel}>
      <Layout>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          Для создание заказа неободимо заполнить все поля
        </Header>
        <Content>
          <Form labelCol={{ span: 3 }} form={form}>
            <Form.Item label="Тип клиента" name="type">
              <Radio.Group
                options={[
                  { label: "юр.лицо", value: "company" },
                  { label: "физ.лицо", value: "fl" },
                ]}
                value={typeListClient}
                onChange={onChangeType}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item
              label="Клиент"
              name="client"
              rules={[
                { required: true, message: "Выберите клинета из списка!" },
              ]}>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                loading={
                  typeListClient === "company"
                    ? isCompanyLoading
                    : isPersonLoading
                }
                style={{ width: 300 }}
                defaultActiveFirstOption={0}
                value={formValue.client_id}
                onChange={(value) => {
                  typeListClient === "company"
                    ? setFormValue({
                        ...formValue,
                        company_id: value,
                      })
                    : setFormValue({
                        ...formValue,
                        person_id: value,
                      });
                }}
                options={
                  typeListClient === "company"
                    ? company?.map((item) => {
                        return { label: item.name, value: item.id };
                      })
                    : person?.map((per) => {
                        return {
                          label: per.firstName + " " + per.lastName,
                          value: per.id,
                        };
                      })
                }
              />
            </Form.Item>
            <Form.Item label="Список работ" name="works">
              <Button
                onClick={() =>
                  dispatch(
                    updateModals({
                      modal: 2,
                    })
                  )
                }>
                добавить
              </Button>
            </Form.Item>
            <Form.Item
              label="Комментарий"
              name="comment"
              rules={[
                { required: true, message: "Выберите клинета из списка!" },
              ]}>
              <TextArea
                rows={4}
                placeholder="ваш комментарий по заказу"
                maxLength={50}
                showCount
                value={formValue.comment}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    comment: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Modal>
  );
}

export default CreareOrder;
