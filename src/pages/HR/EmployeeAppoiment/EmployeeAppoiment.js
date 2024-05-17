import React from "react";
import SideNav from "../../../components/HR/SideNav";
import UpperNav from "../../../components/HR/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import EmployeeAppoimenttable from "../../../components/HR/EmployeeAppoimenttable/EmployeeAppoimenttable";

function EmployeeAppoiment() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.hr.category}/${browserLinks.hr.internalPages.employeeAppointments}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <EmployeeAppoimenttable />
        </div>
      </div>
    </div>
  );
}

export default EmployeeAppoiment;
