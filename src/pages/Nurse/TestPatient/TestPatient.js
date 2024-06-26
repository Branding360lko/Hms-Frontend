import React, { useEffect } from "react";
import "./TestPatient.css";

import { lazy } from "react";
import SideNav from "../../../components/Nurse/SideNav";
import UpperNav from "../../../components/Nurse/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";

import { useGetAllOPDPatientQuery } from "../../../Store/Services/OPDPatientService";
import { getAllOPDPatients } from "../../../Store/Slices/OPDPatientSlice";
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

import { useGetAllTestOfPatientQuery } from "../../../Store/Services/TestPatient";
import { getAllTestOfPatient } from "../../../Store/Slices/TestPatientSlice";

const NursePanelTableAndForm = lazy(() =>
  import("../../../components/Nurse/TestPatientTable/TestPatientTable")
);

export default function TestPatient() {
  const dispatch = useDispatch();
  const responseGetAllOPDPatients = useGetAllOPDPatientQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();
  const responseGetAllDoctorProfessionalDetails =
    useGetAllDoctorProfessionalDetailsQuery();
  const responseGetAllPatients = useGetAllPatientsQuery();
  const responseGetAllTestPatient = useGetAllTestOfPatientQuery();
  console.log(responseGetAllTestPatient);
  const { OPDPatients, createOPDPatient, updateOPDPatient, deleteOPDPatient } =
    useSelector((state) => state.OPDPatientState);
  const {
    doctors,
    doctorProfessionalDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useSelector((state) => state.DoctorState);
  const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
    (state) => state.PatientState
  );
  const {
    testOfPatients,
    createTestOfPatients,
    updateTestOfPatients,
    deleteTestOfPatients,
  } = useSelector((state) => state.TestPatientState);

  // console.log(testOfPatients);

  const apiRefetch = async () => {
    // OPD Patients
    const responseGetAllOPDPatientsRefetch =
      await responseGetAllOPDPatients.refetch();
    if (responseGetAllOPDPatientsRefetch.isSuccess) {
      const reverseArrayGetAllOPDPatients =
        responseGetAllOPDPatientsRefetch?.data?.map(
          responseGetAllOPDPatientsRefetch?.data?.pop,
          [...responseGetAllOPDPatientsRefetch?.data]
        );
      const filteredArrayGetAllOPDPatients =
        reverseArrayGetAllOPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllOPDPatients(filteredArrayGetAllOPDPatients));
    }
    // ------------------
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
    // Doctors Professional Details
    const responseGetAllDoctorsProfessionalDetailsRefetch =
      await responseGetAllDoctorProfessionalDetails.refetch();
    if (responseGetAllDoctorsProfessionalDetailsRefetch.isSuccess) {
      const reverseArrayGetAllDoctorsProfessionalDetails =
        responseGetAllDoctorsProfessionalDetailsRefetch?.data?.map(
          responseGetAllDoctorsProfessionalDetailsRefetch?.data?.pop,
          [...responseGetAllDoctorsProfessionalDetailsRefetch?.data]
        );
      const filteredArrayGetAllDoctorsProfessionalDetails =
        reverseArrayGetAllDoctorsProfessionalDetails?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(
        getAllDoctorsProfessionalDetails(
          filteredArrayGetAllDoctorsProfessionalDetails
        )
      );
    }
    // ------------------
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
    // Test Patients
    const responseGetAllTestPatientsRefetch =
      await responseGetAllTestPatient.refetch();
    if (responseGetAllTestPatientsRefetch.isSuccess) {
      const reverseArrayGetAllTestPatients =
        responseGetAllTestPatientsRefetch?.data?.map(
          responseGetAllTestPatientsRefetch?.data?.pop,
          [...responseGetAllTestPatientsRefetch?.data]
        );
      const filteredArrayGetAllTestPatients =
        reverseArrayGetAllTestPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllTestOfPatient(filteredArrayGetAllTestPatients));
    }
  };
  useEffect(() => {
    apiRefetch();
    // OPD Patients
    if (responseGetAllOPDPatients.isSuccess) {
      const reverseArrayGetAllOPDPatients =
        responseGetAllOPDPatients?.data?.map(
          responseGetAllOPDPatients?.data?.pop,
          [...responseGetAllOPDPatients?.data]
        );
      const filteredArrayGetAllOPDPatients =
        reverseArrayGetAllOPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllOPDPatients(filteredArrayGetAllOPDPatients));
    }
    // --------------------
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
    // Doctors Professional Details
    if (responseGetAllDoctorProfessionalDetails.isSuccess) {
      const reverseArrayGetAllDoctorsProfessionalDetails =
        responseGetAllDoctorProfessionalDetails?.data?.map(
          responseGetAllDoctorProfessionalDetails?.data?.pop,
          [...responseGetAllDoctorProfessionalDetails?.data]
        );
      const filteredArrayGetAllDoctorsProfessionalDetails =
        reverseArrayGetAllDoctorsProfessionalDetails?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(
        getAllDoctorsProfessionalDetails(
          filteredArrayGetAllDoctorsProfessionalDetails
        )
      );
    }
    // --------------------
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
    // Test Patients
    if (responseGetAllTestPatient.isSuccess) {
      const reverseArrayGetAllTestPatient =
        responseGetAllTestPatient?.data?.map(
          responseGetAllTestPatient?.data?.pop,
          [...responseGetAllTestPatient?.data]
        );
      const filteredArrayGetAllTestPatient =
        reverseArrayGetAllTestPatient?.filter(
          (data) => data.isDeleted === false && data
        );

      dispatch(getAllTestOfPatient(filteredArrayGetAllTestPatient));
    }
  }, [
    createOPDPatient,
    updateOPDPatient,
    deleteOPDPatient,
    responseGetAllOPDPatients.isSuccess,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
    responseGetAllDoctorProfessionalDetails.isSuccess,
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
    createTestOfPatients,
    updateTestOfPatients,
    deleteTestOfPatients,
    responseGetAllTestPatient.isSuccess,
  ]);
  return (
    <>
      {responseGetAllOPDPatients.isLoading &&
      responseGetAllPatients.isLoading &&
      responseGetAllDoctorProfessionalDetails.isLoading &&
      responseGetAllDoctors.isLoading &&
      responseGetAllTestPatient.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="superadmin-main-left w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.testPatient}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <NursePanelTableAndForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
