import React, { useEffect } from "react";
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

import { useGetAllWardsQuery } from "../../../Store/Services/WardService";
import { getAllWards } from "../../../Store/Slices/WardSlice";

const AddIPDPrescriptionForm = lazy(() =>
  import(
    "../../../components/Receptionist/AddIPDPrescriptionForm/AddIPDPrescriptionForm"
  )
);

export default function IPDPrescriptionAdd() {
  const dispatch = useDispatch();
  const responseGetAllPatients = useGetAllPatientsQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();
  const responseGetAllWards = useGetAllWardsQuery();
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

  const { wards, createWards, updateWards, deleteWards } = useSelector(
    (state) => state.WardState
  );

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
    // Wards
    const responseGetAllWardsRefetch = await responseGetAllWards.refetch();
    if (responseGetAllWardsRefetch.isSuccess) {
      const reverseArrayGetAllWards = responseGetAllWardsRefetch?.data?.map(
        responseGetAllWardsRefetch?.data?.pop,
        [...responseGetAllWardsRefetch?.data]
      );
      const filteredArrayGetAllWards = reverseArrayGetAllWards?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllWards(filteredArrayGetAllWards));
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
    // Wards
    if (responseGetAllWards.isSuccess) {
      const reverseArrayGetAllWards = responseGetAllWards?.data?.map(
        responseGetAllWards?.data?.pop,
        [...responseGetAllWards?.data]
      );
      const filteredArrayGetAllWards = reverseArrayGetAllWards?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllWards(filteredArrayGetAllWards));
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
    createWards,
    updateWards,
    deleteWards,
    responseGetAllWards.isSuccess,
  ]);
  return (
    <>
      <div className='superadmin-main flex flex-row w-full h-screen'>
        <div className='w-[20%] shadow-lg'>
          <SideNav
            activePage={`${browserLinks.receptionist.category}/${browserLinks.receptionist.internalPages.addIPDPatientPrescription}`}
          />
        </div>
        <div className='superadmin-main-right flex flex-col w-[80%]'>
          <UpperNav />
          <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
            <AddIPDPrescriptionForm />
          </div>
        </div>
      </div>
    </>
  );
}
