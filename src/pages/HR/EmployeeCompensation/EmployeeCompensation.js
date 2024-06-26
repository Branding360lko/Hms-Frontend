import React from "react";
import SideNav from "../../../components/HR/SideNav";
import UpperNav from "../../../components/HR/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import EmployeeCompensationTable from "../../../components/HR/EmployeeCompensationTable/EmployeeCompensationTable";

function EmployeeCompensation() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.hr.category}/${browserLinks.hr.internalPages.employeeCompensation}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <EmployeeCompensationTable />
        </div>
      </div>
    </div>
  );
}

export default EmployeeCompensation;
