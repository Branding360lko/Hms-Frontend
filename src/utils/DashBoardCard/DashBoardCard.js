import React from "react";
import { RiMedicineBottleFill } from "react-icons/ri";

function DashBoardCard({ bg, title, appointmentNumber }) {
  return (
    <div
      style={{ backgroundColor: `${bg}` }}
      className="superadmin-main-right_dashboard_firstSection_card flex flex-col items-center h-[12rem]  rounded-[15px] py-[2rem] px-[1rem]  gap-[10px] w-full text-[#374858]"
    >
      <RiMedicineBottleFill className="text-[35px]" />
      <div className="flex flex-col">
        <p>{appointmentNumber ? appointmentNumber : "100"}</p>
        <p className="text-[16px] font-semibold">
          {title ? title : "appointment"}
        </p>
      </div>
    </div>
  );
}

export default DashBoardCard;
