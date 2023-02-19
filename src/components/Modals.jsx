import React from "react";
import { useSelector } from "react-redux";
import CreareOrder from "./modals/CreareOrder";
import CreateClient from "./modals/CreateClient";
import CreateWorkList from "./modals/CreateWorkList";

function Modals() {
  const key = useSelector((state) => state.modals);
  return (
    <>
      {key.keyModal === 1 && <CreareOrder open={true} />}
      {key.keyModal === 2 && <CreateWorkList open={true} />}
      {key.keyModal === 3 && <CreateClient open={true} />}
    </>
  );
}

export default Modals;
