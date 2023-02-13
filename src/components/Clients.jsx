import React, { useState } from "react";
import { Table, Radio } from "antd";
import {
  useGetClientQuery,
  useGetCompanyQuery,
  useGetPersonQuery,
} from "../api";

function Clients() {
  const { data: company = [], isLoading: isLoadingCompany } =
    useGetCompanyQuery();
  const { data: person = [], isLoading: isLoadingPerson } = useGetPersonQuery();
  const [typeListClient, setTypeListClient] = useState();
  useGetClientQuery();
  const onChangeType = ({ target: { value } }) => {
    setTypeListClient(value);
  };
  return (
    <div>
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
      <Table
        columns={
          typeListClient === "company"
            ? [
                {
                  title: "Номер",
                  dataIndex: "id",
                },
                {
                  title: "Наименование",
                  dataIndex: "name",
                  key: "name",
                  render: (text) => <a>{text}</a>,
                },
                {
                  title: "ИНН",
                  dataIndex: "inn",
                  key: "inn",
                },
              ]
            : [
                {
                  title: "Номер",
                  dataIndex: "id",
                  key: "id",
                },
                {
                  title: "Имя",
                  dataIndex: "firstName",
                  key: "firstName",
                  render: (text) => <a>{text}</a>,
                },
                {
                  title: "Фамилия",
                  dataIndex: "lastName",
                  key: "lastName",
                },
                {
                  title: "Номер телефона",
                  dataIndex: "phoneNumber",
                  key: "phoneNumber",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                  key: "email",
                  render: (text) => <a>{text}</a>,
                },
              ]
        }
        dataSource={
          typeListClient === "company"
            ? company?.map((item) => {
                return item;
              })
            : person?.map((per) => {
                return per;
              })
        }></Table>
    </div>
  );
}

export default Clients;
