import React, { useEffect, useState } from "react";
import "./OPDPatientList.css";

import { lazy } from "react";
import SideNav from "../../../components/Nurse/SideNav";
import UpperNav from "../../../components/Nurse/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { useGetAllOPDPatientQuery } from "../../../Store/Services/OPDPatientService";
import {
  getAllOPDPatients,
  totalPagesChange,
} from "../../../Store/Slices/OPDPatientSlice";
// import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";

// import {
//   useGetAllDoctorsQuery,
//   useGetAllDoctorProfessionalDetailsQuery,
// } from "../../../Store/Services/DoctorService";
import {
  getAllDoctors,
  // getAllDoctorsProfessionalDetails,
} from "../../../Store/Slices/DoctorSlice";

const OPDPatientTable = lazy(() =>
  import("../../../components/Nurse/OPDPatientTableAndForm/OPD_PatientTable")
);


// const OPDPatientTable = lazy(() =>
//   import("../../../components/superadmin/OPD_PatientTable/OPD_PatientTable")
// );

export default function OPDPatientList() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);

  // const responseGetAllDoctors = useGetAllDoctorsQuery();
  // const responseGetAllDoctorProfessionalDetails =
  //   useGetAllDoctorProfessionalDetailsQuery();
  // const responseGetAllPatients = useGetAllPatientsQuery();
  const {
    OPDPatients,
    createOPDPatient,
    updateOPDPatient,
    deleteOPDPatient,
    page,
    limit,
    patientName,
    opdPatientId,
    patientMobileNumber,
    totalPages,
  } = useSelector((state) => state.OPDPatientState);

  const responseGetAllOPDPatients = useGetAllOPDPatientQuery({
    page: page,
    limit: limit,
    patientName: patientName,
    opdPatientId: opdPatientId,
    patientMobileNumber: patientMobileNumber,
  });
  const [isLoadingOnSearch, setIsLoadingOnSearch] = useState(false);
  // const {
  //   doctors,
  //   doctorProfessionalDetails,
  //   createDoctor,
  //   updateDoctor,
  //   deleteDoctor,
  // } = useSelector((state) => state.DoctorState);
  // const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
  //   (state) => state.PatientState
  // );

  const fetchPatientNames = async () => {
    return await axios
      .get(`${process.env.React_App_Base_url}DropdownData-Patient`, {})
      .then((res) => dispatch(getAllPatients(res.data)))
      .catch((err) => console.error(err));
  };

  const fetchDoctorNames = async () => {
    return await axios
      .get(`${process.env.React_App_Base_url}DropdownData-Doctor`, {})
      .then((res) => dispatch(getAllDoctors(res.data)))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchPatientNames();
    fetchDoctorNames();
  }, []);

  const apiRefetch = async () => {
    // OPD Patients
    const responseGetAllOPDPatientsRefetch =
      await responseGetAllOPDPatients.refetch({
        page: page,
        limit: limit,
        patientName: patientName,
        opdPatientId: opdPatientId,
        patientMobileNumber: patientMobileNumber,
      });
    if (responseGetAllOPDPatientsRefetch.isSuccess) {
      // const reverseArrayGetAllOPDPatients =
      //   responseGetAllOPDPatientsRefetch?.data?.map(
      //     responseGetAllOPDPatientsRefetch?.data?.pop,
      //     [...responseGetAllOPDPatientsRefetch?.data]
      //   );
      // const filteredArrayGetAllOPDPatients =
      //   reverseArrayGetAllOPDPatients?.filter(
      //     (data) => data.isDeleted === false && data
      //   );
      const filteredArrayGetAllOPDPatients =
        responseGetAllOPDPatientsRefetch?.data?.OPDPatientData?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllOPDPatients(filteredArrayGetAllOPDPatients));
      dispatch(
        totalPagesChange(responseGetAllOPDPatientsRefetch?.data?.totalPages)
      );
      setIsLoadingOnSearch(false);
      if (!patients || patients === 0) {

        fetchPatientNames();
      }
      if (!doctors || doctors === 0) {

        fetchDoctorNames();
      }
    }
    // ------------------
    // // Doctors
    // const responseGetAllDoctorsRefetch = await responseGetAllDoctors.refetch();
    // if (responseGetAllDoctorsRefetch.isSuccess) {
    //   const reverseArrayGetAllDoctors = responseGetAllDoctorsRefetch?.data?.map(
    //     responseGetAllDoctorsRefetch?.data?.pop,
    //     [...responseGetAllDoctorsRefetch?.data]
    //   );
    //   const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }
    // // ------------------
    // Doctors Professional Details
    // const responseGetAllDoctorsProfessionalDetailsRefetch =
    //   await responseGetAllDoctorProfessionalDetails.refetch();
    // if (responseGetAllDoctorsProfessionalDetailsRefetch.isSuccess) {
    //   const reverseArrayGetAllDoctorsProfessionalDetails =
    //     responseGetAllDoctorsProfessionalDetailsRefetch?.data?.map(
    //       responseGetAllDoctorsProfessionalDetailsRefetch?.data?.pop,
    //       [...responseGetAllDoctorsProfessionalDetailsRefetch?.data]
    //     );
    //   const filteredArrayGetAllDoctorsProfessionalDetails =
    //     reverseArrayGetAllDoctorsProfessionalDetails?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(
    //     getAllDoctorsProfessionalDetails(
    //       filteredArrayGetAllDoctorsProfessionalDetails
    //     )
    //   );
    // }
    // ------------------
    // Patients
    // const responseGetAllPatientsRefetch =
    //   await responseGetAllPatients.refetch();
    // if (responseGetAllPatientsRefetch.isSuccess) {
    //   const reverseArrayGetAllPatients =
    //     responseGetAllPatientsRefetch?.data?.map(
    //       responseGetAllPatientsRefetch?.data?.pop,
    //       [...responseGetAllPatientsRefetch?.data]
    //     );
    //   const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllPatients(filteredArrayGetAllPatients));
    // }
    //------------------
  };
  useEffect(() => {
    apiRefetch();
    // OPD Patients
    if (responseGetAllOPDPatients.isSuccess) {
      // const reverseArrayGetAllOPDPatients =
      //   responseGetAllOPDPatients?.data?.map(
      //     responseGetAllOPDPatients?.data?.pop,
      //     [...responseGetAllOPDPatients?.data]
      //   );
      // const filteredArrayGetAllOPDPatients =
      //   reverseArrayGetAllOPDPatients?.filter(
      //     (data) => data.isDeleted === false && data
      //   );
      const filteredArrayGetAllOPDPatients =
        responseGetAllOPDPatients?.data?.OPDPatientData?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllOPDPatients(filteredArrayGetAllOPDPatients));
      dispatch(totalPagesChange(responseGetAllOPDPatients?.data?.totalPages));
    }
    // --------------------
    // Doctors
    // if (responseGetAllDoctors.isSuccess) {
    //   const reverseArrayGetAllDoctors = responseGetAllDoctors?.data?.map(
    //     responseGetAllDoctors?.data?.pop,
    //     [...responseGetAllDoctors?.data]
    //   );
    //   const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }
    // --------------------
    // Doctors Professional Details
    // if (responseGetAllDoctorProfessionalDetails.isSuccess) {
    //   const reverseArrayGetAllDoctorsProfessionalDetails =
    //     responseGetAllDoctorProfessionalDetails?.data?.map(
    //       responseGetAllDoctorProfessionalDetails?.data?.pop,
    //       [...responseGetAllDoctorProfessionalDetails?.data]
    //     );
    //   const filteredArrayGetAllDoctorsProfessionalDetails =
    //     reverseArrayGetAllDoctorsProfessionalDetails?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(
    //     getAllDoctorsProfessionalDetails(
    //       filteredArrayGetAllDoctorsProfessionalDetails
    //     )
    //   );
    // }
    // --------------------
    // Patients
    // if (responseGetAllPatients.isSuccess) {
    //   const reverseArrayGetAllPatients = responseGetAllPatients?.data?.map(
    //     responseGetAllPatients?.data?.pop,
    //     [...responseGetAllPatients?.data]
    //   );
    //   const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
    //     (data) => data.isDeleted === false && data
    //   );

    //   dispatch(getAllPatients(filteredArrayGetAllPatients));
    // }
  }, [
    createOPDPatient,
    updateOPDPatient,
    deleteOPDPatient,
    // responseGetAllOPDPatients.isSuccess,
    // createDoctor,
    // updateDoctor,
    // deleteDoctor,
    // responseGetAllDoctors.isSuccess,
    // responseGetAllDoctorProfessionalDetails.isSuccess,
    // patientCreate,
    // patientUpdate,
    // patientDelete,
    // responseGetAllPatients.isSuccess,
    page,
    limit,
    patientName,
    opdPatientId,
    patientMobileNumber,
    totalPages,
  ]);
  return (
    <>
      {responseGetAllOPDPatients.isLoading ? (
        // &&
        // responseGetAllPatients.isLoading &&
        // responseGetAllDoctorProfessionalDetails.isLoading &&
        // responseGetAllDoctors.isLoading
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="superadmin-main-left w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.opdPatientList}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <OPDPatientTable
                isLoadingOnSearch={isLoadingOnSearch}
                setIsLoadingOnSearch={setIsLoadingOnSearch}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
