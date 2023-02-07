import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetClientQuery } from "../api";
import { setClients } from "../features/clientsSlice";

function Clients() {
  const { data: clients = [], isLoading } = useGetClientQuery();

  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>{client.company[0]?.inn}</div>
      ))}
    </div>
  );
}

export default Clients;
