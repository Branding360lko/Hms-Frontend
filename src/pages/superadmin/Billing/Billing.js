import React from "react";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { useGetAllBillingsQuery } from "../../../Store/Services/BillingService";
import { getAllBillings } from "../../../Store/Slices/BillingSlice";
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

const BillingTable = lazy(() =>
  import("../../../components/superadmin/BillingTable/BillingTable")
);

export default function Billing() {
  const dispatch = useDispatch();
  const responseGetAllBillings = useGetAllBillingsQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();
  const responseGetAllDoctorProfessionalDetails =
    useGetAllDoctorProfessionalDetailsQuery();
  const responseGetAllPatients = useGetAllPatientsQuery();

  const { billings, createBilling, updateBilling, deleteBilling } = useSelector(
    (state) => state.BillingState
  );

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

  React.useEffect(() => {
    fetchPatientNames();
    fetchDoctorNames();

    console.log(patients);
  }, []);

  const apiRefetch = async () => {
    // Billing
    const responseGetAllBillingRefetch = await responseGetAllBillings.refetch();
    if (responseGetAllBillingRefetch.isSuccess) {
      const reverseGetAllBillings = responseGetAllBillingRefetch?.data?.map(
        responseGetAllBillingRefetch?.data?.pop,
        [...responseGetAllBillingRefetch?.data]
      );
      const filteredArrayGetAllBilling = reverseGetAllBillings?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllBillings(filteredArrayGetAllBilling));
    }
    // ---------------------
    // Doctors
    // const responseGetAllDoctorsRefetch = await responseGetAllDoctors.refetch();
    // if (responseGetAllDoctorsRefetch.isSuccess) {
    //   const filteredArrayGetAllDoctors =
    //     responseGetAllDoctorsRefetch?.data?.Doctors?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }
    // ------------------
    // Doctors Professional Details
    // const responseGetAllDoctorsProfessionalDetailsRefetch =
    //   await responseGetAllDoctorProfessionalDetails.refetch();
    // if (responseGetAllDoctorsProfessionalDetailsRefetch.isSuccess) {
    //   const filteredArrayGetAllDoctorsProfessionalDetails =
    //     responseGetAllDoctorsProfessionalDetailsRefetch?.data?.DoctorProfDetails?.filter(
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
    //   // const reverseArrayGetAllPatients =
    //   //   responseGetAllPatientsRefetch?.data?.map(
    //   //     responseGetAllPatientsRefetch?.data?.pop,
    //   //     [...responseGetAllPatientsRefetch?.data]
    //   //   );
    //   const filteredArrayGetAllPatients =
    //     responseGetAllPatientsRefetch?.data?.Patients?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllPatients(filteredArrayGetAllPatients));
    // }
    //------------------

    fetchPatientNames();
    fetchDoctorNames();
  };

  React.useEffect(() => {
    apiRefetch();
    // Billing
    if (responseGetAllBillings.isSuccess) {
      const reverseArrayGetAllBilling = responseGetAllBillings?.data?.map(
        responseGetAllBillings?.data?.pop,
        [...responseGetAllBillings?.data]
      );
      const filteredArrayGetAllBilling = reverseArrayGetAllBilling?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllBillings(filteredArrayGetAllBilling));
    }
    // ---------------------
    // Doctors
    // if (responseGetAllDoctors.isSuccess) {
    //   const filteredArrayGetAllDoctors =
    //     responseGetAllDoctors?.data?.Doctors?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }
    // --------------------
    // Doctors Professional Details
    // if (responseGetAllDoctorProfessionalDetails.isSuccess) {
    //   // const reverseArrayGetAllDoctorsProfessionalDetails =
    //   //   responseGetAllDoctorProfessionalDetails?.data?.map(
    //   //     responseGetAllDoctorProfessionalDetails?.data?.pop,
    //   //     [...responseGetAllDoctorProfessionalDetails?.data]
    //   //   );
    //   const filteredArrayGetAllDoctorsProfessionalDetails =
    //     responseGetAllDoctorProfessionalDetails?.data?.DoctorProfDetails?.filter(
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
    //   // const reverseArrayGetAllPatients = responseGetAllPatients?.data?.map(
    //   //   responseGetAllPatients?.data?.pop,
    //   //   [...responseGetAllPatients?.data]
    //   // );
    //   const filteredArrayGetAllPatients =
    //     responseGetAllPatients?.data?.Patients?.filter(
    //       (data) => data.isDeleted === false && data
    //     );

    //   dispatch(getAllPatients(filteredArrayGetAllPatients));
    // }
  }, [
    createBilling,
    updateBilling,
    deleteBilling,
    responseGetAllBillings.isSuccess,
    // createDoctor,
    // updateDoctor,
    // deleteDoctor,
    // responseGetAllDoctors.isSuccess,
    // responseGetAllDoctorProfessionalDetails.isSuccess,
    // patientCreate,
    // patientUpdate,
    // patientDelete,
    // responseGetAllPatients.isSuccess,
  ]);
  return (
    <>
      {responseGetAllBillings.isLoading ? (
        // &&
        // responseGetAllDoctorProfessionalDetails.isLoading &&
        // responseGetAllPatients.isLoading &&
        // responseGetAllDoctors.isLoading
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.billing}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <BillingTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
