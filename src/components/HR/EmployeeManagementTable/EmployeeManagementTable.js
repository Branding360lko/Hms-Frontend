import React, { Suspense, useEffect, useState } from "react";
import "./EmployeeManagementTable.css";
import { RiEdit2Fill } from "react-icons/ri";
import { Backdrop, Box, Fade, Modal, Switch, Typography } from "@mui/material";

import {
  getAllEmployeeData,
  getOneEmployeeData,
  updateEmployeeData,
  updateEmployeeStatusHandle,
} from "../HrApiCollection";
import Snackbars from "../../SnackBar";
import PaginationComponent from "../../Pagination";
import { CiViewList } from "react-icons/ci";
function EmployeeManagementTable() {
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
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employeeId, setEmployeeId] = useState();
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeImageData, setEmployeeImageData] = useState();
  const [employeeEditData, setEmployeeEditData] = useState({
    title: "",
    fullName: "",
    dob: "",
    zipCode: "",
    State: "",
    city: "",
    nationality: "",
    country: "",
    addharNumber: "",
    bloodGroup: "",
    workEmail: "",
    materialStatus: "",
    panNumber: "",
    employeeStatus: "",
    gender: "",
  });
  const [snackBarData, setSnackBarData] = useState({
    open: false,
    message: "",
  });
  const getHandleValue = (e) => {
    setEmployeeEditData({
      ...employeeEditData,
      [e.target.name]: e.target.value,
    });
  };
  const getImageHandleValue = (e) => {
    setEmployeeImageData(e.target.files[0]);
  };
  const getAllEmployeeDataHandle = async () => {
    const result = await getAllEmployeeData();
    setEmployeeData(result && result?.data);
    console.log(result);
  };
  const getOneEmployeeDataHandle = async (id) => {
    const result = await getOneEmployeeData(id);
    setEmployeeId(result && result?.data?.mainId);
    setEmployeeEditData({
      ...employeeEditData,
      title: result?.data?.title,
      fullName: result?.data?.fullname,
      dob: result?.data?.dateOfBrith,
      zipCode: result?.data?.zipCode,
      State: result?.data?.state,
      city: result?.data?.city,
      nationality: result?.data?.Nationality,
      country: result?.data?.country,
      addharNumber: result?.data?.AadharNumber,
      bloodGroup: result?.data?.bloodgroup,
      workEmail: result?.data?.workedemail,
      materialStatus: result?.data?.mertialStatus,
      panNumber: result?.data?.PAN,
      employeeStatus: result?.data?.empolyeeType,
      gender: result?.data?.gender,
      image: result?.data?.image,
    });
    console.log(result);
  };
  const updateEmployeeDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", employeeEditData?.title);
    formData.append("fullname", employeeEditData?.fullName);
    formData.append("dateOfBrith", employeeEditData?.dob);
    formData.append("zipCode", employeeEditData?.zipCode);
    formData.append("state", employeeEditData?.State);
    formData.append("city", employeeEditData?.city);
    formData.append("Nationality", employeeEditData?.nationality);
    formData.append("AadharNumber", employeeEditData?.addharNumber);
    formData.append("bloodgroup", employeeEditData?.bloodGroup);
    formData.append("workedemail", employeeEditData?.workEmail);
    formData.append("country", employeeEditData?.country);
    formData.append("empolyeeType", employeeEditData?.employeeStatus);
    formData.append("mertialStatus", employeeEditData?.materialStatus);
    formData.append("PAN", employeeEditData?.panNumber);
    formData.append("gender", employeeEditData?.gender);
    formData.append("image", employeeImageData);
    const result = await updateEmployeeData(employeeId, formData);
    if (result) {
      handleClose();
      setSnackBarData({ open: true, message: result?.message });
      getAllEmployeeDataHandle();
    }
    console.log(result);
  };
  const updateEmployeeStatusDataHandle = async (id, status) => {
    const formData = new FormData();
    formData.append("empolyeeType", status == "Active" ? "InActive" : "Active");
    const result = await updateEmployeeStatusHandle(id, formData);
    if (result) {
      getAllEmployeeDataHandle();
      setSnackBarData({ open: true, message: result?.message });
    }
    console.log(result);
  };
  useEffect(() => {
    getAllEmployeeDataHandle();
  }, []);

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };
  const config = [
    {
      label: "S N",
      render: (list) => list.tableId,
    },
    {
      label: "Candidate Name",
      render: (list) => list.adminName,
    },
    {
      label: "Work EmailId",
      render: (list) => list.adminName,
    },
    {
      label: "Blood Group",
      render: (list) => list.adminName,
    },
    {
      label: "Pan Number",
      render: (list) => list.adminName,
    },
    {
      label: "Status",
      render: (list) => list.adminName,
    },

    {
      label: "Action",
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
  const keyFn = (list) => {
    return list.adminEmail;
  };

  const getSearchValueHandle = async () => {
    const result = await employeeData?.filter((item) => {
      if (searchValue !== "") {
        return item?.mainId
          ?.toLowerCase()
          ?.includes(searchValue?.toLowerCase());
      }
    });
    setSearchResult(result && result);
  };
  useEffect(() => {
    getSearchValueHandle();
  }, [searchValue]);
  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-start">
          <h2 className="border-b-[4px] border-[#3497F9]">Candidate List</h2>
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
              {employeeData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item, index) => (
                  <tr key={index}>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      {index + 1}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      {item?.fullname}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      {item?.workedemail}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      {item?.bloodgroup}
                    </td>
                    <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                      {item?.PAN}
                    </td>
                    <td>
                      <div className="flex gap-[10px] justify-center">
                        <Switch
                          onChange={() =>
                            updateEmployeeStatusDataHandle(
                              item?.mainId,
                              item?.empolyeeType
                            )
                          }
                          inputProps={{ "aria-label": "controlled" }}
                          checked={item?.empolyeeType == "Active" && true}
                        />
                      </div>
                    </td>
                    <td className="justify-center text-[12px] py-4 px-[4px] text-center border-b-[1px]">
                      <div className="flex gap-[10px] justify-center">
                        <div
                          // onClick={() => handleOpenUpdateModal(list)}
                          className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                        >
                          <CiViewList className="text-[25px] text-[#96999C]" />
                        </div>
                        <div
                          onClick={() => [
                            handleOpen(),
                            getOneEmployeeDataHandle(item?.mainId),
                          ]}
                          className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                        >
                          <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <PaginationComponent
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            data={employeeData}
          />
        </div>
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
              Employee Information
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <form
                className="w-full grid grid-cols-3 gap-[10px] items-start justify-start mt-[10px]"
                onSubmit={(e) => updateEmployeeDataHandle(e)}
              >
                <span className="flex flex-col justify-start flex-wrap">
                  <p className="w-fit">Title</p>
                  <select
                    className="w-full h-[40px] outline-none border-[2px] border-[#C8C8C8] rounded"
                    value={employeeEditData?.title}
                    onChange={getHandleValue}
                    name="title"
                  >
                    <option value="">Title</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Miss</option>
                  </select>
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Full Name</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="Full  name  *"
                    name="fullName"
                    value={employeeEditData?.fullName}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Date Of Birth</p>
                  <input
                    type="date"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="DOB *"
                    name="dob"
                    value={employeeEditData?.dob}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">zipCode</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="Zip  code *"
                    name="zipCode"
                    value={employeeEditData?.zipCode}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">State</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="State*"
                    name="State"
                    value={employeeEditData?.State}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">City</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="City*"
                    name="city"
                    value={employeeEditData?.city}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Nationality</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="Nationality*"
                    name="nationality"
                    value={employeeEditData?.nationality}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Country</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="Country*"
                    name="country"
                    value={employeeEditData?.country}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Addhar Number</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="Aadhar Number*"
                    name="addharNumber"
                    value={employeeEditData?.addharNumber}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Blood Group</p>
                  <select
                    className="w-full h-[40px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    onChange={getHandleValue}
                    name="bloodGroup"
                    value={employeeEditData?.bloodGroup}
                  >
                    <option value="">Blood Group</option>
                    <option>O positive</option>
                    <option>O negative</option>
                    <option>A positive</option>
                    <option>A negative</option>
                    <option>B positive</option>
                    <option>B negative</option>
                    <option>AB positive</option>
                    <option>AB negative</option>
                  </select>
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Offical EmailId</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="Work Email ID*"
                    name="workEmail"
                    value={employeeEditData?.workEmail}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Material Status</p>
                  <select
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    onChange={getHandleValue}
                    name="materialStatus"
                    value={employeeEditData?.materialStatus}
                  >
                    <option value="">Select Marital Status</option>
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">PanCard Number</p>
                  <input
                    type="text"
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    placeholder="PAN Number"
                    name="panNumber"
                    value={employeeEditData?.panNumber}
                    onChange={getHandleValue}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Employement Status</p>
                  <select
                    className="w-full h-[40px] pl-[5px] outline-none border-[2px] border-[#C8C8C8]  rounded"
                    onChange={getHandleValue}
                    name="employeeStatus"
                    value={employeeEditData?.employeeStatus}
                  >
                    <option value="">Select Employee Status</option>
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
                </span>
                <span className="flex flex-col justify-start">
                  <p className="w-fit">Gender</p>
                  <div className="flex align-center gap-[10px]">
                    <span className="flex align-center gap-[5px]">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={getHandleValue}
                        checked={
                          employeeEditData?.gender === "male" ? true : false
                        }
                        required
                      />
                      <p>Male</p>
                    </span>
                    <span className="flex align-center gap-[5px]">
                      <input
                        type="radio"
                        name="gender"
                        value={"female"}
                        onChange={getHandleValue}
                        checked={
                          employeeEditData?.gender === "female" ? true : false
                        }
                        required
                      />
                      <p>Female</p>
                    </span>
                  </div>
                </span>
                <span>
                  <img
                    src={`${
                      process.env.React_App_Base_Image_Url +
                      employeeEditData?.image
                    }`}
                    alt="employee "
                  />
                </span>
                <span className="col-span-3">
                  <input
                    type="file"
                    className="w-full h-[40px] pl-[5px] outline-none"
                    onChange={getImageHandleValue}
                  />
                </span>
                <span>
                  {employeeImageData && (
                    <img
                      src={URL.createObjectURL(employeeImageData)}
                      alt="employee"
                      className="w-[250px] h-[200px]"
                    />
                  )}
                </span>
                <br />

                <span></span>

                <button className="bg-[#3497F9] text-white p-[10px] rounded-md w-[150px]">
                  Update Employee
                </button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Snackbars
        open={snackBarData?.open}
        message={snackBarData?.message}
        setOpen={setSnackBarData}
      />
    </Suspense>
  );
}

export default EmployeeManagementTable;
