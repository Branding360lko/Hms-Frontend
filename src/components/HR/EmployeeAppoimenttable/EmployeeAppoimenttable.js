import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Table from "../../Table";
import {
  addEmployeeAppoiment,
  getAllAppoimentData,
  getOneAppoimentData,
  updateAppoimentData,
} from "../HrApiCollection";
import Snackbars from "../../SnackBar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { IoMdPrint } from "react-icons/io";
import { useSelector } from "react-redux";
import PaginationComponent from "../../Pagination";
import { CiViewList } from "react-icons/ci";
import { useReactToPrint } from "react-to-print";

function EmployeeAppoimenttable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "600px",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    overflowY: "scroll",
  };
  const offerLetterRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => offerLetterRef.current,
  });
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [snackBarData, setSnackBarData] = useState({
    open: false,
    message: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { adminLoggedInData } = useSelector((state) => state?.AdminState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [appoimentId, setAppoimentId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allAppoimentData, setAllAppimentData] = useState();
  const [getAppoimentData, setGetAppoimentData] = useState({
    fullName: "",
    emailId: "",
    Designation: "",
    PanCard: "",
    Division: "",
    DateofJoining: "",
    BasicSalary: "",
    ManagementGrade: "",
    SpecialAllowance: "",
    INCENTIVE: "",
    createdBy: "",
  });
  const handleGetValue = (e) => {
    setGetAppoimentData({
      ...getAppoimentData,
      [e.target.name]: e.target.value,
    });
  };
  const config = [
    {
      label: "S N",
      // render: (list) => list.tableId,
    },
    {
      label: "Appointments Id",
      // render: (list) => list.tableId,
    },
    {
      label: "Appointments Name",
      // render: (list) => list.tableId,
    },

    {
      label: "Date Of Joining",
      // render: (list) => list.adminName,
    },
    {
      label: "Basic Salary / Month",
      // render: (list) => list.adminEmail,
    },

    {
      label: "Designation",
      // render: (list) => `${date(list.updatedAt)} - ${time(list.updatedAt)}`,
    },

    {
      label: "User Action",
      // render: (list) => (
      //   <div className="flex gap-[10px] justify-center">
      //     <div
      //       onClick={() => handleOpenUpdateModal(list)}
      //       className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
      //     >
      //       <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
      //     </div>
      //   </div>
      // ),
    },
  ];
  const getAllAppoimentDataHandle = async () => {
    const result = await getAllAppoimentData();
    setAllAppimentData(result && result);
    console.log(result);
  };
  const addAppoimentDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", getAppoimentData?.fullName);
    formData.append("Email", getAppoimentData?.emailId);
    formData.append("dataofJoin", getAppoimentData?.DateofJoining);
    formData.append("createdBy", adminLoggedInData?.adminEmail);
    formData.append("basicSalary", getAppoimentData?.BasicSalary);
    formData.append("Ensentive", getAppoimentData?.INCENTIVE);
    formData.append("Division", getAppoimentData?.Division);
    formData.append("Designation", getAppoimentData?.Designation);
    formData.append("managementGrade", getAppoimentData?.ManagementGrade);
    formData.append("specialAllowance", getAppoimentData?.SpecialAllowance);
    formData.append("panNumber", getAppoimentData?.PanCard);
    setIsLoading(true);
    const result = await addEmployeeAppoiment(formData);
    setIsLoading(false);
    if (result) {
      handleClose();
      setSnackBarData({ open: true, message: result?.message });
      getAllAppoimentDataHandle();
    }
  };
  const getOneAppoimentDataHandle = async (id) => {
    const result = await getOneAppoimentData(id);
    setAppoimentId(result && result?.data?._id);
    setGetAppoimentData({
      ...getAllAppoimentData,
      fullName: result?.data?.fullName,
      emailId: result?.data?.Email,
      PanCard: result?.data?.panNumber,
      Designation: result?.data?.Designation,
      Division: result?.data?.Division,
      dataofJoin: result?.data?.dataofJoin,
      BasicSalary: result?.data?.basicSalary,
      ManagementGrade: result?.data?.managementGrade,
      SpecialAllowance: result?.data?.specialAllowance,
      INCENTIVE: result?.data?.Ensentive,
      createdBy: result?.data?.createdBy,
    });

    console.log(result, "result");
  };
  const updateAppoimentDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", getAppoimentData?.fullName);
    formData.append("Email", getAppoimentData?.emailId);
    formData.append("dataofJoin", getAppoimentData?.DateofJoining);
    formData.append("createdBy", adminLoggedInData?.adminEmail);
    formData.append("basicSalary", getAppoimentData?.BasicSalary);
    formData.append("Ensentive", getAppoimentData?.INCENTIVE);
    formData.append("Division", getAppoimentData?.Division);
    formData.append("Designation", getAppoimentData?.Designation);
    formData.append("managementGrade", getAppoimentData?.ManagementGrade);
    formData.append("specialAllowance", getAppoimentData?.SpecialAllowance);
    formData.append("panNumber", getAppoimentData?.PanCard);
    setIsLoading(true);
    const result = await updateAppoimentData(appoimentId, formData);
    if (result) {
      handleClose1();
      setSnackBarData({ open: true, message: result?.messaeg });
    }
    setIsLoading(false);
    console.log(result);
  };

  const addAppoiment = (
    <div>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={addAppoimentDataHandle}
      >
        <span className="gap-[5px]">
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Email ID *</p>
          <input
            type="text"
            placeholder="Email ID *"
            name="emailId"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>PAN Number *</p>
          <input
            type="text"
            placeholder="PAN Number *"
            name="PanCard"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Designation</p>
          <input
            type="text"
            placeholder="Designation *"
            name="Designation"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Division</p>
          <input
            type="text"
            placeholder="Division"
            name="Division"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Date of Joining </p>
          <input
            type="date"
            placeholder="Division"
            name="DateofJoining"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Basic Salary / Month </p>
          <input
            type="number"
            placeholder="Basic Salary / Month"
            name="BasicSalary"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Management Grade</p>
          <input
            type="text"
            placeholder="Management Grade"
            name="ManagementGrade"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>Special Allowance / Month</p>
          <input
            type="number"
            placeholder="Special Allowance / Month"
            name="SpecialAllowance"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>
        <span className="gap-[5px]">
          <p>INCENTIVE/BENEFITS APPLICABLE</p>
          <input
            type="number"
            placeholder="INCENTIVE"
            name="INCENTIVE"
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
            required
          />
        </span>

        {!isLoading ? (
          <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
            Save
          </button>
        ) : (
          <button
            className="bg-[#3497F9] text-white p-[10px] rounded-md "
            disabled
          >
            Saveing...
          </button>
        )}
      </form>
    </div>
  );
  const editAppoiment = (
    <div>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={updateAppoimentDataHandle}
      >
        <span className="gap-[5px]">
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={getAppoimentData?.fullName}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Email ID *</p>
          <input
            type="text"
            placeholder="Email ID *"
            name="emailId"
            value={getAppoimentData?.emailId}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>PAN Number *</p>
          <input
            type="text"
            placeholder="PAN Number *"
            name="PanCard"
            value={getAppoimentData?.PanCard}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Designation</p>
          <input
            type="text"
            placeholder="Designation *"
            name="Designation"
            value={getAppoimentData?.Designation}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Division</p>
          <input
            type="text"
            placeholder="Division"
            name="Division"
            value={getAppoimentData?.Division}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Date of Joining </p>
          <input
            type="date"
            placeholder="Division"
            name="DateofJoining"
            value={getAppoimentData?.dataofJoin}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Basic Salary / Month </p>
          <input
            type="number"
            placeholder="Basic Salary / Month"
            name="BasicSalary"
            value={getAppoimentData?.BasicSalary}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Management Grade</p>
          <input
            type="text"
            placeholder="Management Grade"
            name="ManagementGrade"
            value={getAppoimentData?.ManagementGrade}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Special Allowance / Month</p>
          <input
            type="number"
            placeholder="Special Allowance / Month"
            name="SpecialAllowance"
            value={getAppoimentData?.SpecialAllowance}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>INCENTIVE/BENEFITS APPLICABLE</p>
          <input
            type="number"
            placeholder="INCENTIVE"
            name="INCENTIVE"
            value={getAppoimentData?.INCENTIVE}
            onChange={handleGetValue}
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>

        {!isLoading ? (
          <button className="bg-[#3497F9] text-white p-[10px] rounded-md ">
            Update
          </button>
        ) : (
          <button
            className="bg-[#3497F9] text-white p-[10px] rounded-md "
            disabled
          >
            Updating...
          </button>
        )}
      </form>
    </div>
  );
  const viewAppoiment = (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <span className="gap-[5px]">
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={getAppoimentData?.fullName}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Email ID *</p>
          <input
            type="text"
            placeholder="Email ID *"
            name="emailId"
            value={getAppoimentData?.emailId}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>PAN Number *</p>
          <input
            type="text"
            placeholder="PAN Number *"
            name="PanCard"
            value={getAppoimentData?.PanCard}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Designation</p>
          <input
            type="text"
            placeholder="Designation *"
            name="Designation"
            value={getAppoimentData?.Designation}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Division</p>
          <input
            type="text"
            placeholder="Division"
            name="Division"
            value={getAppoimentData?.Division}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Date of Joining </p>
          <input
            type="date"
            placeholder="Division"
            name="DateofJoining"
            value={getAppoimentData?.dataofJoin}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Basic Salary / Month </p>
          <input
            type="number"
            placeholder="Basic Salary / Month"
            name="BasicSalary"
            value={getAppoimentData?.BasicSalary}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Management Grade</p>
          <input
            type="text"
            placeholder="Management Grade"
            name="ManagementGrade"
            value={getAppoimentData?.ManagementGrade}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>Special Allowance / Month</p>
          <input
            type="number"
            placeholder="Special Allowance / Month"
            name="SpecialAllowance"
            value={getAppoimentData?.SpecialAllowance}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>
        <span className="gap-[5px]">
          <p>INCENTIVE/BENEFITS APPLICABLE</p>
          <input
            type="number"
            placeholder="INCENTIVE"
            name="INCENTIVE"
            value={getAppoimentData?.INCENTIVE}
            disabled
            className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
          />
        </span>

        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handlePrint}
        >
          Print Appoiment Letter
        </button>
      </div>
    </div>
  );
  const getValueHandle = async () => {
    const result = await allAppoimentData?.filter((item) => {
      if (searchValue !== "") {
        return item?.mainId
          ?.toLowerCase()
          ?.includes(searchValue?.toLowerCase());
      }
    });
    setSearchResult(result && result);
  };
  useEffect(() => {
    getValueHandle();
  }, [searchValue]);
  useEffect(() => {
    getAllAppoimentDataHandle();
  }, []);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">
          Employee Appointments
        </h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md "
          onClick={handleOpen}
        >
          Add Appointments
        </button>
      </div>
      <div className="w-[23rem] flex items-center justify-center gap-1">
        <input
          type="text"
          placeholder="Search By Appoiment Id"
          value={searchValue}
          className="w-11/12 border-[2px] h-[2rem] pl-[5px] outline-none rounded bg-[#F4F6F6]"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
          onClick={() => [setSearchResult([]), setSearchValue("")]}
          disabled={searchValue != "" ? false : true}
        >
          Reset
        </button>
      </div>
      <div>
        <table className="w-full table-auto border-spacing-2 text-[#595959] font-[300]">
          <thead>
            {config?.map((item) => (
              <th className="border-b-[1px]">
                <p>{item?.label}</p>
              </th>
            ))}
          </thead>
          <tbody>
            {searchResult && searchValue != ""
              ? searchResult
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {index + 1}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.mainId}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.fullName}
                      </td>

                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.dataofJoin}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.basicSalary}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.Designation}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                        <div className="flex gap-[10px] justify-center">
                          <div
                            onClick={() => [
                              handleOpen2(),
                              getOneAppoimentDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          >
                            <CiViewList className="text-[25px] text-[#96999C]" />
                          </div>
                          <div
                            onClick={() => [
                              handleOpen1(),
                              getOneAppoimentDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          >
                            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
              : allAppoimentData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {index + 1}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.mainId}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.fullName}
                      </td>

                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.dataofJoin}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.basicSalary}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.Designation}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px] flex-row">
                        <div className="flex gap-[10px] justify-center">
                          <div
                            onClick={() => [
                              handleOpen2(),
                              getOneAppoimentDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          >
                            <CiViewList className="text-[25px] text-[#96999C]" />
                          </div>
                          <div
                            onClick={() => [
                              handleOpen1(),
                              getOneAppoimentDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          >
                            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
            {}
          </tbody>
        </table>
        <PaginationComponent
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={allAppoimentData}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Appointments
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {addAppoiment}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Appointments
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {editAppoiment}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="border-b-[4px] border-[#3497F9] w-fit"
            >
              Appointments
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {viewAppoiment}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Snackbars
        open={snackBarData?.open}
        message={snackBarData?.message}
        setOpen={setSnackBarData}
      />

      <div className="print-hide">
        <div className="print-show" ref={offerLetterRef}>
          <div className=" w-full pl-[20px] pr-[20px]">
            <div className="pb-[10px] pt-[10px]">
              <h2 className="text-[18px] text-center font-bold ">
                OFFER-CUM-APPOINTMENT LETTER
              </h2>
            </div>
            <hr />
            <div className="pt-[20px] flex justify-start flex-col w-full text-start gap-[10px]">
              <h2 className="text-[20px] font-semibold leading-10 italic">
                Dear <span className=""> {getAppoimentData?.fullName}</span>
              </h2>
              <p className="text-[14px] leading-6">
                With reference to your application and subsequent
                interview/discussions, we are pleased to offer you the following
                position/designation on contract basis and welcome you to CHTC
                Healthcare Pvt. Ltd., and we are sure you will have a long and
                rewarding career with us. Wish you success!
              </p>
              <p className="text-[14px] leading-6">
                We give here below the details of your contractual appointment
                and the terms and conditions goveming your appointment in our
                organization:
              </p>
              <div className="w-full flex flex-col text-start gap-[10px] font-medium">
                <div className="flex text-[14px]">
                  <span>1 Designation :</span>
                  <p>{getAppoimentData?.Designation}</p>
                </div>
                <div className="flex text-[14px]">
                  <span>2 Division :</span>
                  <p>{getAppoimentData?.Division}</p>
                </div>
                <div className="flex text-[14px]">
                  <span>3 Date of Joining :</span>
                  <p>{getAppoimentData?.dataofJoin}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#A8A8A8]">
                    (If you do not join on or before the abovementioned date,
                    this letter of intent stands withdrawn.)
                  </p>
                </div>
                <div className="flex text-[14px]">
                  <span>4 Your commencing Basic Salary will be :</span>
                  <p>Rs. {getAppoimentData?.BasicSalary} per month.</p>
                </div>
                <div className="flex text-[14px]">
                  <span>5 Special Allowance :</span>
                  <p>Rs. {getAppoimentData?.SpecialAllowance} per month.</p>
                </div>
                <div className="flex text-[14px]">
                  <span>
                    6 Incentive/benefits on case (Project) to case basis as per
                    :
                  </span>
                  <p>Annexure - I.</p>
                </div>
                <div className="flex text-[14px]">
                  <span>7 Outstation/Travel Allowance as per :</span>
                  <p>Annexure - II.</p>
                </div>
                <div className="flex text-[14px]">
                  <span>8 Management Grade :</span>
                  <p>{getAppoimentData?.ManagementGrade}.</p>
                </div>

                <div>
                  <span className="text-[14px]">
                    9 Your appointment in the Company will be effective from
                    your actual date of joining the Organization.
                  </span>
                </div>

                <div className="text-[14px]">
                  <span>10 Probation :</span>
                  <span className="text-[13px] text-[#555555]">
                    <p>
                      A You will be on probation for a period of 3 (Three)
                      Months. On completion of your probationary period
                      successfully, you will be confirmed in your present
                      position in writing.
                    </p>
                    <p>
                      B. Your probation can be extended for a further period of
                      3 (Three) Months in the event your performance is not up
                      to mark.
                    </p>
                  </span>
                </div>
                <div className="text-[14px]">
                  <span>
                    11 The fixed expenses applicable to your grade are attached
                    as Annexure-III to this letter.
                  </span>
                </div>
                <div className="text-[14px]">
                  <span>
                    12 This appointment is further subject to the "General Terms
                    and conditions of Service for Managerial Personnel" employed
                    by this Company, a copy of which is attached as Annexure -
                    IV.
                  </span>
                </div>
                <div className="text-[14px]">
                  <span>
                    13 You will be required to strictly understand, abide and
                    adhere to the role, responsibilities and authority of
                    Trainee / Territory Business Managers as laid down by the
                    Company from time to time, a copy of which, as in force, is
                    enclosed for your guidance.
                  </span>
                </div>
                <div className="text-[14px]">
                  <span>
                    Please sigh and return to us the enclosed duplicate copy of
                    this letter in token of your acceptance of this appointment
                    and all the terms and conditions applicable to it as
                    detailed above in the Annexures attached hereto.
                  </span>
                </div>
                <div className="text-[14px]">
                  <span>Yours Sincerely.</span>
                </div>
                <div className="text-[14px]">
                  <span>
                    I hereby confirm my acceptance of all the Terms and
                    Conditions applicable to me as detailed above and in the
                    Annexures attached herewith.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="breakPage"></div>
          <div className="w-full pl-[20px] pr-[20px]">
            <div className="pb-[10px] pt-[10px] flex flex-col gap-[4px]">
              <h2 className="text-[18px] text-center font-bold ">ANNEXURE-I</h2>
              <p className="text-[14px] text-center">
                INCENTIVE (Case to Case basis)/BENEFITS APPLICABLE
              </p>
            </div>
            <hr />

            <div className="pt-[20px] w-full flex flex-col text-start gap-[10px] font-medium">
              <div className="flex justify-start items-start text-[14px] gap-[20px]">
                <span className="w-[20rem]">1 Incentive :</span>
                <p className="w-[55rem]">
                  You will be entitled to an incentive @ _______ % of net profit
                  earned by the Company on the project ________ on its
                  completion, provided you stay with the project on which you
                  are deputed until its completion.
                </p>
              </div>
              <div className="flex justify-start items-start text-[14px] gap-[20px]">
                <span className="w-[20rem]">2.Personal Accident :</span>
                <p className="w-[55rem]">
                  You will be covered under the Company's Group Personal
                  Accident Policy, as per rules and regulations governing the
                  said scheme.
                </p>
              </div>
              <div className="flex justify-start items-start text-[14px] gap-[20px]">
                <span className="w-[20rem]">3.Reimbursement of :</span>
                <p className="w-[55rem]">
                  You will be entitled to reimbursement of Traveling Expenses
                  upto fare of 2 A.C., If traveled by train, or A.C. Bussubject
                  to production of actual tickets and out station local
                  conveyance as per actuals and Rs.1200/- per day towards
                  fooding/lodging for traveling out side your place of
                  deputation. Copy
                </p>
              </div>
            </div>
          </div>
          <div className="breakPage"> </div>
          <div className="w-full pl-[20px] pr-[20px]">
            <div className="pb-[10px] pt-[10px] flex flex-col gap-[4px]">
              <h2 className="text-[18px] text-center font-bold ">
                ANNEXURE-II
              </h2>
              <p className="text-[14px] text-center">
                OUTSTATION/TRAVEL ALLOWANCE APPLICABLE
              </p>
            </div>
            <hr />

            <div className="pt-[20px] w-full flex flex-col text-start gap-[10px] font-medium">
              <div className="flex justify-start items-start text-[14px] gap-[20px]">
                <p>
                  You will be entitled to reimbursement of Traveling Expenses
                  upto fare of 2 A.C., if traveled byr train, or A.C. Bus,
                  subject to production of actual tickets and out station local
                  conveyance as per actuals and Rs.1200/- per day towards
                  fooding/lodging for traveling out side your place of
                  deputation
                </p>
              </div>
            </div>
          </div>
          <div className="breakPage"></div>
          <div className="w-full pl-[20px] pr-[20px]">
            <div className="pb-[10px] pt-[10px] flex flex-col gap-[4px]">
              <h2 className="text-[18px] text-center font-bold ">
                ANNEXURE-III
              </h2>
              <p className="text-[14px] text-center">
                FIXED FIELD EXPENSES APPLICABLE TO EMPLOYEES IN MANAGEMENT GRADE
                1A
              </p>
            </div>
            <hr />

            <div className="pt-[20px] w-full flex flex-col text-start gap-[10px] font-medium">
              <div className="flex justify-start items-start text-[14px] gap-[20px]">
                <p>
                  You will be paid an amount of Rs. 5,000/- p.m. towards
                  reimbursement of Fixed Field Expenses alongwith your monthly
                  salary:
                </p>
              </div>
              <p className="pb-[15px]">
                Fixed Expenses will cover the following:
              </p>
              <span className="text-[13px]">
                1. Use of Mobile phone for official purpose.
              </span>
              <span className="text-[13px]">
                2. Use of Internet for official work.
              </span>
              <span className="text-[13px]">
                3. Cost of Printing & Stationary and Sundry expenses for
                official purpose.
              </span>
              <span className="text-[13px]">
                4. Cost of Courier/postage expenses for official purpose.
              </span>
              <span className="text-[13px]">5. Local conveyance.</span>
              <p>The above amount will not be part of your fixed pay.</p>
            </div>
          </div>
          <div className="breakPage"></div>
          <div className="w-full pl-[20px] pr-[20px]">
            <div className="pb-[10px] pt-[10px] flex flex-col gap-[4px]">
              <h2 className="text-[18px] text-center font-bold ">
                ANNEXURE-IV
              </h2>
              <p className="text-[16px] text-center font-semibold">
                GENERAL TERMS AND CONDITIONS OF SERVICE FOR MANAGERIAL PERSONNEL
                EMPLOYED BY THE COMPANY
              </p>
            </div>
            <hr />

            <div className="pt-[20px] w-full flex flex-col text-start gap-[10px] font-medium">
              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">1. LEAVE</h2>
                <p className="text-[13px] text-[#010101]">
                  24 Working days in a year subject to the leave rules in force
                  es with the accumulation limit of 180 working days applicable
                  to Management Staff
                </p>
              </div>
              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">2. PROVIDENT FUND</h2>
                <p className="text-[13px] text-[#010101]">
                  You will be entitled to benefits under this fund acconting to
                  the nites in force as and when made applicable in the Company.
                </p>
              </div>
              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">
                  3. GRATUITY-CUM-LIFE ASSURANCE SCHEME
                </h2>
                <p className="text-[13px] text-[#010101]">
                  The Company shall pay the premium involved in the Company's
                  Gratuity-cum-Life Assurance Scheme and you will he entitled to
                  benefits under this Scheme according and when made applicable
                  in the Company. to the rules in force as
                </p>
              </div>

              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">
                  4. NOTICE OF TERMINATION
                </h2>
                <p className="text-[13px] text-[#010101]">
                  During Probation Period:-
                </p>
                <p className="text-[13px] text-[#010101]">
                  Three day's notice on either side with the Company retaining
                  the right to pay three day's salary
                </p>
                <p className="text-[13px] text-[#010101]">
                  After Confirmation:-
                </p>
                <p className="text-[13px] text-[#010101]">
                  One month's notice on either side with the Company retaining
                  the right to pay one month's salary in lieu of the notice.
                </p>
              </div>
              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">5.TRANSFERABILITY</h2>
                <p className="text-[13px] text-[#010101]">
                  Your services are liable to be transferred to company's
                  existing/future projects/assignments/Group Companies,
                  offices/branches etc. located anywhere in India.
                </p>
              </div>
              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">6. RETIREMENT AGE</h2>
                <p className="text-[13px] text-[#010101]">
                  Your services are on contractual basis. However, your term of
                  contract shall not exceed the date of your attaining the age
                  of 60 (Sixty) years.
                </p>
              </div>
              <div className="flex justify-start flex-col items-start text-[14px] gap-[4px]">
                <h2 className="text-[16px] font-semibold">
                  7. OTHER TERMS AND CONDITIONS
                </h2>
                <p className="text-[12px] text-[#010101]">
                  7.1 You will, unless prevented by ill-health or accident and
                  save while on approved leave, devote the whole of your time,
                  attention and abilities to the business of the Company
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.2 You will not at any time hereafter, without the consent of
                  the Company in writing, except under legal duress, divulge or
                  make public any matter relating to the Company's transactions,
                  dealings or plans which are of confidential nature.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.3 You will be true and faithful to the Company in all your
                  accounts, dealings and transactions whatsoever relating to the
                  business of the Company, and shall, at All times, when
                  required render a true and just account thereof to the Company
                  or to such persons as shall be so authorised by the Company.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.4 It is expressly agreed that this Appointment is made on
                  the basis that your services being contractual, mainly of a
                  Management and/or Supervisory nature, you will not be entitled
                  to any rights, privileges and benefits as may be or become
                  applicable to employees covered by the Industrial Disputes
                  Act, 1947 or under Payment of Minimum Wages Act, Payment of
                  Bonus Act or any other labour laws.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.5 Your appointment is subject to satisfactory verification
                  of your testimonials and documents, for which you are required
                  to submit the copies of the (a) Birth certificate (b)
                  Educational qualification (c) Proof of Permanent & Present
                  residential addresses (d) Previous experience Certificates (e)
                  Identity Proof viz. PAN Card/passport/Voter ID/Driving License
                  (1) Medical fitness certificate and completion of the joining
                  formalities
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.6 Your appointment will be subject to your medical fitness,
                  for which you are required to produce medical certificate or
                  under go medical examination with the company nominated
                  doctor/medical board.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.7 Your place of appointment of service/company location is
                  at your services are transferable to any of the
                  section/department/Location / establishment of the company or
                  any of our Subsidiaries/Associate companies as per requirement
                  of the company, in the same pay scale without any additional
                  benefits,
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.8 This appointment letter will be void ab-initio, in the
                  event detection of any false declaration or Incorrect
                  information of personal particulars, date of birth,
                  qualifications, details of previous service/salary
                  particulars, etc., furnished at the time of securing
                  employment or found guilty or involved in any unlawful
                  activity at any time in the past.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.9 You shall obey the instructions of the senior/superior
                  officers and meticulously all rules & Regulations/standing
                  orders, code of conduct, admin instructions of the company as
                  amended from time to time. You will do and perform all such
                  duties as may be entrusted to you from time to time, in the
                  above capacity to the best of your ability & also conduct your
                  self faithfully & conscientiously.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.10 You will not associate, in any capacity whatsoever
                  directly or indirectly, part time or full time, with or
                  without remuneration or honorary basis with any individual,
                  other institution, body, business organization, corporation or
                  other entity, without prior written permission from
                  management. You must not get involved in any of the activities
                  which affect the benefit of the company adversely.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.11 For any misconduct you are liable for disciplinary
                  action/penalties as per the standing orders.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.12 If you remain absent continuously for more than 10 days
                  without any written permission/information and subsequently
                  refuse/fail to receive/acknowledge/reply to any telephone
                  call/email/sms/letter/notice from the company, you will be
                  deemed to have abandoned the service of the company. After 15
                  days from the date of absence, your name will be struck off
                  the roll of the company. You are liable to pay the notice
                  period pay, cost of the company property/stock held by
                  you/money collection not deposited into company account.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.13 For any violation/infraction or breach of terms &
                  conditions of this letter or occurrence of any of the
                  followings; your services are liable to terminated:
                </p>
                <p className="text-[10px] text-[#010101]">
                  a) Conviction by court of law (b) Refusal to obey the orders
                  of the superiors (c) Involvement in criminal/anti-social
                  activities (d) If found to be a habitual offender (e)Involved
                  in misconduct, moral turpitude, an act of indiscipline,
                  disobedience, dishonesty, Insubordination.
                </p>
                <p className="text-[12px] text-[#010101]">
                  7.14 All disputes are subject to Lucknow jurisdiction only.
                </p>{" "}
                <p className="text-[12px] text-[#010101]">
                  7.15 At the time of leaving the services, you are required to
                  give proper accounting of the company property held by you and
                  return the same to the concerned departments and obtain
                  clearance from all concerned departments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAppoimenttable;
