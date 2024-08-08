import React, { useContext, useEffect, useState } from "react";
import "./IPDPatientList.css";

import { lazy } from "react";
import SideNav from "../../../components/Nurse/SideNav";
import UpperNav from "../../../components/Nurse/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

import {
  useGetAllIPDPatientsQuery,
  useIpdPatientFinalBalanceCalGetAllMutation,
} from "../../../Store/Services/IPDPatientService";
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
import { useGetAllBedsQuery } from "../../../Store/Services/BedService";
import { getAllBeds } from "../../../Store/Slices/BedSlice";
import { useGetAllNursesQuery } from "../../../Store/Services/NurseService";
import { getAllNurses } from "../../../Store/Slices/NurseSlice";
import {
  useGetDropdownDoctorsQuery,
  useGetDropdownNursesQuery,
  useGetDropdownPatientsQuery,
} from "../../../Store/Services/DropDownServices";
import axios from "axios";

const IPDPatientTable = lazy(() =>
  import("../../../components/Nurse/IPDPatientTableAndForm/IPD_PatientTable")
);

export default function IPDPatientList() {
  const [pageLimit, setPageLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  // const pageContext = useContext(null);

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const responseGetAllIPDPatients = useGetAllIPDPatientsQuery({
    limit: pageLimit,
    page: pageCount,
    query: searchQuery,
  });
  const responseGetAllDoctors = useGetAllDoctorsQuery({
    limit: pageLimit,
    page: pageCount,
    query: searchQuery,
  });
  const responseGetAllDoctorProfessionalDetails = useGetDropdownDoctorsQuery();
  const responseGetAllPatients = useGetDropdownPatientsQuery();

  const responseGetAllNurses = useGetDropdownNursesQuery({ query: "" });

  console.log("responseGetAllNurses:", responseGetAllNurses);
  // useEffect(() => {
  //   do {
  //     responseGetAllNurses.refetch();
  //     console.log("Called responseGetAllNurses");
  //   } while (responseGetAllNurses.isSuccess === false);

  // }, [responseGetAllNurses]);

  console.log("responseGetAllIPDPatients:", responseGetAllIPDPatients);
  // console.log("responseGetAllDoctors:", responseGetAllDoctors);

  // Ipd Patients Final Balance Calculation Get all

  // const responseGetAllIpdPatientBalances =
  //   useIpdPatientFinalBalanceCalGetAllMutation();

  // BEDS
  const responseGetAllBeds = useGetAllBedsQuery();

  const { beds, createBeds, updateBeds, deleteBeds } = useSelector(
    (state) => state.BedState
  );
  // --------------------------------------------------------------------

  const { ipdPatients, createIpdPatient, updateIpdPatient, deleteIpdPatient } =
    useSelector((state) => state.IPDPatientState);
  const {
    doctors,
    doctorProfessionalDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useSelector((state) => state.DoctorState);

  const { nurses, createNurse, updateNurse, deleteNurse } = useSelector(
    (state) => state.NurseState
  );

  const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
    (state) => state.PatientState
  );

  const {
    updateIpdPatientDepositAmount,
    updateIpdPatientLabTestCharges,
    updateIpdPatientMedicalCharges,
  } = useSelector((state) => state.IPDPatientBalanceState);

  console.log("updateIpdPatientDepositAmount:", updateIpdPatientDepositAmount);
  // const baseUrl = process.env.React_App_Base_url;
  // axios
  //   .get(`${baseUrl}/DropdownData-Nurse`, {
  //     params: { query: "" },
  //   })
  //   .then((response) => console.log("response axios nurse", response))
  //   .catch((error) => console.log("axios error nurse", error));

  const apiRefetch = async () => {
    // IPD Patients
    const responseGetAllIPDPatientsRefetch =
      await responseGetAllIPDPatients.refetch();
    if (responseGetAllIPDPatientsRefetch.isSuccess) {
      const reverseArrayGetAllIPDPatients =
        responseGetAllIPDPatientsRefetch?.data?.ipdPatientData?.map(
          responseGetAllIPDPatientsRefetch?.data?.ipdPatientData?.pop,
          [...responseGetAllIPDPatientsRefetch?.data?.ipdPatientData]
        );
      const filteredArrayGetAllIPDPatients =
        reverseArrayGetAllIPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
    }
    // --------------------
    // Nurses
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
    // IPD Patients
    if (responseGetAllIPDPatients.isSuccess) {
      const reverseArrayGetAllIPDPatients =
        responseGetAllIPDPatients?.data?.ipdPatientData?.map(
          responseGetAllIPDPatients?.data?.ipdPatientData?.pop,
          [...responseGetAllIPDPatients?.data?.ipdPatientData]
        );
      // console.log(
      //   "responseGetAllIPDPatients in ApiRefetch:",
      //   responseGetAllIPDPatients
      // );

      // console.log(
      //   "reverseArrayGetAllIPDPatients:",
      //   reverseArrayGetAllIPDPatients
      // );

      const filteredArrayGetAllIPDPatients =
        reverseArrayGetAllIPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );

      // console.log(
      //   "filteredArrayGetAllIPDPatients:",
      //   filteredArrayGetAllIPDPatients
      // );

      dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
    }
    // --------------------
    // Nurses

    if (responseGetAllNurses.isSuccess) {
      const reverseArrayGetAllNurses = responseGetAllNurses?.data?.map(
        responseGetAllNurses?.data?.pop,
        [...responseGetAllNurses?.data]
      );
      console.log("responseGetAllNurses:", responseGetAllNurses);

      const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllNurses(filteredArrayGetAllNurses));
    }

    // Doctors
    if (responseGetAllDoctors.isSuccess) {
      const reverseArrayGetAllDoctors =
        responseGetAllDoctors?.data?.Doctors?.map(
          responseGetAllDoctors?.data?.Doctors?.pop,
          [...responseGetAllDoctors?.data?.Doctors]
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
        responseGetAllDoctorProfessionalDetails?.data?.Doctors?.map(
          responseGetAllDoctorProfessionalDetails?.data?.Doctors?.pop,
          [...responseGetAllDoctorProfessionalDetails?.data?.Doctors]
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
    createIpdPatient,
    updateIpdPatient,
    deleteIpdPatient,
    responseGetAllIPDPatients.isSuccess,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
    responseGetAllDoctorProfessionalDetails.isSuccess,
    createNurse,
    updateNurse,
    deleteNurse,
    responseGetAllNurses.isSuccess,
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
    createBeds,
    updateBeds,
    deleteBeds,
    updateIpdPatientDepositAmount,
    updateIpdPatientLabTestCharges,
    updateIpdPatientMedicalCharges,
  ]);
  return (
    <>
      {responseGetAllIPDPatients.isLoading &&
      responseGetAllDoctorProfessionalDetails.isLoading &&
      responseGetAllPatients.isLoading &&
      responseGetAllDoctors.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="superadmin-main-left w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.ipdPatientList}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <IPDPatientTable
                setPageLimit={setPageLimit}
                setPageCount={setPageCount}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
