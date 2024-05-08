import React from "react";
import SideNav from "../../../components/Accountent/SideNav";
import UpperNav from "../../../components/Accountent/UpperNav/UpperNav";
import BedsidePhysiotherapyTable from "../../../components/Accountent/BedsidePhysiotherapyTable/BedsidePhysiotherapyTable";
import browserLinks from "../../../browserlinks";

function BedsidePhysiotherapy() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Accountant.category}/${browserLinks.Accountant.internalPages.BedsidePhysiotherapyIPD}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <BedsidePhysiotherapyTable />
        </div>
      </div>
    </div>
  );
}

export default BedsidePhysiotherapy;
