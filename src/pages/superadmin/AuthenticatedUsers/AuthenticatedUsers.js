import React from "react";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { useGetAllAdminsQuery } from "../../../Store/Services/AdminService";
import {
  getAllAdmins,
  getAdminLoggedIn,
  getAdminLoggedInData,
  getAdminRole,
} from "../../../Store/Slices/AdminSlice";

import { useGetAllDoctorsQuery } from "../../../Store/Services/DoctorService";

import { getAllDoctors } from "../../../Store/Slices/DoctorSlice";

import { useGetAllNursesQuery } from "../../../Store/Services/NurseService";
import { getAllNurses } from "../../../Store/Slices/NurseSlice";

const AuthenticatedUsersTable = lazy(() =>
  import(
    "../../../components/superadmin/AuthenticatedUsersTable/AuthenticatedUsersTable"
  )
);

export default function AuthenticatedUsers() {
  const dispatch = useDispatch();

  const responseGetAllAdmins = useGetAllAdminsQuery();

  const responseGetAllDoctors = useGetAllDoctorsQuery();

  const responseGetAllNurses = useGetAllNursesQuery();

  const {
    Admins,
    adminLoggedIn,
    adminLoggedInData,
    adminRole,
    createAdmin,
    updateAdmin,
    deleteAdmin,
  } = useSelector((state) => state.AdminState);

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

  //   console.log(Admins);

  const fetchNursesNames = async () => {
    return await axios
      .get(`${process.env.React_App_Base_url}DropdownData-Nurse`, {
        params: { query: "" },
      })
      .then((res) => dispatch(getAllNurses(res.data)))
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
    fetchNursesNames();
    fetchDoctorNames();
  }, []);

  const apiRefetch = async () => {
    // Admins
    const responseGetAllAdminsRefetch = await responseGetAllAdmins.refetch();
    if (responseGetAllAdminsRefetch.isSuccess) {
      const reverseArrayGetAllAdmins = responseGetAllAdminsRefetch?.data?.map(
        responseGetAllAdminsRefetch?.data?.pop,
        [...responseGetAllAdminsRefetch?.data]
      );
      const filteredArrayGetAllAdmins = reverseArrayGetAllAdmins?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllAdmins(filteredArrayGetAllAdmins));
    }
    // ----------------------
    // const responseGetAllDoctorsRefetch = await responseGetAllDoctors.refetch();
    // if (responseGetAllDoctorsRefetch.isSuccess) {
    //   const filteredArrayGetAllDoctors =
    //     responseGetAllDoctors?.data?.Doctors?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }
    // ------------------
    // const responseGetAllNursesRefetch = await responseGetAllNurses.refetch();
    // if (responseGetAllNursesRefetch.isSuccess) {
    //   const filteredArrayGetAllNurses =
    //     responseGetAllNurses?.data?.nurses?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllNurses(filteredArrayGetAllNurses));
    // }
    // ------------------

    fetchNursesNames();
    fetchDoctorNames();
  };

  React.useEffect(() => {
    apiRefetch();

    if (responseGetAllAdmins.isSuccess) {
      const reverseArrayGetAllAdmins = responseGetAllAdmins?.data?.map(
        responseGetAllAdmins?.data?.pop,
        [...responseGetAllAdmins?.data]
      );
      const filteredArrayGetAllAdmins = reverseArrayGetAllAdmins?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllAdmins(filteredArrayGetAllAdmins));
    }
    // ----------------------------
    // Doctors
    // if (responseGetAllDoctors.isSuccess) {
    //   const filteredArrayGetAllDoctors =
    //     responseGetAllDoctors?.data?.Doctors?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    // }
    // --------------------
    // Nurse
    // if (responseGetAllNurses.isSuccess) {
    //   const filteredArrayGetAllNurses =
    //     responseGetAllNurses?.data?.nurses?.filter(
    //       (data) => data.isDeleted === false && data
    //     );
    //   dispatch(getAllNurses(filteredArrayGetAllNurses));
    // }
    // --------------------
  }, [
    createAdmin,
    updateAdmin,
    deleteAdmin,
    responseGetAllAdmins.isSuccess,
    responseGetAllDoctors.isSuccess,
    responseGetAllNurses.isSuccess,
  ]);

  return (
    <>
      <div className="superadmin-main flex flex-row w-full h-screen">
        <div className="w-[20%] shadow-lg">
          <SideNav
            activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.authenticatedUsers}`}
          />
        </div>
        <div className="superadmin-main-right flex flex-col w-[80%]">
          <UpperNav />
          <div className="superadmin-main-right_dashboard w-full overflow-y-scroll">
            <AuthenticatedUsersTable />
          </div>
        </div>
      </div>
    </>
  );
}
