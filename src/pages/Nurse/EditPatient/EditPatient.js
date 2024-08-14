import React, { useState } from "react";
import "./EditPatient.css";

import { lazy, Suspense, useEffect } from "react";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import {
  getAllPatients,
  totalPagesChange,
} from "../../../Store/Slices/PatientSlice";

const SideNav = lazy(() => import("../../../components/Nurse/SideNav"));
const UpperNav = lazy(() =>
  import("../../../components/Nurse/UpperNav/UpperNav")
);

const NurseEditTable = lazy(() =>
  import(
    "../../../components/Nurse/EditPatientTableAndForm/EditPatientTable/EditPatientTable"
  )
);
const NurseEditForm = lazy(() =>
  import(
    "../../../components/Nurse/EditPatientTableAndForm/EditPatientForm/EditPatientForm"
  )
);

export default function EditPatient() {
  const dispatch = useDispatch();
  const {
    patients,
    patientCreate,
    patientUpdate,
    patientDelete,
    page,
    limit,
    totalPages,
    patientUHIDforSearch,
    patientNameForSearch,
    patientMobileNumberForSearch,
  } = useSelector((state) => state.PatientState);

  // console.log("totalPages", totalPages);

  const responseGetAllPatients = useGetAllPatientsQuery({
    page: page,
    limit: limit,
    patientUHIDforSearch: patientUHIDforSearch,
    patientNameForSearch: patientNameForSearch,
    patientMobileNumberForSearch: patientMobileNumberForSearch,
  });

  const [viewEditForm, setViewEditForm] = useState(false);
  const [patientId, setPatientId] = useState("");

  const apiRefetch = async () => {
    // Patients
    const responseGetAllPatientsRefetch = await responseGetAllPatients.refetch({
      page: page,
      limit: limit,
      patientUHIDforSearch: patientUHIDforSearch,
      patientNameForSearch: patientNameForSearch,
      patientMobileNumberForSearch: patientMobileNumberForSearch,
    });
    if (responseGetAllPatientsRefetch.isSuccess) {
      // const reverseArrayGetAllPatients =
      //   responseGetAllPatientsRefetch?.data?.Patients?.map(
      //     responseGetAllPatientsRefetch?.data?.Patients.pop,
      //     [...responseGetAllPatientsRefetch?.data?.Patients]
      //   );
      // const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
      //   (data) => data.isDeleted === false && data
      // );
      // const reverseArrayGetAllPatients =
      //   responseGetAllPatientsRefetch?.data?.Patients?.map(
      //     responseGetAllPatientsRefetch?.data?.Patients.pop,
      //     [...responseGetAllPatientsRefetch?.data?.Patients]
      //   );
      const filteredArrayGetAllPatients =
        responseGetAllPatientsRefetch?.data?.Patients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllPatients(filteredArrayGetAllPatients));
      dispatch(
        totalPagesChange(responseGetAllPatientsRefetch?.data?.totalPages)
      );
    }
    //------------------
  };
  useEffect(() => {
    apiRefetch();
    // Patients
    if (responseGetAllPatients.isSuccess) {
      // const reverseArrayGetAllPatients =
      //   responseGetAllPatients?.data?.Patients.map(
      //     responseGetAllPatients?.data?.Patients.pop,
      //     [...responseGetAllPatients?.data?.Patients]
      //   );
      const filteredArrayGetAllPatients =
        responseGetAllPatients?.data?.Patients?.filter(
          (data) => data.isDeleted === false && data
        );

      dispatch(getAllPatients(filteredArrayGetAllPatients));
      dispatch(totalPagesChange(responseGetAllPatients?.data?.totalPages));
    }
  }, [
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
    page,
    limit,
    totalPages,
    patientUHIDforSearch,
    patientNameForSearch,
    patientMobileNumberForSearch,
  ]);

  return (
    <>
      {responseGetAllPatients.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="superadmin-main-left w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.editPatient}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              {viewEditForm ? (
                <NurseEditForm
                  patientId={patientId}
                  setViewEditForm={setViewEditForm}
                />
              ) : (
                <NurseEditTable
                  setViewEditForm={setViewEditForm}
                  setPatientId={setPatientId}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
