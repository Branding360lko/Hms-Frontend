import React, { useEffect } from "react";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

import {
  useGetAllDoctorsQuery,
  useGetAllDoctorProfessionalDetailsQuery,
} from "../../../Store/Services/DoctorService";

import {
  getAllDoctors,
  getAllDoctorsProfessionalDetails,
  totalPagesChange,
} from "../../../Store/Slices/DoctorSlice";

const DoctorTable = lazy(() =>
  import("../../../components/superadmin/DoctorTable/DoctorTable")
);

export default function Doctors() {
  const dispatch = useDispatch();

  const {
    doctors,
    doctorProfessionalDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    page,
    limit,
    totalPages,
    doctorNameForSearch,
    doctorMobileNumberForSearch,
    doctorIdForSearch,
  } = useSelector((state) => state.DoctorState);

  // console.log(doctors);

  // console.log(page, limit, query, totalPages);

  const responseGetAllDoctors = useGetAllDoctorsQuery({
    page: page,
    limit: limit,
    doctorNameForSearch: doctorNameForSearch,
    doctorMobileNumberForSearch: doctorMobileNumberForSearch,
    doctorIdForSearch: doctorIdForSearch,
  });
  const responseGetAllDoctorProfessionalDetails =
    useGetAllDoctorProfessionalDetailsQuery({
      page: page,
      limit: limit,
      doctorNameForSearch: doctorNameForSearch,
      doctorMobileNumberForSearch: doctorMobileNumberForSearch,
      doctorIdForSearch: doctorIdForSearch,
    });

  const apiRefetch = async () => {
    // Doctors
    const responseGetAllDoctorsRefetch = await responseGetAllDoctors.refetch({
      page: page,
      limit: limit,
      doctorNameForSearch: doctorNameForSearch,
      doctorMobileNumberForSearch: doctorMobileNumberForSearch,
      doctorIdForSearch: doctorIdForSearch,
    });
    if (responseGetAllDoctorsRefetch.isSuccess) {
      // const reverseArrayGetAllDoctors = responseGetAllDoctorsRefetch?.data?.map(
      //   responseGetAllDoctorsRefetch?.data?.pop,
      //   [...responseGetAllDoctorsRefetch?.data]
      // );
      // const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
      //   (data) => data.isDeleted === false && data
      // );
      const filteredArrayGetAllDoctors =
        responseGetAllDoctorsRefetch?.data?.Doctors?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllDoctors(filteredArrayGetAllDoctors));
      dispatch(totalPagesChange(filteredArrayGetAllDoctors?.data?.totalPages));
    }
    // ------------------
    // Doctors Professional Details
    const responseGetAllDoctorsProfessionalDetailsRefetch =
      await responseGetAllDoctorProfessionalDetails.refetch({
        page: page,
        limit: limit,
        doctorNameForSearch: doctorNameForSearch,
        doctorMobileNumberForSearch: doctorMobileNumberForSearch,
        doctorIdForSearch: doctorIdForSearch,
      });
    if (responseGetAllDoctorsProfessionalDetailsRefetch.isSuccess) {
      // const reverseArrayGetAllDoctorsProfessionalDetails =
      //   responseGetAllDoctorsProfessionalDetailsRefetch?.data?.map(
      //     responseGetAllDoctorsProfessionalDetailsRefetch?.data?.pop,
      //     [...responseGetAllDoctorsProfessionalDetailsRefetch?.data]
      //   );
      // const filteredArrayGetAllDoctorsProfessionalDetails =
      //   reverseArrayGetAllDoctorsProfessionalDetails?.filter(
      //     (data) => data.isDeleted === false && data
      //   );
      const filteredArrayGetAllDoctorsProfessionalDetails =
        responseGetAllDoctorsProfessionalDetailsRefetch?.data?.DoctorProfDetails?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(
        getAllDoctorsProfessionalDetails(
          filteredArrayGetAllDoctorsProfessionalDetails
        )
      );
    }
    // ------------------
  };

  useEffect(() => {
    apiRefetch();
    // Doctors
    if (responseGetAllDoctors.isSuccess) {
      // const reverseArrayGetAllDoctors = responseGetAllDoctors?.data?.map(
      //   responseGetAllDoctors?.data?.pop,
      //   [...responseGetAllDoctors?.data]
      // );
      // const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
      //   (data) => data.isDeleted === false && data
      // );
      const filteredArrayGetAllDoctors =
        responseGetAllDoctors?.data?.Doctors?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllDoctors(filteredArrayGetAllDoctors));
      dispatch(totalPagesChange(filteredArrayGetAllDoctors?.data?.totalPages));
    }
    // --------------------
    // Doctors Professional Details
    if (responseGetAllDoctorProfessionalDetails.isSuccess) {
      // const reverseArrayGetAllDoctorsProfessionalDetails =
      //   responseGetAllDoctorProfessionalDetails?.data?.map(
      //     responseGetAllDoctorProfessionalDetails?.data?.pop,
      //     [...responseGetAllDoctorProfessionalDetails?.data]
      //   );
      // const filteredArrayGetAllDoctorsProfessionalDetails =
      //   reverseArrayGetAllDoctorsProfessionalDetails?.filter(
      //     (data) => data.isDeleted === false && data
      //   );
      const filteredArrayGetAllDoctorsProfessionalDetails =
        responseGetAllDoctorProfessionalDetails?.data?.DoctorProfDetails?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(
        getAllDoctorsProfessionalDetails(
          filteredArrayGetAllDoctorsProfessionalDetails
        )
      );
    }
    // --------------------
  }, [
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
    responseGetAllDoctorProfessionalDetails.isSuccess,
    page,
    limit,
    totalPages,
    doctorNameForSearch,
    doctorMobileNumberForSearch,
    doctorIdForSearch,
  ]);
  return (
    <>
      {responseGetAllDoctors.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="superadmin-main flex flex-row w-full h-screen">
          <div className="w-[20%] shadow-lg">
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.doctors}`}
            />
          </div>
          <div className="superadmin-main-right flex flex-col w-[80%]">
            <UpperNav />
            <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
              <DoctorTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
