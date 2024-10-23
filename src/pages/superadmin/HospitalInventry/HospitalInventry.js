import React from "react";
import SideNav from "../../../components/superadmin/SideNav";
import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import HospitalInventryTable from "../../../components/superadmin/HospitalInventryTable/HospitalInventryTable";

function HospitalInventry() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.hospitalInventry}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <HospitalInventryTable/>
        </div>
      </div>
    </div>
  );
}

export default HospitalInventry;
