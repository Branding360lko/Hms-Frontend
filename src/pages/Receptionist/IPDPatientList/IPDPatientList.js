import React, { useEffect } from "react";
import { lazy } from "react";
import SideNav from "../../../components/Receptionist/SideNav";
import UpperNav from "../../../components/Receptionist/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const IPDPatientListTable = lazy(() =>
  import(
    "../../../components/Receptionist/IPDPatientListTable/IPDPatientListTable"
  )
);

export default function IPDPatientList() {
  return (
    <>
      <div className='superadmin-main flex flex-row w-full h-screen'>
        <div className='w-[20%] shadow-lg'>
          <SideNav
            activePage={`${browserLinks.receptionist.category}/${browserLinks.receptionist.internalPages.ipdPatientList}`}
          />
        </div>
        <div className='superadmin-main-right flex flex-col w-[80%]'>
          <UpperNav />
          <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
            <IPDPatientListTable />
          </div>
        </div>
      </div>
    </>
  );
}
