import React from "react";
import { Modal, Layout } from "antd";

const { Content } = Layout;

function UpdateWorksList({ open }) {
  return (
    <Modal
      title="Редактироваине списка работ"
      closable={false}
      maskClosable={false}
      open={open}
      okText="Сохранить"
      cancelText="Закрыть">
      <Layout>
        <Content></Content>
      </Layout>
    </Modal>
  );
}

export default UpdateWorksList;
