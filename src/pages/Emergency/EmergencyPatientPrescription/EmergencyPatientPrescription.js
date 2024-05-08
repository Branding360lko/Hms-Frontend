import React from "react";
import "./EmergencyPatientPrescription.css";

import { lazy, Suspense, useEffect } from "react";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const SideNav = lazy(() => import("../../../components/Emergency/SideNav"));
const UpperNav = lazy(() =>
  import("../../../components/Emergency/UpperNav/UpperNav")
);

const EmergencyPanelPrescriptionTable = lazy(() =>
  import(
    "../../../components/Emergency/EmergencyPatientPrescription/EmergencyPatientPrecriptionTable"
  )
);

export default function EmergencyPatientPrescription() {
  return (
    <>
      <div className='superadmin-main flex flex-row w-full h-screen'>
        <div className='superadmin-main-left w-[20%] shadow-lg'>
          <SideNav
            activePage={`${browserLinks.emergency.category}/${browserLinks.emergency.internalPages.addEmergencyPatientPrescription}`}
          />
        </div>
        <div className='superadmin-main-right flex flex-col w-[80%]'>
          <UpperNav />
          <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
            <EmergencyPanelPrescriptionTable />
          </div>
        </div>
      </div>
    </>
  );
}
