import React from "react";
import { Modal, Layout } from "antd";

const { Header, Content } = Layout;

function CreateClient({ open }) {
  return (
    <Modal open={open}>
      <Header></Header>
      <Content></Content>
    </Modal>
  );
}

export default CreateClient;
