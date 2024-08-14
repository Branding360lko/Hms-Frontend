import React from "react";
import "./Dashboard.css";

import { lazy, Suspense, useEffect } from "react";
import browserLinks from "../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useGetAllPatientsQuery } from "../../Store/Services/PatientService";
import {
  getAllPatients,
  totalPagesChange,
} from "../../Store/Slices/PatientSlice";

const SideNav = lazy(() => import("../../components/Nurse/SideNav"));
const UpperNav = lazy(() => import("../../components/Nurse/UpperNav/UpperNav"));

const DashboardTable = lazy(() =>
  import("../../components/Nurse/DashboardTable/DashboardTable")
);

export default function Dashboard() {
  const dispatch = useDispatch();

  const {
    patients,
    patientCreate,
    patientUpdate,
    patientDelete,
    page,
    limit,
    query,
    totalPages,
  } = useSelector((state) => state.PatientState);

  const responseGetAllPatients = useGetAllPatientsQuery({
    page: page,
    limit: limit,
    query: query,
  });

  const apiRefetch = async () => {
    // Patients
    const responseGetAllPatientsRefetch = await responseGetAllPatients.refetch({
      page: page,
      limit: limit,
      query: query,
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
    query,
    totalPages,
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
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.dashboard}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <DashboardTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
