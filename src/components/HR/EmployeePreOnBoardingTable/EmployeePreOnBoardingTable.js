import React, { useEffect, useState } from "react";
import PaginationComponent from "../../Pagination";
import { getAllAppoimentData, getOneAppoimentData } from "../HrApiCollection";
import { CiViewList } from "react-icons/ci";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

function EmployeePreOnBoarding() {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getAllAppoimentDataHandle = async () => {
    const result = await getAllAppoimentData();
    setAllAppimentData(result && result);
    console.log(result);
  };
  const getOneAppoimentDataHandle = async (id) => {
    const result = await getOneAppoimentData(id);
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
  const config = [
    {
      label: "S N",
      // render: (list) => list.tableId,
    },
    {
      label: "Appointments Name",
      // render: (list) => list.tableId,
    },
    {
      label: "Appointments Id",
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
  useEffect(() => {
    getAllAppoimentDataHandle();
  }, []);
  const getSearchValueHandle = async () => {
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
    getSearchValueHandle();
  }, [searchValue]);
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-start">
        <h2 className="border-b-[4px] border-[#3497F9]">All Appoiment List</h2>
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
                        {item?.fullName}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.mainId}
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
                              handleOpen(),
                              getOneAppoimentDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          >
                            <CiViewList className="text-[25px] text-[#96999C]" />
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
                        {item?.fullName}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.mainId}
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
                              handleOpen(),
                              getOneAppoimentDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          >
                            <CiViewList className="text-[25px] text-[#96999C]" />
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
              <div>
                <form className="grid grid-cols-2 gap-4">
                  <span className="gap-[5px]">
                    <p>Full Name</p>
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={getAppoimentData?.fullName}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Email ID *</p>
                    <input
                      type="text"
                      placeholder="Email ID *"
                      name="emailId"
                      value={getAppoimentData?.emailId}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>PAN Number *</p>
                    <input
                      type="text"
                      placeholder="PAN Number *"
                      name="PanCard"
                      value={getAppoimentData?.PanCard}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Designation</p>
                    <input
                      type="text"
                      placeholder="Designation *"
                      name="Designation"
                      value={getAppoimentData?.Designation}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Division</p>
                    <input
                      type="text"
                      placeholder="Division"
                      name="Division"
                      value={getAppoimentData?.Division}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Date of Joining </p>
                    <input
                      type="date"
                      placeholder="Division"
                      name="DateofJoining"
                      value={getAppoimentData?.dataofJoin}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Basic Salary / Month </p>
                    <input
                      type="number"
                      placeholder="Basic Salary / Month"
                      name="BasicSalary"
                      value={getAppoimentData?.BasicSalary}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Management Grade</p>
                    <input
                      type="number"
                      placeholder="Management Grade"
                      name="ManagementGrade"
                      value={getAppoimentData?.ManagementGrade}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>Special Allowance / Month</p>
                    <input
                      type="number"
                      placeholder="Special Allowance / Month"
                      name="SpecialAllowance"
                      value={getAppoimentData?.SpecialAllowance}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                  <span className="gap-[5px]">
                    <p>INCENTIVE/BENEFITS APPLICABLE</p>
                    <input
                      type="number"
                      placeholder="INCENTIVE"
                      name="INCENTIVE"
                      value={getAppoimentData?.INCENTIVE}
                      className="w-full h-[2.5rem] outline-none border-[2px] border-[#C8C8C8] pl-[5px] rounded"
                      disabled
                    />
                  </span>
                </form>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EmployeePreOnBoarding;
