import React from "react";
import SideNav from "../../../components/DoctorsTable/SideNav";

import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/DoctorsTable/UpperNav/UpperNav";
import DoctorEmeregencyTable from "../../../components/DoctorsTable/DoctorEmeregencyTable/DoctorEmeregencyTable";

function EmergencyPatientsDoctorTable() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Doctor.category}/${browserLinks.Doctor.internalPages.EmergencyPatients}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <DoctorEmeregencyTable />
        </div>
      </div>
    </div>
  );
}

export default EmergencyPatientsDoctorTable;
