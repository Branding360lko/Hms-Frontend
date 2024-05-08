import React from "react";
import SideNav from "../../../components/Accountent/SideNav";
import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/Accountent/UpperNav/UpperNav";
import PhysiotheraphyOPDTable from "../../../components/Accountent/PhysiotheraphyOPDTable/PhysiotheraphyOPDTable";

function PhysiotheraphyOPD() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Accountant.category}/${browserLinks.Accountant.internalPages.PhysiotheraphyOPD}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <PhysiotheraphyOPDTable />
        </div>
      </div>
    </div>
  );
}

export default PhysiotheraphyOPD;
