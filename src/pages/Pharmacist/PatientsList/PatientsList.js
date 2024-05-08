import React from "react";
import SideNav from "../../../components/Pharmacist/SideNav";
import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/Pharmacist/UpperNav/UpperNav";
import PatientsTable from "../../../components/Pharmacist/PatientsTable/PatientsTable";
function PatientsList() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Pharmacist.category}/${browserLinks.Pharmacist.internalPages.Patientlist}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <PatientsTable />
        </div>
      </div>
    </div>
  );
}

export default PatientsList;
