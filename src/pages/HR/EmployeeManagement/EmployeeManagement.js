import React, { useEffect } from "react";
import "./EmployeeManagement.css";
import { lazy, Suspense } from "react";

import browserLinks from "../../../browserlinks";
import EmployeeManagementTable from "../../../components/HR/EmployeeManagementTable/EmployeeManagementTable";
import EmployeeSearchForm from "../../../components/HR/EmployeeSearchForm/EmployeeSearchForm";
import { getAllEmployeeData } from "../../../components/HR/HrApiCollection";
import { useDispatch } from "react-redux";
import { getEmployeeDataHandle } from "../../../Store/Slices/HrSlice";

const SideNav = lazy(() => import("../../../components/HR/SideNav"));
const UpperNav = lazy(() => import("../../../components/HR/UpperNav/UpperNav"));

export default function Dashboard() {
  return (
    <div className="superadmin-main flex flex-row w-full h-screen">
      <div className="superadmin-main-left w-[20%] shadow-lg">
        <SideNav
          activePage={`${browserLinks.hr.category}/${browserLinks.hr.internalPages.employeeManagement}`}
        />
      </div>
      <div className="superadmin-main-right flex flex-col w-[80%]">
        <UpperNav />
        <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
          <EmployeeSearchForm />
          <EmployeeManagementTable />
        </div>
      </div>
    </div>
  );
}
