import React from "react";
import { useSelector } from "react-redux";
import CreareOrder from "./modals/CreareOrder";
import CreateWorkList from "./modals/CreateWorkList";

function Modals() {
  const key = useSelector((state) => state.modals);
  return (
    <>
      {key.keyModal === 1 && <CreareOrder open={true} />}
      {key.keyModal === 2 && <CreateWorkList open={true} />}
    </>
  );
}

export default Modals;
