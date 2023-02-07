import React from "react";
import { useSelector } from "react-redux";
import CreareOrder from "./modals/CreareOrder";

function Modals() {
  const { keyModal } = useSelector((state) => state.modals);
  return <>{keyModal === 1 && <CreareOrder open={true} />}</>;
}

export default Modals;
