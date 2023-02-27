import React from "react";
import { Modal, Layout } from "antd";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";

const { Content } = Layout;

function UpdateWorksList({ open, data }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(updateModals({ modal: 6 }));
  };

  return (
    <Modal
      title="Редактироваине списка работ"
      closable={false}
      maskClosable={false}
      open={open}
      okText="Сохранить"
      cancelText="Закрыть"
      onCancel={handleCancel}>
      <Layout>
        <Content>{data.id}</Content>
      </Layout>
    </Modal>
  );
}

export default UpdateWorksList;
