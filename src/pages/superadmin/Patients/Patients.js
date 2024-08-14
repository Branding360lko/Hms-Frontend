import React, { useEffect } from "react";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import {
  getAllPatients,
  totalPagesChange,
} from "../../../Store/Slices/PatientSlice";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const PatientTable = lazy(() =>
  import("../../../components/superadmin/PatientTable/PatientTable")
);

export default function Patients() {
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
          <div className="w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.patients}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <PatientTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
