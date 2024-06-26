import React, { useEffect, useState } from "react";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import {
  addCompensationData,
  getAllCompensitionData,
  getOneCompensationData,
  updateCompensationData,
} from "../HrApiCollection";
import Snackbars from "../../SnackBar";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import PaginationComponent from "../../Pagination";
import { CiSearch, CiViewList } from "react-icons/ci";

function EmployeeCompensationTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    outline: "transparent",
    height: "400px",
  };
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
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setIsLoading(false);
  };
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { adminLoggedInData } = useSelector((state) => state?.AdminState);

  const [allCompensationData, setAllCompensationData] = useState();
  const [compensationId, setCompensationId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarData, setSnackBarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [compensationData, setCompensationData] = useState({
    employeeId: "",
    compensationPayout: "",
    effectiveData: "",
    status: "",
  });
  const handleGetValue = (e) => {
    setCompensationData({
      ...compensationData,
      [e.target.name]: e.target.value,
    });
  };
  const getAllCompensitionDataHandle = async () => {
    const result = await getAllCompensitionData();
    setAllCompensationData(result && result);
    console.log(result, "compen");
  };
  const addEmployeeCompensationHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("EmpolyeeID", compensationData?.employeeId);
    formData.append("Compensationpayout", compensationData?.compensationPayout);
    formData.append("EffectiveDate", compensationData?.effectiveData);
    formData.append("Status", compensationData?.status);
    formData.append("createdBy", adminLoggedInData?.adminEmail);
    setIsLoading(true);
    const resuult = await addCompensationData(formData);
    if (resuult) {
      handleClose();
      setSnackBarData({ open: true, message: resuult?.message });
      getAllCompensitionDataHandle();
    }
    if (!resuult) {
      setSnackBarData({
        open: true,
        message: resuult?.message,
        severity: "warning",
      });
    }
    console.log(resuult);
    setIsLoading(false);
  };
  const getOneCompensationDataHandle = async (id) => {
    const result = await getOneCompensationData(id);
    setCompensationId(result && result?.[0]?._id);
    setCompensationData({
      ...compensationData,
      employeeId: result?.[0]?.EmpolyeeID,
      compensationPayout: result?.[0]?.Compensationpayout,
      effectiveData: result?.[0]?.EffectiveDate,
      status: result?.[0]?.Status,
    });
    console.log(result);
  };
  const updateCompensationDataHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("EmpolyeeID", compensationData?.employeeId);
    formData.append("Compensationpayout", compensationData?.compensationPayout);
    formData.append("EffectiveDate", compensationData?.effectiveData);
    formData.append("Status", compensationData?.status);
    const result = await updateCompensationData(compensationId, formData);
    if (result) {
      setSnackBarData({
        ...snackBarData,
        open: true,
        message: result?.data?.message,
      });
      getAllCompensitionDataHandle();
      handleClose1();
    }
    if (!result) {
      console.log("nothing");
      setSnackBarData({
        ...snackBarData,
        open: true,
        message: "Something Wnet Wrong Try After Sometime",
        severity: "warning",
      });
    }
    console.log(result);
  };
  const addCompensation = (
    <div>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={addEmployeeCompensationHandle}
      >
        <span className="w-full">
          <p> EmpolyeeID</p>
          <input
            type="text"
            placeholder=" EmpolyeeID"
            name="employeeId"
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            onChange={handleGetValue}
            required
          />
        </span>
        <span>
          <p>Compensation Payout</p>
          <input
            type="text"
            placeholder="Compensationpayout"
            name="compensationPayout"
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            onChange={handleGetValue}
            required
          />
        </span>
        <span>
          <p>Effective Date</p>
          <input
            type="date"
            placeholder="EffectiveDate"
            name="effectiveData"
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            onChange={handleGetValue}
            required
          />
        </span>
        <span>
          <p>Status</p>
          <select
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            name="status"
            onChange={handleGetValue}
            required
          >
            <option value="">Select One status</option>
            <option value="1">Active</option>
            <option value="0">InActive</option>
          </select>
        </span>
        {!isLoading ? (
          <button className="bg-[#3497F9] text-white p-[10px] rounded-md">
            Add Compensation
          </button>
        ) : (
          <button
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
            disabled
          >
            Adding...
          </button>
        )}
      </form>
    </div>
  );
  const updateCompensation = (
    <div>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={updateCompensationDataHandle}
      >
        <span className="w-full">
          <p> EmpolyeeID</p>
          <input
            type="text"
            placeholder=" EmpolyeeID"
            name="employeeId"
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            value={compensationData?.employeeId}
            onChange={handleGetValue}
            required
          />
        </span>
        <span>
          <p>Compensation Payout</p>
          <input
            type="text"
            placeholder="Compensationpayout"
            name="compensationPayout"
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            value={compensationData?.compensationPayout}
            onChange={handleGetValue}
            required
          />
        </span>
        <span>
          <p>Effective Date</p>
          <input
            type="date"
            placeholder="EffectiveDate"
            name="effectiveData"
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            value={compensationData?.effectiveData}
            onChange={handleGetValue}
            required
          />
        </span>
        <span>
          <p>Status</p>
          <select
            className="border-[2px] border-[#C8C8C8] rounded w-full h-[40px] outline-none pl-[5px]"
            name="status"
            onChange={handleGetValue}
            value={compensationData?.status}
            required
          >
            <option value="">Select One status</option>
            <option value="1">Active</option>
            <option value="0">InActive</option>
          </select>
        </span>
        {!isLoading ? (
          <button className="bg-[#3497F9] text-white p-[10px] rounded-md">
            Update Compensation
          </button>
        ) : (
          <button
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
            disabled
          >
            Adding...
          </button>
        )}
      </form>
    </div>
  );
  const config = [
    {
      label: "S N",
      // render: (list) => list.tableId,
    },
    {
      label: "Employee Name",
      // render: (list) => list.tableId,
    },
    {
      label: "Employement Number",
      // render: (list) => list.adminName,
    },
    {
      label: "Currency",
      // render: (list) => list.adminEmail,
    },
    {
      label: "Total  CTC",
      // render: (list) => `${date(list.createdAt)} - ${time(list.createdAt)}`,
    },
    {
      label: "Effective Date",
      // render: (list) => `${date(list.updatedAt)} - ${time(list.updatedAt)}`,
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
  const getValueHandle = async () => {
    const result = await allCompensationData?.data?.filter((item) => {
      if (searchValue !== "") {
        return item?.EmpolyeeID?.toLowerCase()?.includes(
          searchValue?.toLowerCase()
        );
      }
    });
    setSearchResult(result && result);
  };
  useEffect(() => {
    getValueHandle();
  }, [searchValue]);
  useEffect(() => {
    getAllCompensitionDataHandle();
  }, []);
  useEffect(() => {
    console.log(compensationData);
  }, [compensationData]);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex justify-between">
        <h2 className="border-b-[4px] border-[#3497F9]">Compensation</h2>
        <button
          className="bg-[#3497F9] text-white p-[10px] rounded-md"
          onClick={handleOpen}
        >
          Add Compensation
        </button>
      </div>
      <form className="flex flex-col align-start justify-start gap-[10px]">
        <p className="w-fit">Upload File *</p>
        <span className="w-fit flex gap-[10px]">
          <input type="file" required />
          <button className="bg-[#3497F9] text-white p-[10px] rounded-md w-[150px]">
            Submit
          </button>
        </span>
      </form>
      <div className="flex flex-col justify-start gap-2">
        <h2 className="border-b-[4px] border-[#3497F9] w-fit">
          Compensation Details
        </h2>
        <span className="w-[20rem] border-[2px] rounded flex bg-[#F4F6F6] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search Employee By Id"
            className="w-11/12 border-none outline-none pl-[5px] h-[2rem] bg-[#F4F6F6]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="bg-[#3497F9] text-white py-[5px] px-[10px] rounded-md "
            onClick={() => [setSearchResult([]), setSearchValue("")]}
            disabled={searchValue != "" ? false : true}
          >
            Reset
          </button>
        </span>
      </div>
      {/* <Table config={config} /> */}
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
                        {item?.employee?.[0]?.fullname}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.mainId}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.bloodgroup}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.PAN}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.EffectiveDate}
                      </td>
                      <td>
                        <div className="flex gap-[10px] justify-center">
                          <div
                            // onClick={() => handleOpenUpdateModal(list)}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          >
                            <CiViewList className="text-[25px] text-[#96999C]" />
                          </div>

                          <div
                            onClick={() => [
                              handleOpen1(),
                              getOneCompensationDataHandle(item?._id),
                            ]}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
                          >
                            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
              : allCompensationData?.data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {index + 1}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.fullname}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.mainId}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.bloodgroup}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.employee?.[0]?.PAN}
                      </td>
                      <td className="justify-center text-[16px] py-4 px-[4px] text-center border-b-[1px]">
                        {item?.EffectiveDate}
                      </td>
                      <td>
                        <div className="flex gap-[10px] justify-center">
                          <div
                            // onClick={() => handleOpenUpdateModal(list)}
                            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
                          >
                            <CiViewList className="text-[25px] text-[#96999C]" />
                          </div>

                          <div
                            onClick={() => [
                              handleOpen1(),
                              getOneCompensationDataHandle(item?._id),
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
          data={allCompensationData?.data}
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Compensation
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {addCompensation}
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Compensation
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {updateCompensation}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Snackbars
        open={snackBarData?.open}
        message={snackBarData?.message}
        setOpen={setSnackBarData}
        severity={snackBarData?.severity}
      />
      {/* <Snackbars
        open={snackBarData?.open}
        setOpen={setOpenSnackBarWarning}
        severity='warning'
        message={snackBarMessageWarning}
      /> */}
    </div>
  );
}

export default EmployeeCompensationTable;
