import React, { useEffect } from "react";
import "./IPDDoctorVisitList.css";
import { lazy } from "react";
import SideNav from "../../../components/Receptionist/SideNav";
import UpperNav from "../../../components/Receptionist/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";

import {
  useGetAllDoctorsQuery,
  useGetAllDoctorProfessionalDetailsQuery,
} from "../../../Store/Services/DoctorService";
import {
  getAllDoctors,
  getAllDoctorsProfessionalDetails,
} from "../../../Store/Slices/DoctorSlice";

const IPDDoctorVisitTable = lazy(() =>
  import(
    "../../../components/Receptionist/IPDDoctorVisitTable/IPDDoctorVisitTable"
  )
);

export default function IPDDoctorVisitList() {
  const dispatch = useDispatch();
  const responseGetAllPatients = useGetAllPatientsQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();

  const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
    (state) => state.PatientState
  );
  const {
    doctors,
    doctorProfessionalDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useSelector((state) => state.DoctorState);

  const apiRefetch = async () => {
    // Patients
    const responseGetAllPatientsRefetch =
      await responseGetAllPatients.refetch();
    if (responseGetAllPatientsRefetch.isSuccess) {
      const reverseArrayGetAllPatients =
        responseGetAllPatientsRefetch?.data?.map(
          responseGetAllPatientsRefetch?.data?.pop,
          [...responseGetAllPatientsRefetch?.data]
        );
      const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllPatients(filteredArrayGetAllPatients));
    }
    //------------------
    // Doctors
    const responseGetAllDoctorsRefetch = await responseGetAllDoctors.refetch();
    if (responseGetAllDoctorsRefetch.isSuccess) {
      const reverseArrayGetAllDoctors = responseGetAllDoctorsRefetch?.data?.map(
        responseGetAllDoctorsRefetch?.data?.pop,
        [...responseGetAllDoctorsRefetch?.data]
      );
      const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    }
    // ------------------
  };
  useEffect(() => {
    apiRefetch();
    // Patients
    if (responseGetAllPatients.isSuccess) {
      const reverseArrayGetAllPatients = responseGetAllPatients?.data?.map(
        responseGetAllPatients?.data?.pop,
        [...responseGetAllPatients?.data]
      );
      const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
        (data) => data.isDeleted === false && data
      );

      dispatch(getAllPatients(filteredArrayGetAllPatients));
    }
    // -----------------------
    // Doctors
    if (responseGetAllDoctors.isSuccess) {
      const reverseArrayGetAllDoctors = responseGetAllDoctors?.data?.map(
        responseGetAllDoctors?.data?.pop,
        [...responseGetAllDoctors?.data]
      );
      const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    }
    // --------------------
  }, [
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
  ]);
  return (
    <>
      <div className='superadmin-main flex flex-row w-full h-screen'>
        <div className='w-[20%] shadow-lg'>
          <SideNav
            activePage={`${browserLinks.receptionist.category}/${browserLinks.receptionist.internalPages.doctorVisitListIPD}`}
          />
        </div>
        <div className='superadmin-main-right flex flex-col w-[80%]'>
          <UpperNav />
          <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
            <IPDDoctorVisitTable />
          </div>
        </div>
      </div>
    </>
  );
}
