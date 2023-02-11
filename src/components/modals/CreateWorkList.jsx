import React, { useState } from "react";
import { Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { updateModals } from "../../features/modalsSlice";
import { Content, Header } from "antd/es/layout/layout";
import { Layout, Form } from "antd";
import { setWorklist } from "../../features/workListSlice";
import { useGetWorkQuery, useGetWorksQuery } from "../../api";

function CreateWorkList({ open }) {
  const dispatch = useDispatch();
  const { data: works = [] } = useGetWorksQuery();
  const { data: work = [] } = useGetWorkQuery();
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
          <Content>
            <Form></Form>
          </Content>
        </Layout>
      </Modal>
    </>
  );
}

export default CreateWorkList;
