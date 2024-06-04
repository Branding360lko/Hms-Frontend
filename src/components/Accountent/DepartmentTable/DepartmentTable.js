import React, { useEffect, useState } from "react";
import ManageDepartment from "./ManageDepartment";
import FloorsDepartment from "./FloorsDepartment";
import ManageWard from "./ManageWard";
import ManageBeds from "./ManageBeds";

function DepartmentTable() {
  const [activeState, setActiveState] = useState(
    localStorage.getItem("activeState")
      ? localStorage.getItem("activeState")
      : "Manage Department"
  );

  useEffect(() => {
    localStorage.setItem("activeState", activeState);
  }, [activeState]);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-start gap-3">
        <h2
          className={
            activeState === "Manage Department"
              ? "border-b-[3px] border-[#3497F9] cursor-pointer"
              : "border-b-[3px] cursor-pointer"
          }
          onClick={() => setActiveState("Manage Department")}
        >
          Manage Department
        </h2>
        <h2
          className={
            activeState === "Floors Department"
              ? "border-b-[3px] border-[#3497F9] cursor-pointer"
              : "border-b-[3px] cursor-pointer"
          }
          onClick={() => setActiveState("Floors Department")}
        >
          Floors Department
        </h2>
        <h2
          className={
            activeState === "Manage Ward"
              ? "border-b-[3px] border-[#3497F9] cursor-pointer"
              : "border-b-[3px] cursor-pointer"
          }
          onClick={() => setActiveState("Manage Ward")}
        >
          Manage Ward
        </h2>
        <h2
          className={
            activeState === "Manage Beds"
              ? "border-b-[3px] border-[#3497F9] cursor-pointer"
              : "border-b-[3px] cursor-pointer"
          }
          onClick={() => setActiveState("Manage Beds")}
        >
          Manage Beds
        </h2>
      </div>
      <div>
        {activeState === "Manage Department" && <ManageDepartment />}
        {activeState === "Floors Department" && <FloorsDepartment />}
        {activeState === "Manage Ward" && <ManageWard />}
        {activeState === "Manage Beds" && <ManageBeds />}
      </div>
    </div>
  );
}

export default DepartmentTable;
