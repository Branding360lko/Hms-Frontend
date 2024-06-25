import React from "react";
import SideNav from "../../../components/DoctorsTable/SideNav";
import UpperNav from "../../../components/DoctorsTable/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";

import DoctorEmergencyDischargeTable from "../../../components/DoctorsTable/DoctorEmergencyDischargeTable/DoctorEmergencyDischargeTable";
function EmergencyPatientsDischarge() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Doctor.category}/${browserLinks.Doctor.internalPages.EmergencyDischargePatients}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <DoctorEmergencyDischargeTable />
        </div>
      </div>
    </div>
  );
}

export default EmergencyPatientsDischarge;
