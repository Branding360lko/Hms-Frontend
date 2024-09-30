import React from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import AdmissionChargesTable from "../../../components/superadmin/AdmissionChargesTable/AdmissionChargesTable";

function AdmissionCharges() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.admissionCharges}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <AdmissionChargesTable />
        </div>
      </div>
    </div>
  );
}

export default AdmissionCharges;
