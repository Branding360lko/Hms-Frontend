import React, { useEffect, useState } from "react";
import "./Departments.css";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";

import { useSelector, useDispatch } from "react-redux";

import { getAllDepartments } from "../../../Store/Slices/DepartmentSlice";
import { useGetAllDepartmentsQuery } from "../../../Store/Services/DepartmentService";

import { getAllFloorDepartments } from "../../../Store/Slices/FloorDepartmentSlice";
import { useGetAllFloorDepartmentsQuery } from "../../../Store/Services/FloorDepartmentService";

import { useGetAllWardsQuery } from "../../../Store/Services/WardService";
import { getAllWards } from "../../../Store/Slices/WardSlice";

import { useGetAllBedsQuery } from "../../../Store/Services/BedService";
import { getAllBeds } from "../../../Store/Slices/BedSlice";

const ManageDepartment = lazy(() =>
  import(
    "../../../components/superadmin/Departments/ManageDepartment/ManageDepartment"
  )
);
const FloorsDepartment = lazy(() =>
  import(
    "../../../components/superadmin/Departments/FloorsDepartment/FloorsDepartment"
  )
);
const ManageWard = lazy(() =>
  import("../../../components/superadmin/Departments/ManageWard/ManageWard")
);
const ManageBeds = lazy(() =>
  import("../../../components/superadmin/Departments/ManageBeds/ManageBeds")
);

export default function Departments() {
  const [activePage, setActivePage] = useState("Manage Department");
  const dispatch = useDispatch();

  const responseGetAllDepartments = useGetAllDepartmentsQuery();
  // console.log(responseGetAllDepartmentsQuery);
  const responseGetAllFloorDepartments = useGetAllFloorDepartmentsQuery();

  const responseGetAllWards = useGetAllWardsQuery();

  const responseGetAllBeds = useGetAllBedsQuery();

  const { departments, createDepartment, updateDepartment, deleteDepartment } =
    useSelector((state) => state.DepartmentState);

  const {
    floorDepartments,
    createFloorDepartment,
    updateFloorDepartment,
    deleteFloorDepartment,
  } = useSelector((state) => state.FloorDepartmentState);

  const { wards, createWards, updateWards, deleteWards } = useSelector(
    (state) => state.WardState
  );

  const { beds, createBeds, updateBeds, deleteBeds } = useSelector(
    (state) => state.BedState
  );
  console.log(beds);

  const apiRefetch = async () => {
    // Departments
    const responseGetAllDepartmentRefetch =
      await responseGetAllDepartments.refetch();
    if (responseGetAllDepartmentRefetch.isSuccess) {
      const reverseArrayGetAllDepartment =
        responseGetAllDepartmentRefetch?.data?.map(
          responseGetAllDepartmentRefetch?.data?.pop,
          [...responseGetAllDepartmentRefetch?.data]
        );
      const filteredArrayGetAllDepartments =
        reverseArrayGetAllDepartment?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllDepartments(filteredArrayGetAllDepartments));
    }
    // ------------------
    // Floor Departments
    const responseGetAllFloorDepartmentsRefetch =
      await responseGetAllFloorDepartments.refetch();
    if (responseGetAllFloorDepartmentsRefetch.isSuccess) {
      const reverseArrayGetAllFloorDepartment =
        responseGetAllFloorDepartmentsRefetch?.data?.map(
          responseGetAllFloorDepartmentsRefetch?.data?.pop,
          [...responseGetAllFloorDepartmentsRefetch?.data]
        );
      const filteredArrayGetAllFloorDepartments =
        reverseArrayGetAllFloorDepartment?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllFloorDepartments(filteredArrayGetAllFloorDepartments));
    }
    // ------------------
    // Wards
    const responseGetAllWardsRefetch = await responseGetAllWards.refetch();
    if (responseGetAllWardsRefetch.isSuccess) {
      const reverseArrayGetAllWards = responseGetAllWardsRefetch?.data?.map(
        responseGetAllWardsRefetch?.data?.pop,
        [...responseGetAllWardsRefetch?.data]
      );
      const filteredArrayGetAllWards = reverseArrayGetAllWards?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllWards(filteredArrayGetAllWards));
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
    // Departments
    if (responseGetAllDepartments.isSuccess) {
      const reverseArrayGetAllDepartments =
        responseGetAllDepartments?.data?.map(
          responseGetAllDepartments?.data?.pop,
          [...responseGetAllDepartments?.data]
        );
      const filteredArrayGetAllDepartments =
        reverseArrayGetAllDepartments?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllDepartments(filteredArrayGetAllDepartments));
    }
    // ---------------------
    // Floor Departments
    if (responseGetAllFloorDepartments.isSuccess) {
      const reverseArrayGetAllFloorDepartments =
        responseGetAllFloorDepartments?.data?.map(
          responseGetAllFloorDepartments?.data?.pop,
          [...responseGetAllFloorDepartments?.data]
        );
      const filteredArrayGetAllFloorDepartments =
        reverseArrayGetAllFloorDepartments?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllFloorDepartments(filteredArrayGetAllFloorDepartments));
    }
    // ---------------------
    // Wards
    if (responseGetAllWards.isSuccess) {
      const reverseArrayGetAllWards = responseGetAllWards?.data?.map(
        responseGetAllWards?.data?.pop,
        [...responseGetAllWards?.data]
      );
      const filteredArrayGetAllWards = reverseArrayGetAllWards?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllWards(filteredArrayGetAllWards));
    }
    // ---------------------
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
    responseGetAllDepartments.isSuccess,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    responseGetAllFloorDepartments.isSuccess,
    createFloorDepartment,
    updateFloorDepartment,
    deleteFloorDepartment,
    responseGetAllWards.isSuccess,
    createWards,
    updateWards,
    deleteWards,
    responseGetAllBeds.isSuccess,
    createBeds,
    updateBeds,
    deleteBeds,
  ]);

  return (
    <div className='superadmin-main flex flex-row w-full h-screen'>
      <div className='w-[20%] shadow-lg'>
        <SideNav
          activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.department}`}
        />
      </div>
      <div className='superadmin-main-right flex flex-col w-[80%]'>
        <UpperNav />
        <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
          {activePage === "Manage Department" && (
            <ManageDepartment setActivePage={setActivePage} />
          )}
          {activePage === "Floors Department" && (
            <FloorsDepartment setActivePage={setActivePage} />
          )}
          {activePage === "Manage Ward" && (
            <ManageWard setActivePage={setActivePage} />
          )}
          {activePage === "Manage BEDS" && (
            <ManageBeds setActivePage={setActivePage} />
          )}
        </div>
      </div>
    </div>
  );
}
