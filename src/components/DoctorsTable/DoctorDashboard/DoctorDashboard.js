import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import DashBoardCard from "../../../utils/DashBoardCard/DashBoardCard";
import { getAllOpdPatientsData, getDoctorDashboardData } from "../DoctorApi";
import { useDispatch, useSelector } from "react-redux";
import { getMedicineDataHandle } from "../../../Store/Slices/Medicine";
import { getTestDataHandle } from "../../../Store/Slices/Test";

function DoctorDashboard() {
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [dashboardData, setDashboardData] = useState();
  const dispatch = useDispatch();
  const getDoctorDashboardDataHandle = async (Id) => {
    const result = await getDoctorDashboardData(Id);
    console.log(result, "result");
    setDashboardData(result && result?.data);
  };
  useEffect(() => {
    dispatch(getMedicineDataHandle());
    dispatch(getTestDataHandle());
    getDoctorDashboardDataHandle(adminLoggedInData?.adminUniqueId);
  }, []);
  return (
    <div className="superadmin-main-right_dashboard flex flex-col w-full p-[1rem] overflow-y-scroll gap-[2rem]">
      <div className="superadmin-main-right_dashboard_firstSection w-full flex flex-col gap-[1rem] pb-[2rem] border-b-[1px] ">
        <h1 className="text-start">DashBoard Overview</h1>
        <div className="superadmin-main-right_dashboard_firstSection_cards w-full grid grid-cols-5 gap-[1rem] items-center justify-center">
          <DashBoardCard
            bg={"#FFF59878"}
            title={"Today's Appointment"}
            appointmentNumber={
              dashboardData?.ipdPatientsDetails +
              dashboardData?.opdPatientsDetails +
              dashboardData?.emergencyPatientsDetails
            }
          />
          <DashBoardCard
            bg={"#CCA4FF6B"}
            title={"Today IPD"}
            appointmentNumber={dashboardData?.ipdPatientsDetails}
          />
          <DashBoardCard
            bg={"#A4FFBD66"}
            title={"Today OPD"}
            appointmentNumber={dashboardData?.opdPatientsDetails}
          />
          <DashBoardCard
            bg={"#A4D2FF66"}
            title={"Today Emergency"}
            appointmentNumber={dashboardData?.emergencyPatientsDetails}
          />
          {/* <DashBoardCard
            bg={"#FFF59878"}
            title={"Today Total Patients Checked "}
            appointmentNumber="60"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
