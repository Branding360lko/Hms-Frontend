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
import {
  getAllDoctorsData,
  getAllNursesData,
  getAllPatientsData,
} from "../../../Store/Services/AxiosServices/DropDownDataServices";

const IPDPatientTable = lazy(() =>
  import("../../../components/Nurse/IPDPatientTableAndForm/IPD_PatientTable")
);

export default function IPDPatientList() {
  const [pageLimit, setPageLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  // const pageContext = useContext(null);

  const [nameSearch, setNameSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [uhidSearch, setUhidSearch] = useState("");

  const dispatch = useDispatch();
  const responseGetAllIPDPatients = useGetAllIPDPatientsQuery({
    limit: pageLimit,
    page: pageCount,
    ipdPatientId: uhidSearch,
    patientName: nameSearch,
    patientMobileNumber: phoneSearch,
  });

  const ipdPatientsRefetch = async () => {
    const responseGetAllIPDPatientsRefetch =
      await responseGetAllIPDPatients.refetch();
    // console.log(
    //   "responseGetAllIPDPatientsRefetch:",
    //   responseGetAllIPDPatientsRefetch
    // );

    // console.log(
    //   "IPD Patient Refetch called with pageLimit, pageCount:",
    //   pageLimit,
    //   pageCount,
    //   phoneSearch,
    //   nameSearch,
    //   uhidSearch
    // );

    if (responseGetAllIPDPatientsRefetch) {
      dispatch(
        getAllIPDPatients(
          responseGetAllIPDPatientsRefetch?.data?.ipdPatientData
        )
      );
      setTotalItems(responseGetAllIPDPatientsRefetch?.data?.totalIPDPatient);
      setTotalPages(responseGetAllIPDPatientsRefetch?.data?.totalPages);
    }
  };

  // console.log();

  useEffect(() => {
    ipdPatientsRefetch();
  }, [pageLimit, pageCount, phoneSearch, nameSearch, uhidSearch]);

  // const responseGetAllDoctors = useGetAllDoctorsQuery({
  //   limit: pageLimit,
  //   page: pageCount,
  //   query: searchQuery,
  // });

  // const [nurseData, setNurseData] = useState();
  // const getAllNursesData = async () => {
  //   const response = await axios
  //     .get(`${process.env.React_App_Base_url}/DropdownData-Nurse`)
  //     .then((response) => {
  //       setNurseData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   return response;
  // };

  // useEffect(() => {
  //   getAllNursesData();
  // }, []);

  // console.log("nurseData:", nurseData);

  // const responseGetAllDoctorProfessionalDetails =
  //   useGetAllDoctorProfessionalDetailsQuery();
  // const responseGetAllPatients = useGetDropdownPatientsQuery();

  const [responseGetAllPatients, setResponseGetAllPatients] = useState(null);

  const [responseGetAllNurses, setResponseGetAllNurses] = useState(null);

  const [responseGetAllDoctors, setResponseGetAllDoctors] = useState(null);

  // let responseGetAllNurses;

  const fetcher = async () => {
    const responseNurses = await getAllNursesData();
    if (responseNurses) {
      setResponseGetAllNurses(responseNurses);
    }

    const responsePatients = await getAllPatientsData();
    if (responsePatients) {
      setResponseGetAllPatients(responsePatients);
    }

    const responseDoctors = await getAllDoctorsData();
    // console.log("responseDoctors:", responseDoctors);

    if (responseDoctors) {
      setResponseGetAllDoctors(responseDoctors);
    }
  };

  // console.log("responseGetAllDoctors:", responseGetAllDoctors);

  // fetcher();

  // useEffect(() => {
  //   console.log("responseGetAllNurses data:", responseGetAllNurses);
  // }, [responseGetAllNurses]);

  // useEffect(() => {
  //   do {
  //     responseGetAllNurses.refetch();
  //     console.log("Called responseGetAllNurses");
  //   } while (responseGetAllNurses.isSuccess === false);

  // }, [responseGetAllNurses]);

  // console.log("responseGetAllIPDPatients:", responseGetAllIPDPatients);
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

  // console.log("updateIpdPatientDepositAmount:", updateIpdPatientDepositAmount);
  // const baseUrl = process.env.React_App_Base_url;
  // axios
  //   .get(`${baseUrl}/DropdownData-Nurse`, {
  //     params: { query: "" },
  //   })
  //   .then((response) => console.log("response axios nurse", response))
  //   .catch((error) => console.log("axios error nurse", error));

  const dataDispatcher = () => {
    if (responseGetAllNurses) {
      dispatch(getAllNurses(responseGetAllNurses));
    }
    if (responseGetAllDoctors) {
      dispatch(getAllDoctors(responseGetAllDoctors));
    }
    if (responseGetAllPatients) {
      dispatch(getAllPatients(responseGetAllPatients));
    }
  };

  useEffect(() => {
    dataDispatcher();
  }, [responseGetAllDoctors, responseGetAllNurses, responseGetAllPatients]);

  const apiRefetch = async () => {
    fetcher();
    // IPD Patients
    // const responseGetAllIPDPatientsRefetch =
    //   await responseGetAllIPDPatients.refetch();
    // if (responseGetAllIPDPatientsRefetch.isSuccess) {
    //   const reverseArrayGetAllIPDPatients =
    //     responseGetAllIPDPatientsRefetch?.data?.ipdPatientData?.map(
    //       responseGetAllIPDPatientsRefetch?.data?.ipdPatientData?.pop,
    //       [...responseGetAllIPDPatientsRefetch?.data?.ipdPatientData]
    //     );
    //   const filteredArrayGetAllIPDPatients =
    //     reverseArrayGetAllIPDPatients?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
    //   setTotalItems(responseGetAllIPDPatientsRefetch?.data?.totalIPDPatient);
    //   setTotalPages(responseGetAllIPDPatientsRefetch?.data?.totalPages);
    // }

    const responseGetAllIPDPatientsRefetch =
      await responseGetAllIPDPatients.refetch();
    if (responseGetAllIPDPatientsRefetch.isSuccess) {
      const reverseArrayGetAllIPDPatients =
        responseGetAllIPDPatientsRefetch?.data?.ipdPatientData;
      const filteredArrayGetAllIPDPatients =
        reverseArrayGetAllIPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
      setTotalItems(responseGetAllIPDPatientsRefetch?.data?.totalIPDPatient);
      setTotalPages(responseGetAllIPDPatientsRefetch?.data?.totalPages);
    }

    // --------------------

    // Nurses
    // const responseGetAllNursesRefetch = responseGetAllNurses;
    // if (responseGetAllNursesRefetch) {
    //   const reverseArrayGetAllNurses = responseGetAllNursesRefetch?.map(
    //     responseGetAllNursesRefetch?.pop,
    //     [...responseGetAllNursesRefetch]
    //   );
    //   const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllNurses(filteredArrayGetAllNurses));
    // }

    // dispatch(getAllNurses(responseGetAllNurses));

    // Doctors
    // const responseGetAllDoctorsRefetch = responseGetAllDoctors;
    // if (responseGetAllDoctorsRefetch) {
    //   const reverseArrayGetAllDoctors = responseGetAllDoctorsRefetch?.map(
    //     responseGetAllDoctorsRefetch?.pop,
    //     [...responseGetAllDoctorsRefetch]
    //   );
    //   const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }

    // dispatch(getAllDoctors(responseGetAllDoctors));

    // ------------------
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
    // const responseGetAllPatientsRefetch = responseGetAllPatients;
    // if (responseGetAllPatientsRefetch) {
    //   const reverseArrayGetAllPatients = responseGetAllPatientsRefetch?.map(
    //     responseGetAllPatientsRefetch?.pop,
    //     [...responseGetAllPatientsRefetch]
    //   );
    //   const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllPatients(filteredArrayGetAllPatients));
    // }
    // dispatch(getAllPatients(responseGetAllPatients));

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
      // const reverseArrayGetAllIPDPatients =
      //   responseGetAllIPDPatients?.data?.ipdPatientData?.map(
      //     responseGetAllIPDPatients?.data?.ipdPatientData?.pop,
      //     [...responseGetAllIPDPatients?.data?.ipdPatientData]
      //   );
      const reverseArrayGetAllIPDPatients =
        responseGetAllIPDPatients?.data?.ipdPatientData;
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

      // dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
      setTotalItems(responseGetAllIPDPatients?.totalIPDPatient);
    }
    // --------------------
    // Nurses

    // if (responseGetAllNurses) {
    //   const reverseArrayGetAllNurses = responseGetAllNurses?.map(
    //     responseGetAllNurses?.pop,
    //     [...responseGetAllNurses]
    //   );
    //   console.log("responseGetAllNurses:", responseGetAllNurses);

    //   const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllNurses(filteredArrayGetAllNurses));
    // }

    // dispatch(getAllNurses(responseGetAllNurses));

    // Doctors
    // if (responseGetAllDoctors) {
    //   const reverseArrayGetAllDoctors = responseGetAllDoctors?.map(
    //     responseGetAllDoctors?.pop,
    //     [...responseGetAllDoctors]
    //   );
    //   const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }

    // dispatch(getAllDoctors(responseGetAllDoctors));

    // --------------------
    // Doctors Professional Details
    // if (responseGetAllDoctorProfessionalDetails.isSuccess) {
    //   const reverseArrayGetAllDoctorsProfessionalDetails =
    //     responseGetAllDoctorProfessionalDetails?.data?.Doctors?.map(
    //       responseGetAllDoctorProfessionalDetails?.data?.Doctors?.pop,
    //       [...responseGetAllDoctorProfessionalDetails?.data?.Doctors]
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
    // if (responseGetAllPatients) {
    //   console.log("responseGetAllPatients in if:", responseGetAllPatients);

    //   const reverseArrayGetAllPatients = responseGetAllPatients?.map(
    //     responseGetAllPatients?.pop,
    //     [...responseGetAllPatients]
    //   );
    //   const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
    //     (data) => data.isDeleted === false && data
    //   );

    //   console.log("filteredArrayGetAllPatients:", filteredArrayGetAllPatients);

    //   dispatch(getAllPatients(filteredArrayGetAllPatients));

    //   dispatch(getAllPatients(responseGetAllPatients));
    // }

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
    // responseGetAllDoctors.isSuccess,
    // responseGetAllDoctorProfessionalDetails.isSuccess,
    createNurse,
    updateNurse,
    deleteNurse,
    // responseGetAllNurses,
    patientCreate,
    patientUpdate,
    patientDelete,
    // responseGetAllPatients,
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
      // responseGetAllDoctorProfessionalDetails.isLoading &&
      responseGetAllPatients &&
      responseGetAllDoctors ? (
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
                pageCount={pageCount}
                pageLimit={pageLimit}
                setPageLimit={setPageLimit}
                setPageCount={setPageCount}
                setNameSearch={setNameSearch}
                setPhoneSearch={setPhoneSearch}
                setUhidSearch={setUhidSearch}
                totalItems={totalItems}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
