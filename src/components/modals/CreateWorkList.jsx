import React, { useState } from "react";
import { Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Content, Header } from "antd/es/layout/layout";
import { Layout } from "antd";

function CreateWorkList({ open }) {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateModals({ modal: 2 }));
  };
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
          <Content>input data</Content>
        </Layout>
      </Modal>
    </>
  );
}

export default CreateWorkList;
