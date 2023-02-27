import React from "react";
import { Modal, Layout } from "antd";

const { Content } = Layout;

function UpdateMaterialList() {
  return (
    <Modal
      title="Редактироваине списка материалов"
      closable
      maskClosable={false}>
      <Layout>
        <Content></Content>
      </Layout>
    </Modal>
  );
}

export default UpdateMaterialList;
