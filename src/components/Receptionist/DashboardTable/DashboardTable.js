import React, { Suspense, useEffect, useState } from "react";
import DashBoardCard from "../../../utils/DashBoardCard/DashBoardCard";
import { useSelector } from "react-redux";
import { getNurseDashboardData } from "../../DoctorsTable/DoctorApi";

function DashboardTable() {
  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [dashboardData, setDashboardData] = useState();
  const getNurseDashboardDataHandle = async (Id) => {
    const result = await getNurseDashboardData(Id);
    console.log(result, "result");
    setDashboardData(result && result?.data);
  };
  useEffect(() => {
    getNurseDashboardDataHandle(adminLoggedInData?.adminUniqueId);
  }, []);
  return (
    <Suspense fallback={<>...</>}>
      <div className="superadmin-main-right_dashboard flex flex-col w-full p-[1rem] overflow-y-scroll gap-[2rem]">
        <div className="superadmin-main-right_dashboard_firstSection w-full flex flex-col gap-[1rem] pb-[2rem] border-b-[1px] ">
          <h1 className="text-start">DashBoard Overview</h1>
          <div className="superadmin-main-right_dashboard_firstSection_cards w-full grid grid-cols-5 gap-[1rem] items-center justify-center">
            <DashBoardCard
              bg={"#FFF59878"}
              title={"Today's Appointment"}
              appointmentNumber={
                dashboardData?.ipdPatientsDischargeDetails +
                dashboardData?.ipdPatientsDetails +
                dashboardData?.emergencyPatientsDischargeDetails +
                dashboardData?.emergencyPatientsDetails
              }
            />
            <DashBoardCard
              bg={"#CCA4FF6B"}
              title={"Today IPD"}
              appointmentNumber={dashboardData?.ipdPatientsDetails}
            />

            <DashBoardCard
              bg={"#A4D2FF66"}
              title={"Today Emergency"}
              appointmentNumber={dashboardData?.emergencyPatientsDetails}
            />
            <DashBoardCard
              bg={"#FFF59878"}
              title={"Today Ipd Discharge Patients"}
              appointmentNumber={dashboardData?.ipdPatientsDischargeDetails}
            />
            <DashBoardCard
              bg={"#A4FFBD66"}
              title={"Today Emergency Discharge Patients"}
              appointmentNumber={
                dashboardData?.emergencyPatientsDischargeDetails
              }
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default DashboardTable;
