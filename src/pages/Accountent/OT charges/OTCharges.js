import React from "react";
import SideNav from "../../../components/Accountent/SideNav";
import browserLinks from "../../../browserlinks";
import OTChargesTable from "../../../components/Accountent/OTChargesTable/OTChargesTable";
import UpperNav from "../../../components/Accountent/UpperNav/UpperNav";

function OTCharges() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Accountant.category}/${browserLinks.Accountant.internalPages.OTCharges}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <OTChargesTable />
        </div>
      </div>
    </div>
  );
}

export default OTCharges;
