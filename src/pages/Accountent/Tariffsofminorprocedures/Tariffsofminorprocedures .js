import React from "react";
import SideNav from "../../../components/Accountent/SideNav";
import browserLinks from "../../../browserlinks";
import UpperNav from "../../../components/Accountent/UpperNav/UpperNav";
import TariffsofminorproceduresTable from "../../../components/Accountent/TariffsofminorproceduresTable/TariffsofminorproceduresTable";

function Tariffsofminorprocedures() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.Accountant.category}/${browserLinks.Accountant.internalPages.TariffsofMinorProcedures}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <TariffsofminorproceduresTable />
        </div>
      </div>
    </div>
  );
}

export default Tariffsofminorprocedures;
