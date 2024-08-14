import React, { useEffect } from "react";
import "./TestPatient.css";

import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { useGetAllTestOfPatientQuery } from "../../../Store/Services/TestPatient";
import { getAllTestOfPatient } from "../../../Store/Slices/TestPatientSlice";
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

const TestPatientTableAndForm = lazy(() =>
  import("../../../components/Nurse/TestPatientTable/TestPatientTable")
);

export default function TestPatient() {
  const dispatch = useDispatch();
  const responseGetAllTestOfPatients = useGetAllTestOfPatientQuery();

  // console.log(responseGetAllTestOfPatients);
  const {
    testOfPatients,
    createTestOfPatients,
    updateTestOfPatients,
    deleteTestOfPatients,
  } = useSelector((state) => state.TestPatientState);

  const fetchPatientNames = async () => {
    return await axios
      .get(`${process.env.React_App_Base_url}DropdownData-Patient`, {
        params: { query: "" },
      })
      .then((res) => dispatch(getAllPatients(res.data)))
      .catch((err) => console.error(err));
  };

  const fetchDoctorNames = async () => {
    return await axios
      .get(`${process.env.React_App_Base_url}DropdownData-Doctor`, {
        params: { query: "" },
      })
      .then((res) => dispatch(getAllDoctors(res.data)))
      .catch((err) => console.error(err));
  };

  const apiRefetch = async () => {
    // OPD Patients
    const responseGetAllTestOfPatientsRefetch =
      await responseGetAllTestOfPatients.refetch();
    if (responseGetAllTestOfPatientsRefetch.isSuccess) {
      // const reverseArrayGetAllOPDPatients =
      //   responseGetAllOPDPatientsRefetch?.data?.map(
      //     responseGetAllOPDPatientsRefetch?.data?.pop,
      //     [...responseGetAllOPDPatientsRefetch?.data]
      //   );
      const filteredArrayGetAllTestOfPatients =
        responseGetAllTestOfPatientsRefetch?.data?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllTestOfPatient(filteredArrayGetAllTestOfPatients));
    }
    // ------------------
  };
  useEffect(() => {
    apiRefetch();
    // OPD Patients
    if (responseGetAllTestOfPatients.isSuccess) {
      // const reverseArrayGetAllOPDPatients =
      //   responseGetAllOPDPatients?.data?.map(
      //     responseGetAllOPDPatients?.data?.pop,
      //     [...responseGetAllOPDPatients?.data]
      //   );
      const filteredArrayGetAllTestOfPatients =
        responseGetAllTestOfPatients?.data?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllTestOfPatient(filteredArrayGetAllTestOfPatients));
    }
    // --------------------
    fetchPatientNames();
    fetchDoctorNames();
  }, [
    createTestOfPatients,
    updateTestOfPatients,
    deleteTestOfPatients,
    responseGetAllTestOfPatients.isSuccess,
  ]);
  return (
    <>
      {responseGetAllTestOfPatients.isLoading ? (
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
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.testPatient}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <TestPatientTableAndForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
