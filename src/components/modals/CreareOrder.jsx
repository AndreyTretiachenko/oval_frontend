import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Input, Select } from "antd";
import {
  useAddOrderMutation,
  useGetClientQuery,
  useGetCompanyQuery,
} from "../../api";

function CreareOrder({ open }) {
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const { data: clients = [], isLoading: isClientLoading } =
    useGetClientQuery();
  const { data: company = [], isLoading: isCompanyLoading } =
    useGetCompanyQuery();
  const [isModalOpen, setIsModalOpen] = useState(open);
  const [formValue, setFormValue] = useState({
    uid: "",
    client_id: 0,
    company_id: 0,
  });

  const handleOk = async () => {
    await addOrder({
      uid: formValue.uid,
      client_id: formValue.client_id,
      company_id: formValue.company_id,
    }).unwrap();
    setFormValue({
      uid: "",
      client_id: 0,
      company_id: 0,
    });
    dispatch(updateModals({ modal: "", keyModal: 0 }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(updateModals({ modal: "", keyModal: 0 }));
  };

  return (
    <Modal
      title="Создание заказа"
      closable={false}
      maskClosable={false}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}>
      <Input
        placeholder="uid заказа"
        title="UID"
        showCount={true}
        allowClear
        onChange={(e) => setFormValue({ ...formValue, uid: e.target.value })}
      />
      <Select
        style={{ width: 120 }}
        value={formValue.client_id}
        onChange={(value) =>
          setFormValue({
            ...formValue,
            client_id: value,
          })
        }
        options={clients?.map((client) => {
          return { value: client.id, label: client.uid };
        })}
      />
      <Select
        style={{ width: 200 }}
        value={formValue.company_id}
        onChange={(value) =>
          setFormValue({
            ...formValue,
            company_id: value,
          })
        }
        options={company?.map((company) => {
          return { value: company.id, label: company.name };
        })}
      />
    </Modal>
  );
}

export default CreareOrder;
