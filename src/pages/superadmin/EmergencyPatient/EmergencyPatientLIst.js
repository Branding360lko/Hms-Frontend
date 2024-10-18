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
import { useGetAllNursesQuery } from "../../../Store/Services/NurseService";
import { getAllNurses } from "../../../Store/Slices/NurseSlice";

import { useGetAllBedsQuery } from "../../../Store/Services/BedService";
import { getAllBeds } from "../../../Store/Slices/BedSlice";
import { useGetAllEmergencyPatientBalanceQuery } from "../../../Store/Services/EmergencyPatientService";
import {
  getAllDoctorsData,
  getAllNursesData,
  getAllPatientsData,
} from "../../../Store/Services/AxiosServices/DropDownDataServices";
import { getAllEmergencyPatients } from "../../../Store/Services/AxiosServices/EmergencyPatientServices";

import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";

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

//Branch Check

export default function EmergencyPatientLIst() {
  const [pageLimit, setPageLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const [nameSearch, setNameSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [uhidSearch, setUhidSearch] = useState("");

  // console.log(
  //   "pageCount and pageLimit in emergencylist :",
  //   pageCount,
  //   pageLimit
  // );

  // const pageContext = useContext(null);

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const [responseGetAllPatients, setResponseGetAllPatients] = useState(null);

  const [responseGetAllNurses, setResponseGetAllNurses] = useState(null);

  const [responseGetAllDoctors, setResponseGetAllDoctors] = useState(null);

  const [responseGetAllEmergencyPatient, setResponseGetAllEmergencyPatient] =
    useState(null);

  // let responseGetAllNurses;

  const emergencyPatientsRefetch = async () => {
    try {
      const responseGetAllEmergencyPatients = await getAllEmergencyPatients({
        limit: pageLimit,
        page: pageCount,
        emergencyPatientId: uhidSearch,
        patientName: nameSearch,
        patientMobileNumber: phoneSearch,
      });
      if (responseGetAllEmergencyPatients) {
        console.log(
          "responseGetAllEmergencyPatients refetcher:",
          responseGetAllEmergencyPatients
        );

        setResponseGetAllEmergencyPatient(
          responseGetAllEmergencyPatients?.EmergencyPatientData
        );
        setTotalItems(responseGetAllEmergencyPatients?.totalEmergencyPatient);
        setTotalPages(responseGetAllEmergencyPatients?.totalPages);
      }
    } catch (error) {
      console.log("Error in fetching emergency patients:", error);
    }
  };

  useEffect(() => {
    emergencyPatientsRefetch();
  }, [pageLimit, pageCount, nameSearch, uhidSearch, phoneSearch]);

  const fetcher = async () => {
    try {
      const responseGetEmergencyPatients = await getAllEmergencyPatients({
        limit: pageLimit,
        page: pageCount,
      });

      if (responseGetEmergencyPatients) {
        // console.log(
        //   "responseGetEmergencyPatients:",
        //   responseGetEmergencyPatients
        // );
        setTotalItems(responseGetEmergencyPatients?.totalEmergencyPatient);
        setTotalPages(responseGetEmergencyPatients?.totalPages);

        setResponseGetAllEmergencyPatient(
          responseGetEmergencyPatients?.EmergencyPatientData
        );
      }

      const responseNurses = await getAllNursesData();
      if (responseNurses) {
        setResponseGetAllNurses(responseNurses);
      }

      const responsePatients = await getAllPatientsData();
      if (responsePatients) {
        setResponseGetAllPatients(responsePatients);
      }

      const responseDoctors = await getAllDoctorsData();
      if (responseDoctors) {
        setResponseGetAllDoctors(responseDoctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const responseGetAllPatients = useGetAllPatientsQuery();
  // const responseGetAllDoctors = useGetAllDoctorsQuery();
  // const responseGetAllNurses = useGetAllNursesQuery();

  // const responseGetAllEmergencyPatient = useGetAllEmergencyPatientQuery({
  //   limit: pageLimit,
  //   page: pageCount,
  //   query: searchQuery,
  // });

  const responseGetAllBeds = useGetAllBedsQuery();

  // console.log(
  //   "responseGetAllEmergencyPatient:",
  //   responseGetAllEmergencyPatient
  // );

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

  const { nurses, createNurse, updateNurse, deleteNurse } = useSelector(
    (state) => state.NurseState
  );

  const { updateEmergencyPatientDepositAmount } = useSelector(
    (state) => state.EmergencyPatientBalanceState
  );

  const apiRefetch = async () => {
    fetcher();
    // Nurses

    // const responseGetAllNursesRefetch = await responseGetAllNurses.refetch();
    // if (responseGetAllNursesRefetch.isSuccess) {
    //   const reverseArrayGetAllNurses = responseGetAllNursesRefetch?.data?.map(
    //     responseGetAllNursesRefetch?.data?.pop,
    //     [...responseGetAllNursesRefetch?.data]
    //   );
    //   const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllNurses(filteredArrayGetAllNurses));
    // }

    if (responseGetAllNurses) {
      dispatch(getAllNurses(responseGetAllNurses));
    }

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

    if (responseGetAllPatients) {
      dispatch(getAllPatients(responseGetAllPatients));
    }

    //------------------
    // Doctors

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

    if (responseGetAllDoctors) {
      dispatch(getAllDoctors(responseGetAllDoctors));
    }

    // ------------------
    // Emergency Patient
    // const responseGetAllEmergencyRefetch =
    //   await responseGetAllEmergencyPatient.refetch();
    // if (responseGetAllEmergencyPatient.isSuccess) {
    //   const reverseArrayGetAllEmergencyPatient =
    //     responseGetAllEmergencyRefetch?.data?.map(
    //       responseGetAllEmergencyRefetch?.data?.pop,
    //       [...responseGetAllEmergencyRefetch?.data]
    //     );
    //   const filteredArrayGetAllEmergencyPatient =
    //     reverseArrayGetAllEmergencyPatient?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllEmergencyPatient(filteredArrayGetAllEmergencyPatient));
    // }

    if (responseGetAllEmergencyPatient) {
      dispatch(getAllEmergencyPatient(responseGetAllEmergencyPatient));
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

    // Nurses

    // if (responseGetAllNurses.isSuccess) {
    //   const reverseArrayGetAllNurses = responseGetAllNurses?.data?.map(
    //     responseGetAllNurses?.data?.pop,
    //     [...responseGetAllNurses?.data]
    //   );
    //   const filteredArrayGetAllNurses = reverseArrayGetAllNurses?.filter(
    //     (data) => data.isDeleted === false && data
    //   );
    //   dispatch(getAllNurses(filteredArrayGetAllNurses));
    // }

    dispatch(getAllNurses(responseGetAllNurses));

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

    dispatch(getAllPatients(responseGetAllPatients));

    // --------------
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

    dispatch(getAllDoctors(responseGetAllDoctors));

    // -----------------
    // EmergencyPatient
    // if (responseGetAllEmergencyPatient.isSuccess) {
    //   const reverseArrayGetAllEmergencyPatient =
    //     responseGetAllEmergencyPatient?.data?.map(
    //       responseGetAllEmergencyPatient?.data?.pop,
    //       [...responseGetAllEmergencyPatient?.data]
    //     );
    //   const filteredArrayGetAllEmergencyPatient =
    //     reverseArrayGetAllEmergencyPatient?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllEmergencyPatient(filteredArrayGetAllEmergencyPatient));
    // }

    dispatch(getAllEmergencyPatient(responseGetAllEmergencyPatient));

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
    // responseGetAllPatients,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    // responseGetAllDoctors,
    createNurse,
    updateNurse,
    deleteNurse,
    // responseGetAllNurses,
    createEmergencyPatient,
    updateEmergencyPatient,
    deleteEmergencyPatient,
    // responseGetAllEmergencyPatient,
    responseGetAllBeds.isSuccess,
    createBeds,
    updateBeds,
    deleteBeds,
    updateEmergencyPatientDepositAmount,
  ]);

  useEffect(() => {
    dispatch(getAllEmergencyPatient(responseGetAllEmergencyPatient));
    dispatch(getAllDoctors(responseGetAllDoctors));
    dispatch(getAllPatients(responseGetAllPatients));
    dispatch(getAllNurses(responseGetAllNurses));
  }, [
    responseGetAllPatients,
    responseGetAllDoctors,
    responseGetAllNurses,
    responseGetAllEmergencyPatient,
  ]);
  return (
    <>
      {responseGetAllBeds.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="superadmin-main-left w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.emergencyPatientList}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <NurseEmergencyTable
                setPageCount={setPageCount}
                setPageLimit={setPageLimit}
                pageLimit={pageLimit}
                pageCount={pageCount}
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
