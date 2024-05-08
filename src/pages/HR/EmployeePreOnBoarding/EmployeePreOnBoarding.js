import React from "react";
import browserLinks from "../../../browserlinks";
import EmployeePreOnBoardingTable from "../../../components/HR/EmployeePreOnBoardingTable/EmployeePreOnBoardingTable";
import SideNav from "../../../components/HR/SideNav";
import UpperNav from "../../../components/HR/UpperNav/UpperNav";

function EmployeePreOnBoarding() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.hr.category}/${browserLinks.hr.internalPages.preOnboardingCandidate}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <EmployeePreOnBoardingTable />
        </div>
      </div>
    </div>
  );
}

export default EmployeePreOnBoarding;
