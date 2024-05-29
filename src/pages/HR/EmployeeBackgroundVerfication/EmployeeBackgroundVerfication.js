import React from "react";
import UpperNav from "../../../components/HR/UpperNav/UpperNav";
import SideNav from "../../../components/HR/SideNav";
import browserLinks from "../../../browserlinks";
import EmployeeBackgroundVerificationForm from "../../../components/HR/EmployeeBackgroundVerificationForm/EmployeeBackgroundVerificationForm";

function EmployeeBackgroundVerfication() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.hr.category}/${browserLinks.hr.internalPages.employeeBackgroundVerification}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <EmployeeBackgroundVerificationForm />
        </div>
      </div>
    </div>
  );
}

export default EmployeeBackgroundVerfication;
