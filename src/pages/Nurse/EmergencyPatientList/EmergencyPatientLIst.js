import React, { useState } from "react";
import "./EmergencyPatientLIst.css";

import { lazy, Suspense, useEffect } from "react";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";
import { useGetAllDoctorsQuery } from "../../../Store/Services/DoctorService";

import { getAllDoctors } from "../../../Store/Slices/DoctorSlice";

import { useGetAllEmergencyPatientQuery } from "../../../Store/Services/EmergencyPatientService";
import { getAllEmergencyPatient } from "../../../Store/Slices/EmergencyPatientSlice";
import { useGetAllBedsQuery } from "../../../Store/Services/BedService";
import { getAllBeds } from "../../../Store/Slices/BedSlice";

const SideNav = lazy(() => import("../../../components/Nurse/SideNav"));
const UpperNav = lazy(() =>
  import("../../../components/Nurse/UpperNav/UpperNav")
);

const NurseEmergencyTable = lazy(() =>
  import(
    "../../../components/Nurse/EmergencyPatientTable/EmergencyPatientTable"
  )
);
// const NurseEmergencyEditForm = lazy(() =>
//   import(
//     "../../../components/Nurse/EditEmergencyPatientTableAndForm/EditEmergencyForm/EditEmergencyForm"
//   )
// );

export default function EmergencyPatientLIst() {
  const dispatch = useDispatch();
  const responseGetAllPatients = useGetAllPatientsQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();
  const responseGetAllEmergencyPatient = useGetAllEmergencyPatientQuery();
  const responseGetAllBeds = useGetAllBedsQuery();

  const { beds, createBeds, updateBeds, deleteBeds } = useSelector(
    (state) => state.BedState
  );

  const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
    (state) => state.PatientState
  );
  const {
    emergencyPatients,
    createEmergencyPatient,
    updateEmergencyPatient,
    deleteEmergencyPatient,
  } = useSelector((state) => state.EmergencyPatientState);

  // console.log(emergencyPatients);

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
    // Emergency Patient
    const responseGetAllEmergencyRefetch =
      await responseGetAllEmergencyPatient.refetch();
    if (responseGetAllEmergencyPatient.isSuccess) {
      const reverseArrayGetAllEmergencyPatient =
        responseGetAllEmergencyRefetch?.data?.map(
          responseGetAllEmergencyRefetch?.data?.pop,
          [...responseGetAllEmergencyRefetch?.data]
        );
      const filteredArrayGetAllEmergencyPatient =
        reverseArrayGetAllEmergencyPatient?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllEmergencyPatient(filteredArrayGetAllEmergencyPatient));
    }
    // ------------------
    // Beds
    const responseGetAllBedsRefetch = await responseGetAllBeds.refetch();
    if (responseGetAllBedsRefetch.isSuccess) {
      const reverseArrayGetAllBeds = responseGetAllBedsRefetch?.data?.map(
        responseGetAllBedsRefetch?.data?.pop,
        [...responseGetAllBedsRefetch?.data]
      );
      const filteredArrayGetAllBeds = reverseArrayGetAllBeds?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllBeds(filteredArrayGetAllBeds));
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
    // --------------
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
    // -----------------
    // EmergencyPatient
    if (responseGetAllEmergencyPatient.isSuccess) {
      const reverseArrayGetAllEmergencyPatient =
        responseGetAllEmergencyPatient?.data?.map(
          responseGetAllEmergencyPatient?.data?.pop,
          [...responseGetAllEmergencyPatient?.data]
        );
      const filteredArrayGetAllEmergencyPatient =
        reverseArrayGetAllEmergencyPatient?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllEmergencyPatient(filteredArrayGetAllEmergencyPatient));
    }
    // ---------------
    // Beds
    if (responseGetAllBeds.isSuccess) {
      const reverseArrayGetAllBeds = responseGetAllBeds?.data?.map(
        responseGetAllBeds?.data?.pop,
        [...responseGetAllBeds?.data]
      );
      const filteredArrayGetAllBeds = reverseArrayGetAllBeds?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllBeds(filteredArrayGetAllBeds));
    }
    // ---------------------
  }, [
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
    createEmergencyPatient,
    updateEmergencyPatient,
    deleteEmergencyPatient,
    responseGetAllEmergencyPatient.isSuccess,
    responseGetAllPatients.isSuccess,
    createBeds,
    updateBeds,
    deleteBeds,
  ]);
  return (
    <>
      {responseGetAllPatients.isLoading &&
      responseGetAllDoctors.isLoading &&
      responseGetAllEmergencyPatient.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='superadmin-main flex flex-row w-full h-screen'>
          <div className='superadmin-main-left w-[20%] shadow-lg'>
            <SideNav
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.emergencyPatientList}`}
            />
          </div>
          <div className='superadmin-main-right flex flex-col w-[80%]'>
            <UpperNav />
            <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
              <NurseEmergencyTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
