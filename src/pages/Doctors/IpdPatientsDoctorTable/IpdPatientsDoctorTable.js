import React from "react";
import SideNav from "../../../components/DoctorsTable/SideNav";

import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/DoctorsTable/UpperNav/UpperNav";

import DoctorDashboard from "../../../components/DoctorsTable/DoctorDashboard/DoctorDashboard";
import DoctorIpdTable from "../../../components/DoctorsTable/DoctorIpdTable/DoctorIpdTable";

function IpdPatientsDoctorTable() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Doctor.category}/${browserLinks.Doctor.internalPages.IpdPatients}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <DoctorIpdTable />
        </div>
      </div>
    </div>
  );
}

export default IpdPatientsDoctorTable;
