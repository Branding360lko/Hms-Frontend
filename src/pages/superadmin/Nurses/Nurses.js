import React, { useEffect } from "react";
import "./Nurses.css";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

import { useGetAllIPDPatientsQuery } from "../../../Store/Services/IPDPatientService";
import { getAllIPDPatients } from "../../../Store/Slices/IPDPatientSlice";
import {
  useGetAllDoctorsQuery,
  useGetAllDoctorProfessionalDetailsQuery,
} from "../../../Store/Services/DoctorService";
import {
  getAllDoctors,
  getAllDoctorsProfessionalDetails,
} from "../../../Store/Slices/DoctorSlice";
import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";
import NursesTable from "../../../components/superadmin/NursesTable/NursesTable";

import { useGetAllNursesQuery } from "../../../Store/Services/NurseService";
import { getAllNurses } from "../../../Store/Slices/NurseSlice";

export default function Nurses() {
  const dispatch = useDispatch();
  const responseGetAllNurses = useGetAllNursesQuery();

  const { nurses, createNurse, updateNurse, deleteNurse } = useSelector(
    (state) => state.NurseState
  );

  console.log(nurses);

  const apiRefetch = async () => {
    const responseGetAllNursesRefetch = await responseGetAllNurses.refetch();
    if (responseGetAllNursesRefetch.isSuccess) {
      const reverseArrayGetAllNurses = responseGetAllNursesRefetch?.data?.map(
        responseGetAllNursesRefetch?.data?.pop,
        [...responseGetAllNursesRefetch?.data]
      );
      const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllNurses(filteredArrayGetAllNurses));
    }
  };

  useEffect(() => {
    apiRefetch();

    if (responseGetAllNurses.isSuccess) {
      const reverseArrayGetAllNurses = responseGetAllNurses?.data?.map(
        responseGetAllNurses?.data?.pop,
        [...responseGetAllNurses?.data]
      );
      const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllNurses(filteredArrayGetAllNurses));
    }
    // --------------------
  }, [responseGetAllNurses.isSuccess, createNurse, updateNurse, deleteNurse]);

  return (
    <>
      {responseGetAllNurses.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='superadmin-main flex flex-row w-full h-screen'>
          <div className='w-[20%] shadow-lg'>
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.nurses}`}
            />
          </div>
          <div className='superadmin-main-right flex flex-col w-[80%]'>
            <UpperNav />
            <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
              <NursesTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
