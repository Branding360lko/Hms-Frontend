import React from "react";

import browserLinks from "../../../browserlinks";
import EmployeeAppoimenttable from "../../../components/HR/EmployeeAppoimenttable/EmployeeAppoimenttable";
import SideNav from "../../../components/Accountent/SideNav";
import UpperNav from "../../../components/Accountent/UpperNav/UpperNav";
import AdmissionCharges from "../../../components/Accountent/AdmissionCharges/AdmissionCharges";

function EmployeeAppoiment() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Accountant.category}/${browserLinks.Accountant.internalPages.AdmissionandCharges}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <AdmissionCharges />
        </div>
      </div>
    </div>
  );
}

export default EmployeeAppoiment;
