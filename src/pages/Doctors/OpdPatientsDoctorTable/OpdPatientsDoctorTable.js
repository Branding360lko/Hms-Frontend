import React from "react";
import SideNav from "../../../components/DoctorsTable/SideNav";

import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/DoctorsTable/UpperNav/UpperNav";

import DoctorDashboard from "../../../components/DoctorsTable/DoctorDashboard/DoctorDashboard";
import DoctorTable from "../../../components/DoctorsTable/DoctorsOpdTable/DoctorTable";

function OpdPatientsDoctorTable() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Doctor.category}/${browserLinks.Doctor.internalPages.OpdPatients}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <DoctorTable />
        </div>
      </div>
    </div>
  );
}

export default OpdPatientsDoctorTable;
