import React from "react";
import SideNav from "../../../components/Accountent/SideNav";
import UpperNav from "../../../components/Accountent/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import OPDConsultationChargesTable from "../../../components/Accountent/OPDConsultationChargesTable/OPDConsultationChargesTable";

function OPDConsultationCharges() {
  return (
    <div className='superadmin-main flex flex-row w-full h-screen'>
      <div className='superadmin-main-left w-[20%] shadow-lg'>
        <SideNav
          activePage={`${browserLinks.Accountant.category}/${browserLinks.Accountant.internalPages.OPDConsultationCharges}`}
        />
      </div>
      <div className='superadmin-main-right flex flex-col w-[80%]'>
        <UpperNav />
        <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
          <OPDConsultationChargesTable />
        </div>
      </div>
    </div>
  );
}

export default OPDConsultationCharges;
