import React from "react";
import SideNav from "../../../components/Receptionist/SideNav";
import UpperNav from "../../../components/Receptionist/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import DashboardTable from "../../../components/Receptionist/DashboardTable/DashboardTable";

function Dashboard() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.receptionist.category}/${browserLinks.receptionist.internalPages.dashboard}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <DashboardTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
